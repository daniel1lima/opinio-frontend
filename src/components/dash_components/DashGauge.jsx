import React from 'react'

import { DownloadOutlined, Timeline } from "@mui/icons-material";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {
  Box,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";

const Dashgauge = () => {
    const theme = useTheme();
  return (
    <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={theme.palette.background.default}
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
              transition: "0.3s ease-out"
              // scale: "102.6%"
            }
          }}
        >
          <FlexBetween>
            <Box
              display="flex"
              flexDirection="row"
              m="1rem 1rem 1rem 1rem"
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
          <Divider />
          <Box  sx={{ borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Gauge width={150} height={150} value={80} sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#2456EC",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      }}/>
          </Box>
        </Box>
  )
}

export default Dashgauge
