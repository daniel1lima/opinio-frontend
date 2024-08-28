import { Typography, Box, useTheme } from "@mui/material";

import React from "react";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  return (
    <Box mt="1rem" mr="1rem" mb="1rem" textAlign="left">
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "5px" }}
        justifyContent="center"
      >
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
