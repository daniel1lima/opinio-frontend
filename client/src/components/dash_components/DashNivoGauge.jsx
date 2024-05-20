import React from 'react'
import {
    Box,
    Typography,
    useTheme,
  } from "@mui/material";
import { ResponsivePie } from "@nivo/pie";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const data = [
  {
    id: "haskell",
    label: "haskell",
    value: 63,
    color: "hsl(341, 70%, 50%)",
  },
];

const DashNivoGauge = () => {
    const theme = useTheme();
  return (
    <Box
      gridColumn="span 7"
      gridRow="span 2"
      backgroundColor={theme.palette.background.default}
      borderRadius="0.55rem"
      p="1rem"
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
          mt=".5rem"
          mb=".5rem"
        >
          <Typography variant="h4" fontWeight="bold">
            {" "}
            Overall Score
          </Typography>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          gap="10px"
          ml="1.5rem"
          mt=".5rem"
          mb=".5rem"
        >
          <LongMenu />
        </Box>
      </FlexBetween>
      <Box
      height="70%"
        sx={{
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ResponsivePie
          data={data}
          margin={{ top:10, bottom:10 }}
          startAngle={-4}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          colors={{ scheme: "category10" }}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", "0.3"]],
          }}
          enableArcLinkLabels={false}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color", modifiers: [] }}
          enableArcLabels={false}
          arcLabel="id"
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 2,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}

        />
      </Box>
    </Box>
  );
};

export default DashNivoGauge;
