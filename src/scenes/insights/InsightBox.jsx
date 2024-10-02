import React, { useState } from "react";
import { Box, Typography, Tooltip } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    perspective: "1000px",
    height: "300px",
    width: "600px",
    "&:hover": {
      transform: "scale(1.02)",
      "& $side": {
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
      },
      cursor: "pointer",
    },
  },
  cardFlipper: {
    position: "relative",
    width: "100%",
    height: "100%",
    transformStyle: "preserve-3d",
    transition: "transform 0.6s",
  },
  flipped: {
    transform: "rotateY(180deg)",
  },
  side: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: "16px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s, transform 0.3s",
  },
  frontSide: {
    backgroundColor: "white",
    zIndex: 2,
  },
  backSide: {
    backgroundColor: "white",
    color: "black",
    transform: "rotateY(180deg)",
  },
  urgencyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    marginLeft: 4,
    transition: "background-color 0.3s ease-in-out",
  },
}));

const UrgencyDots = ({ urgency }) => {
  const classes = useStyles();

  const getUrgencyColor = (dotIndex) => {
    if (dotIndex < urgency) {
      if (urgency <= 2) return "#4CAF50";
      if (urgency <= 4) return "#FFA000";
      return "#F44336";
    }
    return "#D3D3D3";
  };

  return (
    <Tooltip title={`Urgency: ${urgency}/6`} arrow placement="top">
      <Box display="flex">
        {[...Array(6)].map((_, index) => (
          <Box
            key={index}
            className={classes.urgencyDot}
            style={{ backgroundColor: getUrgencyColor(index) }}
          />
        ))}
      </Box>
    </Tooltip>
  );
};

const InsightBox = ({ title, problem, solution, urgency }) => {
  const classes = useStyles();
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Box className={classes.cardContainer} onClick={handleFlip}>
      <Box
        className={`${classes.cardFlipper} ${isFlipped ? classes.flipped : ""}`}
      >
        <Box className={`${classes.side} ${classes.frontSide}`}>
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6" fontWeight="bold">
                {title}
              </Typography>
              <UrgencyDots urgency={urgency} />
            </Box>

            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              The Problem
            </Typography>
            <Typography variant="body2" mb={2}>
              {problem}
            </Typography>
          </Box>
        </Box>
        <Box className={`${classes.side} ${classes.backSide}`}>
          <Box p={2}>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Solution
            </Typography>
            <Typography variant="body2">{solution}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InsightBox;
