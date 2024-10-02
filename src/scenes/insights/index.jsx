import React, { useState, useCallback, useEffect } from "react";
import { Box, useTheme, Divider } from "@mui/material";
import Header from "components/Header";

import { ThumbUpAltOutlined, ThumbDownAltOutlined } from "@mui/icons-material";
import axios from "axios";

import CustomerInsights from "./CustomerInsights";
// import MetricsSection from "./MetricsSection";
import InsightBox from "./InsightBox";

const Insights = () => {
  const theme = useTheme();
  const company = localStorage.getItem("company_id");

  const [insightsData, setInsightsData] = useState(null);
  const [animatedBoxes, setAnimatedBoxes] = useState([]);

  const fetchInsights = useCallback(async () => {
    try {
      if (!insightsData) {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVICES_BASE_URL}/fetch_insights?company_id=${company}`,
        );
        setInsightsData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching insights:", error);
    }
  }, [insightsData, company]);

  useEffect(() => {
    fetchInsights();
  }, [fetchInsights]);

  useEffect(() => {
    if (insightsData && insightsData.insights) {
      const animationDelay = 100; // milliseconds between each box animation
      insightsData.insights.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedBoxes((prev) => [...prev, index]);
        }, index * animationDelay);
      });
    }
  }, [insightsData]);

  if (!insightsData) {
    return <Box>Loading...</Box>;
  }

  const positiveInsights = insightsData.highlights
    ? insightsData.highlights.map((highlight) => ({
        icon: ThumbUpAltOutlined,
        text: highlight.title,
        value: parseInt(highlight.percentage),
        color: theme.palette.success.main,
        description: highlight.description,
      }))
    : [];

  const negativeInsights = insightsData.lowlights
    ? insightsData.lowlights.map((lowlight) => ({
        icon: ThumbDownAltOutlined,
        text: lowlight.title,
        value: parseInt(lowlight.percentage),
        color: theme.palette.error.main,
        description: lowlight.description,
      }))
    : [];

  console.log(insightsData);

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
      mb="1.5rem"
      p="2rem"
    >
      <Box ml="0.8rem">
        <Header title="Insights" />
      </Box>

      <Divider sx={{ mb: "2rem" }} />

      <Box display="grid" gridTemplateColumns="repeat(2, 3fr)" gap="20px">
        <CustomerInsights
          title="Customers Are Loving..."
          insights={positiveInsights}
        />
        <CustomerInsights
          title="Driving Reviews Down..."
          insights={negativeInsights}
        />
      </Box>

      {/* <MetricsSection /> */}

      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="20px"
        mt="20px"
      >
        {insightsData.insights
          ? insightsData.insights.map((insight, index) => (
              <Box
                key={index}
                sx={{
                  opacity: animatedBoxes.includes(index) ? 1 : 0,
                  transform: animatedBoxes.includes(index)
                    ? "translateY(0)"
                    : "translateY(20px)",
                  transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
                }}
              >
                <InsightBox {...insight} />
              </Box>
            ))
          : [...Array(4)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  animation: "pulse 1.5s infinite",
                  bgcolor: "grey.300",
                  borderRadius: "8px",
                  height: "200px",
                }}
              />
            ))}
      </Box>
    </Box>
  );
};

export default Insights;
