import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Grid,
  CircularProgress,
} from "@mui/material";
import { ThumbUpAltOutlined, ThumbDownAltOutlined } from "@mui/icons-material";
import axios from "axios";

import TopInsightCard from "./TopInsightCard";
import UrgentInsightCard from "./UrgentInsightCard";

const DashboardInsights = () => {
  const theme = useTheme();
  const company = localStorage.getItem("company_id");

  const [insightsData, setInsightsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInsights = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVICES_BASE_URL}/fetch_insights?company_id=${company}`,
      );
      setInsightsData(response.data.data);
    } catch (error) {
      console.error("Error fetching insights:", error);
    } finally {
      setLoading(false);
    }
  }, [company]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!insightsData) {
    return <Typography>No insights available.</Typography>;
  }

  const topPositiveInsight = insightsData.highlights?.[0] || null;
  const topNegativeInsight = insightsData.lowlights?.[0] || null;
  const urgentInsights =
    insightsData.insights?.sort((a, b) => b.urgency - a.urgency).slice(0, 3) ||
    [];

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
      <Typography variant="h5" fontWeight="bold" mb={2}>
        Key Insights
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TopInsightCard
            insight={topPositiveInsight}
            type="positive"
            icon={ThumbUpAltOutlined}
            color={theme.palette.success.main}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopInsightCard
            insight={topNegativeInsight}
            type="negative"
            icon={ThumbDownAltOutlined}
            color={theme.palette.error.main}
          />
        </Grid>
      </Grid>
      <Box mt={3}>
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Urgent Insights
        </Typography>
        <Grid container spacing={2}>
          {urgentInsights.map((insight, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <UrgentInsightCard insight={insight} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardInsights;
