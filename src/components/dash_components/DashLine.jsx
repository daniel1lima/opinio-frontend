import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios"; // Import axios for fetching data
import { compareAsc } from "date-fns"; // Add this import

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          backgroundColor: "white",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <Typography>{`Date: ${label}`}</Typography>
        <Typography>{`Count: ${payload[0].value}`}</Typography>
      </Box>
    );
  }
  return null;
};

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

  // Helper function to sort months
  const sortMonths = (data) => {
    const monthOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return Object.entries(data).sort(
      (a, b) =>
        monthOrder.indexOf(a[0].slice(0, 3)) -
        monthOrder.indexOf(b[0].slice(0, 3)),
    );
  };

  // Helper function to sort days
  const sortDays = (data) => {
    const dayOrder = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return Object.entries(data).sort(
      (a, b) =>
        dayOrder.indexOf(a[0].slice(0, 3)) - dayOrder.indexOf(b[0].slice(0, 3)),
    );
  };

  const getBinnedReviews = () => {
    if (!reviewData || Object.keys(reviewData).length === 0) {
      return []; // Return an empty array if reviewData is not populated
    }

    switch (timeframe) {
      case 0: // All Time
        return Object.entries(reviewData.allTime || {})
          .sort((a, b) => compareAsc(new Date(a[0], 0), new Date(b[0], 0)))
          .map(([year, count]) => ({
            date: year,
            count,
          }));
      case 1: // Week
        return sortDays(reviewData.week || {}).map(([day, count]) => ({
          date: day,
          count,
        }));
      case 2: // Month
        return sortMonths(reviewData.month || {}).map(([month, count]) => ({
          date: month,
          count,
        }));
      case 3: // Year
        return sortMonths(reviewData.year || {}).map(([month, count]) => ({
          date: month,
          count,
        }));
      default:
        return [];
    }
  };

  const binnedReviews = getBinnedReviews();

  // Calculate the min and max values for the Y-axis
  const minCount = Math.min(...binnedReviews.map((item) => item.count));
  const maxCount = Math.max(...binnedReviews.map((item) => item.count));

  // Generate integer ticks for Y-axis
  const generateYAxisTicks = () => {
    const tickCount = 5; // You can adjust this number as needed
    const range = maxCount - minCount;
    const step = Math.ceil(range / (tickCount - 1));
    const ticks = [];
    for (let i = 0; i <= tickCount; i++) {
      ticks.push(Math.max(0, Math.floor(minCount + i * step)));
    }
    return [...new Set(ticks)]; // Remove duplicates
  };

  // Function to format Y-axis ticks
  const formatYAxis = (tickItem) => Math.floor(tickItem);

  // Function to format X-axis ticks
  const formatXAxis = (tickItem) => {
    if (timeframe === 2) {
      // Month view
      return tickItem.slice(0, 3); // Show only first 3 characters of month name
    }
    return tickItem;
  };

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

      <Box height={300} mt={2} position="relative">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={binnedReviews}
            margin={{
              top: 20,
              right: 40,
              left: 0,
              bottom: 40,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.palette.grey[200]}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fontWeight: "bold" }}
              tickFormatter={formatXAxis}
              interval="preserveStartEnd"
              stroke={theme.palette.text.primary}
              strokeWidth={2}
            />
            <YAxis
              tick={{ fontSize: 12, fontWeight: "bold" }}
              domain={[0, "dataMax"]}
              allowDataOverflow={true}
              stroke={theme.palette.text.primary}
              strokeWidth={2}
              tickFormatter={formatYAxis}
              ticks={generateYAxisTicks()}
            />
            <Tooltip
              content={<CustomTooltip />}
              position={{ x: 20, y: 0 }}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#1250cc"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
              isAnimationActive={false} // Turn off animations
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default DashLine;
