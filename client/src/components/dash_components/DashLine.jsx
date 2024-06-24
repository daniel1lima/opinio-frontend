import React, { useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";
import { BarChart } from "@mui/x-charts";
import { subWeeks, subMonths, subYears, isAfter } from "date-fns";

const DashLine = ({ data, timeframe }) => {
  const theme = useTheme();

  const reviews_final = data.data;

  // console.log(timeframe);

  const filterReviews = (reviews, timeframe) => {
    if (!reviews || !reviews.length) return []; // If reviews are empty, return empty array
    const now = new Date();
    switch (timeframe) {
      case 0:
        return reviews; // Return all reviews
      case 1:
        const lastWeek = subWeeks(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastWeek)
        );
      case 2:
        const lastMonth = subMonths(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastMonth)
        );
      case 3:
        const lastYear = subYears(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastYear)
        );
      default:
        return [];
    }
  };

  const filteredReviews = filterReviews(reviews_final, timeframe);

  // console.log(filteredReviews);

  const reviewCountsPerDate = {};

  filteredReviews.forEach((review) => {
    const date = new Date(review.date).toISOString().split("T")[0]; // Extracting the date without the time part
    if (reviewCountsPerDate[date]) {
      reviewCountsPerDate[date]++;
    } else {
      reviewCountsPerDate[date] = 1;
    }
  });

  const reviewCountsArray = Object.entries(reviewCountsPerDate).map(
    ([date, count]) => ({
      date: new Date(date),
      count,
    })
  );

  // Custom sort function to sort by date
  reviewCountsArray.sort((a, b) => a.date.getTime() - b.date.getTime());

  // console.log(reviewCountsArray);

  function binReviews(reviewCountsArray, timeframe) {
    const binnedReviews = {};

    reviewCountsArray.forEach(({ date, count }) => {
      let bin;
      if (timeframe === 0) {
        bin = new Date(date).getFullYear();
      } else if (timeframe === 1) {
        bin = new Date(date).toLocaleString("en-US", { weekday: "short" });
      } else if (timeframe === 3) {
        bin = new Date(date).toLocaleString("en-US", { month: "short" });
      }

      if (binnedReviews[bin]) {
        binnedReviews[bin] += count;
      } else {
        binnedReviews[bin] = count;
      }
    });

    return Object.entries(binnedReviews).map(([date, count]) => ({
      date: date.toString(),
      count,
    }));
  }

  const binnedReviews = binReviews(reviewCountsArray, timeframe);

  // console.log(binnedReviews);

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
          // barLabel="value"
          borderRadius={5}
          xAxis={[{ scaleType: "band", data: binnedReviews.map((item) => item.date) }]}
          series={[
            {
              data: binnedReviews.map((item) => item.count),
              color: '#1250cc'
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
