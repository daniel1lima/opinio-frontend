import React from "react";
import { Button } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import axios from "axios";

const AIResponseButton = ({ userId, reviewId, onResponseGenerated }) => {
  const handleGenerateResponse = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVICES_BASE_URL}/generate_ai_response`,
        {
          user_id: userId,
          review_id: reviewId,
        },
      );
      const generatedResponse = response.data.data.ai_response;
      onResponseGenerated(generatedResponse);
    } catch (error) {
      console.error("Error generating response:", error);
      onResponseGenerated(null);
    }
  };

  return (
    <Button
      onClick={handleGenerateResponse}
      color="secondary"
      sx={{
        padding: "10px 20px",
        borderRadius: "8px",
        backgroundColor: "white",
        color: "#6200EE",
        border: "1px solid #6200EE",
        "&:hover": {
          backgroundColor: "#EDE7F6",
        },
      }}
    >
      <AutoAwesomeIcon />
    </Button>
  );
};

export default AIResponseButton;
