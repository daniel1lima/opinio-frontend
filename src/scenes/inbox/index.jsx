import React, { useState } from "react";
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

const Inbox = () => {
  const theme = useTheme();
  const [selectedReview, setSelectedReview] = useState(null);

  const {
    data: reviewData,
    isLoading,
    error,
  } = useGetReviewDataByCompanyQuery({
    company_id: localStorage.getItem("company_id"),
  });

  const handleReviewClick = (review) => {
    setSelectedReview(review);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isToday(date) ? format(date, "p") : format(date, "MMM d");
  };

  const sidebarItems = reviewData
    ? reviewData.reviews.map((review) => ({
        id: review.review_id,
        title: review.review_text,
        description: review.review_text,
        date: formatDate(review.review_date),
        icon: "", // Add icon URL if available
      }))
    : [];

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <InboxNavbar unreadCount={422} />
      <Box display="flex" flexGrow={1}>
        {/* Sidebar */}
        <Box
          width="35%"
          bgcolor="background.paper"
          p={0.5}
          borderRight={`1px solid #ddd`}
        >
          <List>
            {isLoading ? (
              <Typography>Loading...</Typography>
            ) : error ? (
              <Typography>Error loading reviews</Typography>
            ) : (
              sidebarItems.map((item) => (
                <ListItem
                  button
                  key={item.id}
                  onClick={() => handleReviewClick(item)} // Ensure onClick is set
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
                                maxWidth: "150px", // Adjust as needed
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
                              maxWidth: "150px", // Adjust as needed
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

        {/* Main Content */}
        <Box width="80%" p={2}>
          <Grid container spacing={2}>
            {/* Review Detail */}
            <Grid item xs={12}>
              {selectedReview ? (
                <Box>
                  <Typography variant="h5">
                    {selectedReview.review_text}
                  </Typography>
                  <Typography variant="subtitle1">
                    {new Date(selectedReview.review_date).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {selectedReview.review_text}
                  </Typography>
                </Box>
              ) : (
                <Typography>Select a review to see details</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Inbox;
