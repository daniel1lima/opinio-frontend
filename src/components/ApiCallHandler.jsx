import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { CircularProgress, Box, Typography } from "@mui/material";

const ApiCallHandler = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const company_id = localStorage.getItem("company_id");

  useEffect(() => {
    const makeApiCall = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVICES_BASE_URL}/reviews`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              company_id: localStorage.getItem("company_id"),
              user_id: localStorage.getItem("user_id"),
            }),
          },
        );

        if (!response.ok) {
          throw new Error("API call failed");
        }

        const data = await response.json();
        console.log("API Response:", data);
      } catch (error) {
        console.error("Error making API call:", error);
        // Handle the error (e.g., show an error message to the user)
      } finally {
        // Navigate to the dashboard after the API call, regardless of success or failure
        navigate("/dashboard");
      }
    };

    if (company_id && user) {
      makeApiCall();
    }
  }, [navigate, user, company_id]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress color="primary" size={60} thickness={4} />
      <Typography variant="h6" style={{ marginTop: "20px" }}>
        Processing your reviews...
      </Typography>
    </Box>
  );
};

export default ApiCallHandler;
