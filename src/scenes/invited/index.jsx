import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";

import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useTheme } from "@emotion/react";
import logo from "assets/logo.png";

import InputAdornment from "@mui/material/InputAdornment";

import { AccountCircle } from "@mui/icons-material";

import FetchCompanyId from "components/FetchCompanyId";

const Invited = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();

  const [companyIdInput, setCompanyIdInput] = useState("");

  return (
    <Box id="hero" bgcolor={theme.palette.grey[100]} height="100%" width="100%">
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            variant="h1"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignSelf: "center",
              textAlign: "center",
              fontSize: "clamp(3.5rem, 10vw, 4rem)",
            }}
          >
            Welcome to&nbsp;
            <Box component="img" src={logo} width="15rem" height="5rem" />
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
          >
            Explore our cutting-edge dashboard, delivering high-quality
            solutions tailored to your needs. Elevate your experience with
            top-tier features and services.
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              size="small"
              variant="outlined"
              placeholder="Company ID"
              value={companyIdInput}
              onChange={(e) => setCompanyIdInput(e.target.value)}
            />
            <FetchCompanyId id={companyIdInput} />
          </Stack>
          <Typography
            variant="caption"
            textAlign="center"
            sx={{ opacity: 0.8 }}
          >
            By clicking &quot;Start now&quot; you agree to our&nbsp;
            <Link href="https://www.google.com" sx={{ color: "black" }}>
              Terms & Conditions.
            </Link>
          </Typography>
        </Stack>
        <Link
          href="/sign-in"
          underline="hover"
          variant="subtitle1"
          mt="1.5rem"
          textAlign="center"
          color="text.secondary"
          sx={{
            "&:hover": { transform: "scale(1.05)" },
            alignSelf: "center",
            width: { sm: "100%", md: "80%" },
          }}
        >
          Already have an account?&nbsp;
        </Link>
      </Container>
    </Box>
  );
};

export default Invited;
