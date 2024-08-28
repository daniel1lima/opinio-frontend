import React from "react";

import { DownloadOutlined, Timeline } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";

const Stats = ({ header, stat }) => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 10"
      gridRow="span 1"
      backgroundColor={theme.palette.background.default}
      borderRadius="0.55rem"
      sx={{
        "&:hover": {
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          transition: "0.3s ease-out",
          scale: "105.6%",
        },
      }}
    >
      <FlexBetween>
        <Box display="flex" flexDirection="row" ml="1rem" mt="1rem">
          <Typography variant="h6" fontWeight="bold">
            {header}
          </Typography>
        </Box>
        <Box display="flex" flexDirection="row" gap="10px">
          <LongMenu />
        </Box>
      </FlexBetween>
      <Typography mt=".5rem" variant="h2" fontWeight="bold" align="center">
        {stat}
        {stat > 0 && (
          <ExpandLessOutlinedIcon color="success" sx={{ fontSize: 26 }} />
        )}
        {stat < 0 && (
          <ExpandLessOutlinedIcon color="error" sx={{ fontSize: 26 }} />
        )}
      </Typography>
    </Box>
  );
};

export default Stats;
