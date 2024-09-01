import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useGetReviewDataByCompanyQuery } from "state/api";
import { format, isToday } from "date-fns";
import FlexBetween from "components/FlexBetween";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import InboxNavbar from "components/InboxNavbar"; // Import the new Navbar component
import EditorJS from "@editorjs/editorjs";
import ReviewHeader from "components/ReviewHeader";

const Inbox = () => {
  const theme = useTheme();
  const [selectedReview, setSelectedReview] = useState(null);
  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef();
  const navbarHeight = 64;

  const {
    data: reviewData,
    isLoading,
    error,
  } = useGetReviewDataByCompanyQuery({
    company_id: localStorage.getItem("company_id"),
    page,
  });

  useEffect(() => {
    if (reviewData) {
      setReviews((prevReviews) => [...prevReviews, ...reviewData.reviews]);
      setIsFetching(false);
    }
  }, [reviewData]);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isToday(date) ? format(date, "p") : format(date, "MMM d");
  };

  const loadMoreReviews = () => {
    if (!isFetching && reviewData?.reviews.length > 0) {
      setIsFetching(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const lastReviewElementRef = (node) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreReviews();
      }
    });
    if (node) observer.current.observe(node);
  };

  const sidebarItems = reviews.map((review, index) => ({
    id: review.review_id,
    title: review.author_name,
    description: review.review_text,
    date: formatDate(review.review_date),
    icon: review.author_image_url,
    platform: review.platform_id,
    ref: reviews.length === index + 1 ? lastReviewElementRef : null,
  }));

  useEffect(() => {
    if (selectedReview) {
      const editor = new EditorJS({
        holder: "editorjs",
        placeholder: "Start writing your response...",
        tools: {
          header: {
            class: require("@editorjs/header"),
            inlineToolbar: ["link"],
          },
          list: {
            class: require("@editorjs/list"),
            inlineToolbar: true,
          },
          // image: {
          //   class: require('@editorjs/image'),
          //   inlineToolbar: true,
          //   config: {
          //     endpoints: {
          //       byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
          //       byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
          //     },
          //   },
          // },
          quote: {
            class: require("@editorjs/quote"),
            inlineToolbar: true,
            config: {
              quotePlaceholder: "Enter a quote",
              captionPlaceholder: "Quote's author",
            },
          },
          marker: {
            class: require("@editorjs/marker"),
            shortcut: "CMD+SHIFT+M",
          },
          code: {
            class: require("@editorjs/code"),
          },
          delimiter: {
            class: require("@editorjs/delimiter"),
          },
          inlineCode: {
            class: require("@editorjs/inline-code"),
            shortcut: "CMD+SHIFT+C",
          },
          embed: {
            class: require("@editorjs/embed"),
            config: {
              services: {
                youtube: true,
                coub: true,
              },
            },
          },
          table: {
            class: require("@editorjs/table"),
            inlineToolbar: true,
            config: {
              rows: 2,
              cols: 3,
            },
          },
        },
      });

      return () => {
        editor.destroy();
      };
    }
  }, [selectedReview]);

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <InboxNavbar unreadCount={422} />
      <Box display="flex" flexGrow={1} paddingTop={`${navbarHeight}px`}>
        <Box
          width="35%"
          bgcolor="background.paper"
          p={0.5}
          borderRight={`1px solid #ddd`}
          overflow="auto"
          height={`calc(100vh - ${navbarHeight}px)`} // Set fixed height for sidebar
        >
          <List>
            {isLoading && page === 1 ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography>Error loading reviews</Typography>
            ) : (
              sidebarItems.map((item, index) => (
                <ListItem
                  button
                  key={item.id}
                  onClick={() => handleReviewClick(item)}
                  ref={item.ref}
                >
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Stack direction="row" spacing={1} alignItems="center">
                        {item.isRead ? null : (
                          <Box
                            width={7}
                            height={7}
                            bgcolor="blue"
                            borderRadius="50%"
                          />
                        )}
                        <IconButton color="inherit" aria-label="star">
                          <StarOutlineIcon />
                        </IconButton>
                      </Stack>
                    </Grid>

                    <Grid item xs>
                      <ListItemText
                        primary={
                          <FlexBetween>
                            <Typography
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "150px",
                              }}
                            >
                              {item.title}
                            </Typography>
                            <Typography
                              component="span"
                              variant="subtitle2"
                              color="textSecondary"
                              fontWeight="bold"
                            >
                              {item.date}
                            </Typography>
                          </FlexBetween>
                        }
                        secondary={
                          <Typography
                            component="span"
                            variant="body2"
                            color="textSecondary"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              maxWidth: "150px",
                            }}
                          >
                            {item.description.substring(0, 20) + "..."}
                          </Typography>
                        }
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              ))
            )}
            {isFetching && <Typography>Loading more reviews...</Typography>}
          </List>
        </Box>

        <Box
          width="65%"
          p={2}
          position="sticky"
          right={0}
          top={`${navbarHeight}px`}
          height={`calc(100vh - ${navbarHeight}px)`}
          overflow="auto"
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {selectedReview ? (
                <Box>
                  <ReviewHeader
                    senderName={selectedReview.title}
                    senderPlatform={selectedReview.platform}
                    date={new Date(selectedReview.date).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                    senderIcon={selectedReview.icon}
                  />
                  <Typography variant="body1" mt={2}>
                    {selectedReview.description}
                  </Typography>
                  <Box mt={2}>
                    <Typography variant="h6">Craft a Response:</Typography>
                    <Box borderBottom="1px solid #ddd" my={2} />
                    <Box
                      bgcolor="gray.100"
                      p={2}
                      borderRadius={1}
                      ml={2}
                      width="600px" // Set a fixed width for the editor container
                    >
                      <div id="editorjs" style={{ width: "100%" }}></div>{" "}
                      {/* Editor.js container */}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Typography></Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;
