import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Avatar,
  Rating,
  Modal,
} from "@mui/material";
import { format, parseISO } from "date-fns";
import AIResponseButton from "./AIResponseButton";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useGetReviewDataByCompanyQuery } from "../../state/api";

const DashRecent = () => {
  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generatedResponse, setGeneratedResponse] = useState(null);
  const [preloadedImages, setPreloadedImages] = useState({});
  const reviewsPerPage = 10;

  const currentPage = Math.floor(currentIndex / reviewsPerPage) + 1;

  const {
    data: reviewsData,
    isLoading,
    error,
  } = useGetReviewDataByCompanyQuery({
    company_id: localStorage.getItem("company_id"),
    page: currentPage,
    page_size: reviewsPerPage,
  });

  const total_reviews = reviewsData?.totalReviews || 0;
  const currentReviews = reviewsData?.reviews || [];

  useEffect(() => {
    if (currentReviews.length > 0) {
      preloadImages(currentReviews);
    }
  }, [currentReviews]);

  const preloadImages = (reviews) => {
    reviews.forEach((review) => {
      if (
        review.author_image_url &&
        !preloadedImages[review.author_image_url]
      ) {
        const img = new Image();
        img.src = review.author_image_url;
        img.onload = () => {
          setPreloadedImages((prev) => ({
            ...prev,
            [review.author_image_url]: img.src,
          }));
        };
      }
    });
  };

  const handleNextReview = () => {
    if (currentIndex < total_reviews - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevReview = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const currentReview = currentReviews[currentIndex % reviewsPerPage];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleResponseGenerated = (response) => {
    setGeneratedResponse(response);
  };

  return (
    <Box
      gridColumn="span 17"
      gridRow="span 3"
      backgroundColor="#FFFFFF"
      borderRadius="0.55rem"
      p="1rem"
      sx={{
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          transition: "0.3s ease-out",
        },
        position: "relative",
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        mb="1rem"
      >
        <Typography variant="h4" fontWeight="bold" color="#000000">
          Recent Reviews
        </Typography>
        {/* ... Menu component ... */}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="300px"
      >
        <Button
          onClick={handlePrevReview}
          disabled={currentIndex === 0}
          sx={{
            position: "absolute",
            left: "0.5rem",
            minWidth: "40px",
            minHeight: "40px",
            borderRadius: "50%",
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.common.black,
            "&:hover": {
              backgroundColor: theme.palette.grey[400],
            },
            "&:disabled": {
              visibility: "hidden",
            },
          }}
        >
          <ChevronLeft />
        </Button>
        {isLoading && <Typography>Loading...</Typography>}
        {error && (
          <Typography variant="h6" fontWeight="bold" fontFamily="Arial">
            Error loading reviews
          </Typography>
        )}
        {currentReview && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            maxWidth="80%"
            textAlign="center"
          >
            <Rating
              value={Number(currentReview.rating)}
              readOnly
              size="large"
            />
            <Typography variant="h5" fontWeight="bold" mt={2} mb={2}>
              {currentReview.business_id
                .replace(/-/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
            </Typography>
            <Typography variant="body1" mb={2}>
              {currentReview.review_text.slice(0, 200)}
              {currentReview.review_text.length > 200 && "..."}
            </Typography>
            {currentReview.review_text.length > 200 && (
              <Typography
                color="text.secondary"
                sx={{ cursor: "pointer" }}
                onClick={handleOpenModal}
              >
                Read more
              </Typography>
            )}
            <Box display="flex" alignItems="center" mt={2}>
              <Avatar
                src={
                  preloadedImages[currentReview.author_image_url] ||
                  currentReview.author_image_url
                }
                alt="Reviewer"
              />
              <Box ml={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {currentReview?.author_name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {format(parseISO(currentReview.review_date), "MMMM d, yyyy")}{" "}
                  on {currentReview.platform_id}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 3,
              p: 4,
              borderRadius: 2,
              width: 400,
              maxWidth: "90%",
            }}
          >
            <Typography variant="h6" sx={{ color: "#333", mb: 2 }}>
              {currentReview?.review_text}
            </Typography>
            {generatedResponse && (
              <Box sx={{ mb: 2 }} bgcolor={theme.palette.grey[300]}>
                <Typography variant="body1" sx={{ color: "#333", mb: 2 }}>
                  {generatedResponse}
                </Typography>
              </Box>
            )}

            <Rating
              value={Number(currentReview?.rating)}
              readOnly
              size="large"
              sx={{ mb: 2 }}
            />

            <Box display="flex" alignItems="center" mt={2}>
              <Avatar
                src={
                  preloadedImages[currentReview?.author_image_url] ||
                  currentReview?.author_image_url
                }
                alt="Reviewer"
              />
              <Box ml={2}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {currentReview?.author_name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {currentReview &&
                    format(
                      parseISO(currentReview.review_date),
                      "MMMM d, yyyy",
                    )}{" "}
                  on {currentReview?.platform_id}
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              justifyContent="flex-end"
              sx={{ mt: 3 }}
              gap={2}
            >
              <AIResponseButton
                userId={localStorage.getItem("user_id")}
                reviewId={currentReview?.id}
                onResponseGenerated={handleResponseGenerated}
              />
              <Button
                onClick={handleCloseModal}
                color="secondary"
                sx={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  color: "#6200EE",
                  border: "1px solid #6200EE",
                  "&:hover": {
                    backgroundColor: "#EDE7F6",
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Modal>
        <Button
          onClick={handleNextReview}
          disabled={currentIndex >= total_reviews - 1}
          sx={{
            position: "absolute",
            right: "0.5rem",
            minWidth: "40px",
            minHeight: "40px",
            borderRadius: "50%",
            backgroundColor: theme.palette.grey[300],
            color: theme.palette.common.black,
            "&:hover": {
              backgroundColor: theme.palette.grey[400],
            },
            "&:disabled": {
              visibility: "hidden",
            },
          }}
        >
          <ChevronRight />
        </Button>
      </Box>
    </Box>
  );
};

export default DashRecent;
