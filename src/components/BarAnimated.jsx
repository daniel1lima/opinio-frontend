import * as React from "react";
import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import FlexBetween from "./FlexBetween";

export default function BarAnimation(data) {
  // console.log(data.data);

  const xAxis = [
    {
      scaleType: "band",
      data: data.data.map((item) => {
        const firstLetter = item.category.charAt(0).toUpperCase();
        const restOfLetters = item.category.slice(1).toLowerCase();
        return firstLetter + restOfLetters;
      }),
      label: "Category",
      colorMap: {
        type: "ordinal",
        colors: [
          "#ccebc5",
          "#a8ddb5",
          "#7bccc4",
          "#4eb3d3",
          "#2b8cbe",
          "#08589e",
        ],
      },
    },
  ];

  const series = [
    { data: data.data.map((item) => item.average_sentiment) },
    { data: data.data.map((item) => item.average_polarity) },
  ];

  return (
    <FlexBetween>
      <Box sx={{ width: "100%" }}>
        <BarChart xAxis={xAxis} series={series} height={300} barLabel="value" />
      </Box>
    </FlexBetween>
  );
}
