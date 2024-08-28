import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";
import { BarChart } from "@mui/x-charts/BarChart";

const DashBar = (data) => {
  const theme = useTheme();

  // console.log(data.data);

  const transformedData = data.data.data
    ? data.data.data.map((item) => ({
        category: item.category,
        average_sentiment: item.average_sentiment,
        average_polarity: item.average_polarity,
      }))
    : [];

  const xAxis = [
    {
      scaleType: "band",
      data: transformedData.map((item) => {
        const firstLetter = item.category.charAt(0).toUpperCase();
        const restOfLetters = item.category.slice(1).toLowerCase();
        return firstLetter + restOfLetters;
      }),
    },
  ];

  const series = [
    {
      data: transformedData.map((item) => item.average_sentiment),
      color: "#3f51b5", // Custom color for average_sentiment data
    },
    {
      data: transformedData.map((item) => item.average_polarity),
      color: "#2196f3", // Custom color for average_polarity data
    },
  ];

  // console.log(data)

  // if (data.data.isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <Box
      gridColumn="span 15"
      gridRow="span 3"
      backgroundColor={theme.palette.background.default}
      p="1rem"
      borderRadius="0.55rem"
      sx={{
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          transition: "0.3s ease-out",
          // scale: "102.6%"
        },
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
            {" "}
            Rating by category
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap="10px" ml="1.5rem">
          <LongMenu />
        </Box>
      </FlexBetween>
      <Box>
        <BarChart
          xAxis={[{ label: "Category" }]}
          yAxis={xAxis}
          series={series}
          height={300}
          borderRadius={5}
          layout="horizontal"
          sx={{ "& .MuiChartsAxis-tickLabel tspan": { fontSize: "0.7em" } }}
        />
      </Box>
    </Box>
  );
};

export default DashBar;
