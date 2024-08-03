import React from 'react';
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import LongMenu from 'components/DotMenu';
import FlexBetween from 'components/FlexBetween';
import BarAnimation from 'components/BarAnimated';
import { BarChart } from "@mui/x-charts/BarChart";

const DashBar = (data) => {
  const theme = useTheme();

  const transformedData = data.data.data
    ? data.data.data.map(item => ({
        category: item.category,
        average_sentiment: item.average_sentiment
      }))
    : [];

  const xAxis = [{
    scaleType: 'band',
    data: transformedData.map(item => {
      const firstLetter = item.category.charAt(0).toUpperCase();
      const restOfLetters = item.category.slice(1).toLowerCase();
      return firstLetter + restOfLetters;
    }),
  }];

  const series = [
    {
      data: transformedData.map(item => item.average_sentiment),
      color: '#1854cc', // Custom color for average_sentiment data
      barWidth: 5, // Set bar width to be thinner
    }
  ];

  return (
    <Box
      gridColumn="span 12"
      gridRow="span 4"
      backgroundColor={theme.palette.background.default}
      p="1rem"
      borderRadius="0.55rem"
      sx={{
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          transition: "0.3s ease-out"
        }
      }}
    >
      <FlexBetween>
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          ml="1.5rem"
          mt=".3rem"
        >
          <Typography variant="h4" fontWeight="bold">
            Customer Sentiment by Category
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          ml="1.5rem"
        >
          <LongMenu />
        </Box>
      </FlexBetween>
      <Box>
        <BarChart
          xAxis={xAxis}
          yAxis={[{ label: 'Customer Sentiment', max: 5 }]} // Set max value to 5
          series={series}
          height={400}
          borderRadius={5}
          layout="vertical" // Change layout to vertical
          sx={{ "& .MuiChartsAxis-tickLabel tspan": { fontSize: "0.7em" } }}
        />
      </Box>
    </Box>
  );
};

export default DashBar;