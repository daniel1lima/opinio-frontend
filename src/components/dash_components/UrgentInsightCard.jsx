import React from "react";
import { Box, Typography, useTheme } from "@mui/material";

const UrgentInsightCard = ({ insight }) => {
  const theme = useTheme();

  const getUrgencyColor = (urgency) => {
    if (urgency <= 2) return theme.palette.success.main;
    if (urgency <= 4) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      borderRadius="1rem"
      p="1rem"
      height="100%"
      display="flex"
      flexDirection="column"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="4px"
        bgcolor={getUrgencyColor(insight.urgency)}
      />
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        {insight.title}
      </Typography>
      <Typography variant="body2" flex={1}>
        {insight.problem}
      </Typography>
      <Box display="flex" justifyContent="flex-end" alignItems="center" mt={1}>
        <Typography
          variant="caption"
          fontWeight="bold"
          color={getUrgencyColor(insight.urgency)}
        >
          Urgency: {insight.urgency}/6
        </Typography>
      </Box>
    </Box>
  );
};

export default UrgentInsightCard;
