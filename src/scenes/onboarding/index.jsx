import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { alpha, styled, keyframes } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useTheme } from "@emotion/react";
import logo from "assets/logo.png";
import onboardingGraphic from "assets/onboarding.jpeg";
import { purple } from "@mui/material/colors";
import { ChevronRight, Scale } from "@mui/icons-material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { ChevronLeft } from "@mui/icons-material";

// Define custom button styles
const BootstrapButton = styled(Button)({
  boxShadow: "none",
  textTransform: "none",
  fontSize: 16,
  padding: "6px 12px",
  border: "1px solid",
  lineHeight: 1.5,
  backgroundColor: "#0063cc",
  borderColor: "#0063cc",
  color: "#FFFFFF",
  fontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
    transform: "scale(1)",
    transition: "transform .2s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
  "&:focus": {
    boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
  },
});

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

// Define keyframes for swipe animation
const swipeUp = keyframes`
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-20px);
    opacity: 0;
  }
`;

const swipeIn = keyframes`
  0% {
    transform: translateY(20px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Onboarding = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const theme = useTheme();
  const [step, setStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [companyIdInput, setCompanyIdInput] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Add loading state

  useEffect(() => {
    const img = new Image();
    img.src = onboardingGraphic; // Preload the image
    img.onload = () => setIsImageLoaded(true); // Set loading state to true when the image is loaded
  }, []); // Empty dependency array to run once on mount

  if (!isImageLoaded) {
    return <div></div>; // Show a loading indicator while the image is loading
  }

  const handleNextStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prevStep) => prevStep + 1);
      setIsAnimating(false);
    }, 300); // Match this duration with the animation duration
    if (step === 2) {
      setStep(3); // Move to the Calendly step
    }
  };

  const handlePrevStep = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep((prevStep) => prevStep - 1);
      setIsAnimating(false);
    }, 300); // Match this duration with the animation duration
  };

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "70%",
          height: "100%",
          padding: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#ffffff", // Light baby blue
        }}
      >
        <Stack
          spacing={4}
          sx={{ width: { xs: "100%", sm: "70%" }, margin: "0 auto" }}
        >
          <Box
            sx={{
              animation: isAnimating
                ? `${swipeUp} 0.1s forwards`
                : step === 0
                  ? `${swipeIn} 0.2s forwards`
                  : "none",
            }}
          >
            {step === 0 && (
              <>
                <Stack spacing={2}>
                  <Typography
                    variant="h4"
                    sx={{
                      textAlign: "left",
                      color: theme.palette.primary.secondary,
                    }}
                  >
                    Let's get started!
                  </Typography>
                  <Typography
                    variant="h2"
                    sx={{ textAlign: "left", fontWeight: "bold" }}
                  >
                    I'm planning to use Opinio for...
                  </Typography>
                </Stack>
              </>
            )}
            {step === 1 && (
              <>
                <Typography
                  variant="h2"
                  sx={{ textAlign: "left", fontWeight: "bold" }}
                >
                  How large is your business?
                </Typography>
              </>
            )}
            {step === 2 && (
              <>
                <Stack spacing={2}>
                  <Typography
                    variant="h2"
                    sx={{ textAlign: "center", fontWeight: "bold" }}
                  >
                    Schedule a demo!
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      color: theme.palette.primary.secondary,
                    }}
                  >
                    We haven't made the tool publicly available yet, but you can
                    request access and we'd be more than happy to accomodate!
                  </Typography>
                </Stack>
              </>
            )}
          </Box>
          <BorderLinearProgress variant="determinate" value={(step + 1) * 25} />
          <Stack spacing={4} sx={{ marginTop: 2 }}>
            {step === 0 && (
              <>
                <BootstrapButton variant="contained" onClick={handleNextStep}>
                  Restaurant
                </BootstrapButton>
                <BootstrapButton variant="contained" onClick={handleNextStep}>
                  Gym
                </BootstrapButton>
                <BootstrapButton variant="contained" onClick={handleNextStep}>
                  Hotel
                </BootstrapButton>
                <Button
                  variant="text"
                  onClick={() => (window.location.href = "/sign-in")}
                  style={{ color: "black" }}
                >
                  <b>Im already a user</b>
                  <ChevronRight />
                </Button>
              </>
            )}
            {step === 1 && (
              <>
                <BootstrapButton
                  variant="contained"
                  onClick={() => {
                    setBusinessType("small");
                    handleNextStep();
                  }}
                >
                  Small Business
                </BootstrapButton>
                <BootstrapButton
                  variant="contained"
                  onClick={() => {
                    setBusinessType("large");
                    handleNextStep();
                  }}
                >
                  Large Business
                </BootstrapButton>
                <Button
                  variant="text"
                  onClick={handlePrevStep}
                  style={{ color: "black" }}
                >
                  <ChevronLeft />
                  <b>Back</b>
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <iframe
                  src="https://calendly.com/lkkhrish/demo"
                  width="100%"
                  height="500"
                  title="Calendly Booking"
                  frameBorder="0"
                ></iframe>
              </>
            )}
          </Stack>
        </Stack>
      </Box>
      <Box
        sx={{
          width: "70%", // Adjusted to 30% to fill the remaining space
          height: "100%",
          display: { xs: "none", sm: "flex" },
          alignItems: "center",
          justifyContent: "flex-end",
          backgroundColor: "#e1e9f5", // Light baby blue
          padding: 0,
          margin: 0,
        }}
      >
        <Box
          component="img"
          src={onboardingGraphic}
          width="100%"
          height="100%"
          sx={{ objectFit: "cover", objectPosition: "top" }}
        />
      </Box>
    </Container>
  );
};

export default Onboarding;
