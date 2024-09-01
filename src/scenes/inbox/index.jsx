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
  CircularProgress,
  Button,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useGetInboxReviewsQuery, useGetInboxBreakdownQuery } from "state/api";
import { format, isToday } from "date-fns";
import FlexBetween from "components/FlexBetween";
import InboxNavbar from "components/InboxNavbar"; // Import the new Navbar component
import EditorJS from "@editorjs/editorjs";
import ReviewHeader from "components/ReviewHeader";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLocation, useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Inbox = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedReview, setSelectedReview] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviews, setReviews] = useState([]);
  const observer = useRef();
  const navbarHeight = 64;
  const [inboxBreakdown, setInboxBreakdown] = useState({
    starredReviews: 0,
    totalReviews: 0,
    unreadReviews: 0,
  });

  const userId = localStorage.getItem("user_id");
  const companyId = localStorage.getItem("company_id");

  const location = useLocation();

  const {
    data: reviewData,
    isLoading,
    error,
    refetch,
  } = useGetInboxReviewsQuery(
    {
      user_id: userId,
      company_id: companyId,
      page,
      page_size: 10,
    },
    { refetchOnMountOrArgChange: true },
  );

  const { data: breakdownData, refetch: refetchBreakdown } =
    useGetInboxBreakdownQuery(
      { user_id: userId },
      { refetchOnMountOrArgChange: true },
    );

  // Effect to update reviews when data is fetched
  useEffect(() => {
    if (reviewData) {
      setReviews(reviewData.reviews);
      setTotalPages(Math.ceil(reviewData.total_reviews / 10));
    }
  }, [reviewData]);

  useEffect(() => {
    if (breakdownData) {
      setInboxBreakdown({
        starredReviews: breakdownData.data.starred_reviews,
        totalReviews: breakdownData.data.total_reviews,
        unreadReviews: breakdownData.data.unread_reviews,
      });
    }
  }, [breakdownData]);

  // Effect to refetch data when navigating back to /inbox
  useEffect(() => {
    if (location.pathname === "/inbox") {
      refetch();
      refetchBreakdown();
    }
  }, [location, refetch, refetchBreakdown]);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    updateReviewStatus(review.id, review.is_starred, true); // Mark as read
    // Immediate feedback: hide the blue dot
    setReviews((prevReviews) =>
      prevReviews.map((r) =>
        r.review_id === review.review_id ? { ...r, is_read: true } : r,
      ),
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isToday(date) ? format(date, "p") : format(date, "MMM d");
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const sidebarItems = reviews.map((review) => ({
    id: review.review_id,
    title: review.author_name,
    description: review.review_text,
    date: formatDate(review.review_date),
    icon: review.author_image_url,
    platform: review.platform_id,
    is_read: review.is_read, // Track if the review is read
    is_starred: review.is_starred, // Track if the review is starred
  }));

  const [showChevron, setShowChevron] = useState(false);
  const editorRef = useRef(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (editorRef.current) {
        const isOverflowing =
          editorRef.current.scrollHeight > editorRef.current.clientHeight;
        setShowChevron(isOverflowing);
      }
    };

    // Check initially and whenever content might change
    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    // If you're dynamically adding content, call checkOverflow() after content updates

    return () => window.removeEventListener("resize", checkOverflow);
  }, [selectedReview]); // Add any dependencies that might affect content height

  const scrollDown = () => {
    if (editorRef.current) {
      editorRef.current.scrollTop += 100; // Scroll down by 100px, adjust as needed
    }
  };

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

  const updateReviewStatus = async (reviewId, is_starred, is_read) => {
    const userId = localStorage.getItem("user_id");

    // Optimistically update the reviews state
    setReviews((prevReviews) => {
      const updatedReviews = prevReviews.map((review) =>
        review.review_id === reviewId
          ? { ...review, is_starred, is_read }
          : review,
      );
      return updatedReviews;
    });

    try {
      const response = await fetch(
        process.env.REACT_APP_SERVICES_BASE_URL + "/update_inbox_item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            review_id: reviewId,
            is_starred: is_starred,
            is_read: is_read,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error(error);
      // Optionally revert the optimistic update if the API call fails
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.review_id === reviewId
            ? { ...review, is_starred: !is_starred, is_read: !is_read } // Revert changes
            : review,
        ),
      );
    }
  };

  const handleStarClick = (item) => {
    const newis_starred = !item.is_starred; // Toggle the starred status
    updateReviewStatus(item.id, newis_starred, item.is_read); // Update the review status
    // Immediate feedback: update the reviews state to reflect the new starred status
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === item.id
          ? { ...review, is_starred: newis_starred }
          : review,
      ),
    );
  };

  const handleNavigateToIntegrations = () => {
    navigate("/integrations");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      paddingTop={`${navbarHeight}px`}
    >
      <InboxNavbar
        unreadCount={inboxBreakdown.unreadReviews}
        starredCount={inboxBreakdown.starredReviews}
        totalCount={inboxBreakdown.totalReviews}
      />
      <Box display="flex" flexGrow={1} overflow="hidden">
        {/* Sidebar */}
        <Box
          width="35%"
          bgcolor="background.paper"
          borderRight={`1px solid #ddd`}
          display="flex"
          flexDirection="column"
          height={`calc(100vh - ${navbarHeight}px)`}
        >
          <Box flexGrow={1} overflow="auto">
            <List>
              {isLoading ? (
                <Box display="flex" justifyContent="center" my={2}>
                  <CircularProgress />
                </Box>
              ) : sidebarItems.length === 0 ? (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  height="70vh"
                  borderRadius="12px"
                  p={6}
                  textAlign="center"
                  gap={2}
                >
                  <svg
                    width="100px"
                    height="100px"
                    viewBox="0 0 312 312"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g
                      id="empty_inbox"
                      data-name="empty inbox"
                      transform="translate(-2956.982 -3048.416)"
                    >
                      <path
                        id="Path_26"
                        data-name="Path 26"
                        d="M3268.982,3078.286a29.869,29.869,0,0,0-29.869-29.87H2986.851a29.869,29.869,0,0,0-29.869,29.87v252.259a29.87,29.87,0,0,0,29.869,29.871h252.262a29.87,29.87,0,0,0,29.869-29.871Zm-281.9-4.87H3239.3a5.378,5.378,0,0,1,5.684,5.268v141.732h-73.54a12.038,12.038,0,0,0-12.114,12.025,47.854,47.854,0,0,1-95.668,1.918,11.273,11.273,0,0,0,.162-1.906,12.049,12.049,0,0,0-12.116-12.037h-70.724V3078.684C2980.982,3075.574,2983.97,3073.416,2987.08,3073.416Zm252.218,263H2987.08c-3.11,0-6.1-2.4-6.1-5.514v-86.486h59.426a72.092,72.092,0,0,0,142.13,0h62.444V3330.9A5.577,5.577,0,0,1,3239.3,3336.416Z"
                        fill={theme.palette.primary.main}
                      />
                    </g>
                  </svg>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    gutterBottom
                    mt={2}
                  >
                    It's quiet here...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Add an integration to start receiving messages
                  </Typography>
                  <Button
                    onClick={handleNavigateToIntegrations}
                    variant="contained"
                    color="primary"
                    startIcon={<AddCircleOutlineIcon />}
                    sx={{
                      borderRadius: "20px",
                      textTransform: "none",
                      fontWeight: "bold",
                      boxShadow:
                        "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow:
                          "0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)",
                        transition:
                          "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                        backgroundColor: theme.palette.primary.dark,
                      },
                    }}
                  >
                    Add Integration
                  </Button>
                </Box>
              ) : (
                sidebarItems.map((item) => (
                  <ListItem
                    button
                    key={item.id}
                    onClick={() => handleReviewClick(item)}
                  >
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item>
                        <Stack direction="row" spacing={1} alignItems="center">
                          {item.is_read ? (
                            <Box
                              width={7}
                              height={7}
                              bgcolor="blue"
                              borderRadius="50%"
                              display="none"
                            />
                          ) : (
                            <Box
                              width={7}
                              height={7}
                              bgcolor="blue"
                              borderRadius="50%"
                            />
                          )}
                          <IconButton
                            aria-label="star"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent triggering the review click
                              handleStarClick(item);
                            }}
                            sx={{
                              "&:hover .MuiSvgIcon-root": {
                                color: item.is_starred ? "darkgray" : "gold",
                              },
                            }}
                            disableRipple
                          >
                            <StarIcon
                              sx={{
                                color: item.is_starred ? "gold" : "darkgray",
                              }}
                            />
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
            </List>
          </Box>
          {reviews.length > 0 && (
            <Box p={2} borderTop={`1px solid #ddd`}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconButton
                  onClick={handlePrevPage}
                  disabled={page === 1 || isLoading}
                  disableRipple
                  sx={{
                    "&:hover .MuiSvgIcon-root": {
                      color: "black",
                    },
                    transform: "scale(1.2)",
                  }}
                >
                  <ChevronLeftIcon />
                </IconButton>
                <Typography>
                  Page {page} of {totalPages}
                </Typography>
                <IconButton
                  onClick={handleNextPage}
                  disabled={page === totalPages || isLoading}
                  disableRipple
                  sx={{
                    "&:hover .MuiSvgIcon-root": {
                      color: "black",
                    },
                    transform: "scale(1.2)",
                  }}
                >
                  <ChevronRightIcon />
                </IconButton>
              </Box>
            </Box>
          )}
        </Box>

        {/* Main content area */}
        <Box
          width="65%"
          display="flex"
          flexDirection="column"
          overflow="auto"
          height={`calc(100vh - ${navbarHeight}px)`}
          className="show-scrollbar"
          sx={{
            overflowY: "auto", // Ensure overflow content is scrollable
            maxHeight: "100%", // Prevent overflow
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.common.black,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.black,
            },
          }}
        >
          {selectedReview ? (
            <Box display="flex" flexDirection="column">
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
              <Box p={2}>
                <Typography variant="body1" mt={2}>
                  {selectedReview.description}
                </Typography>
                <Typography variant="h6" mt={2}>
                  Craft a Response:
                </Typography>
                <Box borderBottom="1px solid #ddd" my={2} />
                <Box>
                  <Box
                    bgcolor="gray.100"
                    p={2}
                    borderRadius={1}
                    ml={2}
                    minHeight="300px" // Set a minimum height
                  >
                    <div id="editorjs"></div>
                  </Box>
                </Box>
              </Box>
            </Box>
          ) : (
            <Typography></Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;
