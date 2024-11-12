import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const TopInsightCard = ({ insight, type, icon: Icon, color }) => {
  const theme = useTheme();

  if (!insight) return null;

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      borderRadius="1rem"
      p="1rem"
      height="100%"
      display="flex"
      flexDirection="column"
      outline={type === "positive" ? "1px solid green" : "1px solid red"}
    >
      <Box display="flex" alignItems="center" mb={1}>
        <Icon sx={{ color, marginRight: 1 }} />
        <Typography variant="h6" fontWeight="bold">
          Top {type === "positive" ? "Positive" : "Negative"} Insight
        </Typography>
      </Box>
      <Typography variant="body1" fontWeight="bold" mb={1}>
        {insight.title}
      </Typography>
      <Typography variant="body2" flex={1}>
        {insight.description}
      </Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1}>
        <Typography variant="h6" fontWeight="bold" color={color}>
          {insight.percentage}
        </Typography>
      </Box>
    </Box>
  );
};

export default TopInsightCard;
