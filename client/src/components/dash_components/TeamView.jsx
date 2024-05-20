import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import LongMenu from "components/DotMenu";
import FlexBetween from "components/FlexBetween";
import React from "react";

const TeamView = () => {
  const theme = useTheme();

  return (
    <Box
      gridColumn="span 6"
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
        <Box ml="1rem" mt="1rem" mb="1rem">
          <Typography variant="h4" fontWeight="bold">
            {" "}
            Team Members
          </Typography>
        </Box>
        <LongMenu />
      </FlexBetween>
      <Box
        sx={{
          borderRadius: "16px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Khrish" src="" />
            <Avatar alt="Youssef" src="" />
            <Avatar alt="Khrish" src="" />
            <Avatar alt="Youssef" src="" />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Avatar alt="Khrish" src="" />
            <Avatar alt="Youssef" src="" />
            <Avatar alt="Khrish" src="" />
            <Avatar alt="Youssef" src="" />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default TeamView;
