import React from "react";
import { SignIn } from "@clerk/clerk-react";
import { Box } from "@mui/material";
import FlexBetween from "components/FlexBetween";

const SignInPage = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex" // Added to enable flexbox
      alignItems="center" // Centers vertically
      justifyContent="center" // Centers horizontally
    >
      <FlexBetween m="34%">
        <SignIn
          transferable={false}
          forceRedirectUrl={"/dashboard"}
          signUpUrl={"/onboarding"}
          layout={{ logoPlacement: "outside" }}
        />
      </FlexBetween>
    </Box>
  );
};

export default SignInPage;
