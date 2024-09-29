import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

const InsightItem = ({ icon: Icon, text, value, color }) => (
  <Box mb={2} p={2}>
    <Box display="flex" alignItems="center" mb={1}>
      <Icon sx={{ width: 24, height: 24, mr: 1, color: color }} />
      <Typography variant="body3" fontWeight="bold">
        {text}
      </Typography>
    </Box>
    <Box display="flex" alignItems="center">
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          flexGrow: 1,
          height: 10, // Increased height for better visibility
          borderRadius: 5, // Slightly rounded corners
          backgroundColor: "rgba(0,0,0,0.1)",
          "& .MuiLinearProgress-bar": {
            backgroundColor: color,
            borderRadius: 5, // Match the border radius of the track
          },
          "&.MuiLinearProgress-root": {
            marginTop: 1, // Add some space above the progress bar
            marginBottom: 1, // Add some space below the progress bar
          },
        }}
      />
      <Typography
        variant="body3"
        fontWeight="bold"
        ml={1}
        minWidth={40}
        textAlign="right"
      >
        {value}%
      </Typography>
    </Box>
  </Box>
);

const CustomerInsights = ({ title, insights }) => {
  return (
    <Box bgcolor="white" p={2} borderRadius={2} boxShadow={1}>
      <Typography ml={2} mt={2} variant="h4" mb={2} fontWeight="bold">
        {title}
      </Typography>
      {insights.map((insight, index) => (
        <InsightItem key={index} {...insight} />
      ))}
    </Box>
  );
};

export default CustomerInsights;
