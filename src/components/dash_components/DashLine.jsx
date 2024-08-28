import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";
import { BarChart } from "@mui/x-charts";
import axios from "axios"; // Import axios for fetching data

const DashLine = ({ timeframe }) => {
  const theme = useTheme();
  const [reviewData, setReviewData] = useState({}); // State to hold fetched review data

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BASE_URL + "/client/get_frequency_reviews",
          {
            params: {
              company_id: localStorage.getItem("company_id"),
            },
          },
        ); // Send company_id as a query parameter
        setReviewData(response.data);
      } catch (error) {
        console.error("Error fetching review data:", error);
      }
    };

    fetchReviewData();
  }, []);

  const getBinnedReviews = () => {
    if (!reviewData || Object.keys(reviewData).length === 0) {
      return []; // Return an empty array if reviewData is not populated
    }

    switch (timeframe) {
      case 0: // All Time
        return Object.entries(reviewData.allTime || {}).map(
          ([year, count]) => ({
            date: year,
            count,
          }),
        );
      case 1: // Week
        return Object.entries(reviewData.week || {}).map(([day, count]) => ({
          date: day,
          count,
        }));
      case 2: // Month
        return Object.entries(reviewData.month || {}).map(([month, count]) => ({
          date: month,
          count,
        }));
      case 3: // Year
        return Object.entries(reviewData.year || {}).map(([month, count]) => ({
          date: month,
          count,
        }));
      default:
        return [];
    }
  };

  const binnedReviews = getBinnedReviews();

  return (
    <Box
      gridColumn="span 20"
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
      <FlexBetween>
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          ml="1.5rem"
          mt=".5rem"
        >
          <Typography variant="h4" fontWeight="bold">
            Frequency of Reviews
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          ml="1.5rem"
          mt=".5rem"
        >
          <LongMenu />
        </Box>
      </FlexBetween>

      <Box>
        <BarChart
          borderRadius={5}
          xAxis={[
            { scaleType: "band", data: binnedReviews.map((item) => item.date) },
          ]}
          series={[
            {
              data: binnedReviews.map((item) => item.count),
              color: "#1250cc",
            },
          ]}
          height={300}
          sx={{ "& .MuiChartsAxis-tickLabel tspan": { fontSize: "0.8em" } }}
        />
      </Box>
    </Box>
  );
};

export default DashLine;
