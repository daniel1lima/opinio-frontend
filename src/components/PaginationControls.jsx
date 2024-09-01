import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const PaginationControls = ({
  page,
  totalPages,
  handlePrevPage,
  handleNextPage,
  isLoading,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={2}
      borderTop={1}
      borderColor="divider"
    >
      <IconButton
        onClick={handlePrevPage}
        disabled={page === 1 || isLoading}
        color="primary"
        sx={{
          "&:hover .MuiSvgIcon-root": {
            color: "primary.dark",
          },
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
        color="primary"
        sx={{
          "&:hover .MuiSvgIcon-root": {
            color: "primary.dark",
          },
        }}
      >
        <ChevronRightIcon />
      </IconButton>
    </Box>
  );
};

export default PaginationControls;
