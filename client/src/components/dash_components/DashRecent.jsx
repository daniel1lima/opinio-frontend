import React, { useState } from "react";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { format } from "date-fns";

const DashRecent = ({ data }) => {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 1;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * reviewsPerPage;
  const endIndex = startIndex + reviewsPerPage;
  const currentReviews = data.data ? data.data.slice(startIndex, endIndex) : [];

  return (
    <Box
      gridColumn="span 17"
      gridRow="span 3"
      backgroundColor={theme.palette.background.default}
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
        gap="10px"
        ml="1.5rem"
        mt="1.5rem"
      >
        <Typography variant="h4" fontWeight="bold">
          {" "}
          Recent Reviews
        </Typography>
      </Box>
      <Box ml="1rem" mt="2rem" height="200px" overflowY="auto">
        {data.isLoading && <Typography></Typography>}
        {data.error && (
          <Typography variant="h6" fontWeight="bold" fontFamily="Arial">
            Error loading reviews
          </Typography>
        )}
        {currentReviews.map((review, index) => (
          <Box p="0.5rem" borderRadius="10px" bgcolor={theme.palette.grey[100]} key={index} mb="0.5rem" height="95%" sx={{ overflow: "hidden" }}>
            <Typography
              height="94%"
              variant="subtitle2"
              className="show-scrollbar" // Added class to show scrollbar
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
              {review.processed_sentences}
            </Typography>
            <Typography variant="subtitle2" color={theme.palette.grey[500]}>
              {format(new Date(review.date), "PPpp")}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" mt="1rem">
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          sx={{
            minWidth: "40px",
            minHeight: "40px",
            borderRadius: "50%",
            backgroundColor: theme.palette.primary,
            color: theme.palette.common.black,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            "&:disabled": {
              visibility: "hidden",
            },
          }}
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={endIndex >= (data.data ? data.data.length : 0)}
          sx={{
            minWidth: "40px",
            minHeight: "40px",
            borderRadius: "50%",
            backgroundColor: theme.palette.primary,
            color: theme.palette.common.black,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
            "&:disabled": {
              backgroundColor: theme.palette.grey[400],
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
