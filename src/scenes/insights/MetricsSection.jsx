import { Box, Typography } from "@mui/material";
import React from "react";

const data = [
  { value: 20 },
  { value: 25 },
  { value: 22 },
  { value: 28 },
  { value: 26 },
  { value: 30 },
];

const MetricsSection = () => {
  return (
    <Box display="flex" justifyContent="space-between" mt={3} mb={3}>
      <Box
        bgcolor="white"
        p={2}
        borderRadius={2}
        flexGrow={1}
        mr={2}
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight="bold">
          Solutions Implemented
        </Typography>
        <Box display="flex" alignItems="baseline">
          <Typography variant="h3" fontWeight="bold" color="secondary">
            27
          </Typography>
          <Typography variant="body1" ml={1}>
            /80
          </Typography>
        </Box>
      </Box>
      <Box
        bgcolor="white"
        p={2}
        borderRadius={2}
        flexGrow={1}
        mr={2}
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight="bold">
          Solutions Implemented
        </Typography>
        <Box display="flex" alignItems="baseline">
          <Typography variant="h3" fontWeight="bold" color="secondary">
            27
          </Typography>
          <Typography variant="body1" ml={1}>
            /80
          </Typography>
        </Box>
      </Box>

      <Box
        bgcolor="white"
        p={2}
        borderRadius={2}
        flexGrow={1}
        mr={2}
        boxShadow={1}
      >
        <Typography variant="h6" fontWeight="bold">
          Solutions Implemented
        </Typography>
        <Box display="flex" alignItems="baseline">
          <Typography variant="h3" fontWeight="bold" color="secondary">
            27
          </Typography>
          <Typography variant="body1" ml={1}>
            /80
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MetricsSection;
