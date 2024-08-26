import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material";
import { format } from "date-fns";
import { useGetReviewDataByCompanyQuery } from "../../state/api";

const DashRecent = ({ data }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const reviewsPerPage = 10;

  const { data: reviewsData, isLoading, error } = useGetReviewDataByCompanyQuery({
    company_id: localStorage.getItem("company_id"),
    page: currentPage,
    page_size: reviewsPerPage,
  });

  

  const total_reviews = reviewsData ? reviewsData.totalReviews : 0;
  const page = reviewsData ? reviewsData.page : 1;
  const reviews_per_page = reviewsData ? reviewsData.pageSize : 10;

  const currentReviews = Array.isArray(reviewsData?.reviews) ? reviewsData.reviews : [];


  useEffect(() => {
    setCurrentReviewIndex(0);
  }, [reviewsData]);

  const handleNextPage = () => {
    if (currentReviewIndex >= currentReviews.length - 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    } else {
      setCurrentReviewIndex(currentReviewIndex + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(currentReviewIndex - 1);
    } else if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setCurrentReviewIndex(reviewsPerPage - 1);
    }
  };

  const currentReview = currentReviews[currentReviewIndex];

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
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
      }}
    >
      <Box
        display="flex"
        flexDirection="row"
        mt="1.5rem"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h4" fontWeight="bold" color="#000000">
          Recent Reviews
        </Typography>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          style={{ marginLeft: "1rem" }}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseMenu}
          PaperProps={{
            style: {
              maxHeight: 200,
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={handleCloseMenu}>Option 1</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Option 2</MenuItem>
          <MenuItem onClick={handleCloseMenu}>Option 3</MenuItem>
        </Menu>
      </Box>
      <Box display="flex" alignItems="center" mt="2rem" height="200px">
        <Button
          onClick={handlePrevPage}
          disabled={currentReviewIndex + reviews_per_page * (page - 1) === 0}
          sx={{
            minWidth: "30px",
            minHeight: "30px",
            borderRadius: "50%",
            backgroundColor: theme.palette.primary,
            color: theme.palette.common.black,
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
            },
            "&:disabled": {
              visibility: "hidden",
            },
          }}
        >
          <ChevronLeft />
        </Button>
        <Box ml="1rem" mr="1rem" height="100%" overflowY="auto" flexGrow={1}>
          {isLoading && <Typography>Loading...</Typography>}
          {error && (
            <Typography variant="h6" fontWeight="bold" fontFamily="Arial">
              Error loading reviews
            </Typography>
          )}
          {currentReview && (
            <Box
              p="0.5rem"
              borderRadius="10px"
              bgcolor={theme.palette.grey[100]}
              mb="0.5rem"
              height="95%"
              sx={{ overflow: "hidden" }}
            >
              <Typography
                height="94%"
                variant="subtitle2"
                className="show-scrollbar"
                sx={{
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { width: "2px" },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.common.black,
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: theme.palette.black,
                  },
                }}
              >
                {currentReview.review_text}
              </Typography>
              <Typography variant="subtitle2" color={theme.palette.grey[500]}>
                {format(new Date(currentReview.review_date), "PPpp")}
              </Typography>
            </Box>
          )}
        </Box>
        <Button
          onClick={handleNextPage}
          disabled={currentReviewIndex + reviews_per_page * (page - 1) >= total_reviews - 1}
          sx={{
            minWidth: "30px",
            minHeight: "30px",
            borderRadius: "50%",
            backgroundColor: theme.palette.primary,
            color: theme.palette.common.black,
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
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