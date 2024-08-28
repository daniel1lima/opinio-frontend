import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const DashReport = () => {
  const theme = useTheme();
  return (
    <Box
      gridColumn="span 12"
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
      <Box
        display="flex"
        flexDirection="row"
        gap="10px"
        ml="1.5rem"
        mt="1.5rem"
      >
        <Typography variant="h4" fontWeight="bold">
          {" "}
          Qualitative Report
        </Typography>
      </Box>
      <Box ml="1rem" mt="2rem">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </Box>
    </Box>
  );
};

export default DashReport;
