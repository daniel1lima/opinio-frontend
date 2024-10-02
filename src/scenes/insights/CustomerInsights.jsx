import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  LinearProgress,
  Tooltip,
  IconButton,
  Fade,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const CustomerInsights = ({ title, insights }) => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 20;
        return Math.min(oldProgress + diff, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      bgcolor={theme.palette.background.paper}
      borderRadius="1rem"
      p="1.5rem"
    >
      <Typography
        variant="h6"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: "15px" }}
      >
        {title}
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {insights.map((item, i) => (
          <Box key={`${item.text}-${i}`}>
            <FlexBetween>
              <Box display="flex" alignItems="center" gap="1rem">
                <item.icon
                  sx={{
                    color: item.color,
                    fontSize: "26px",
                  }}
                />
                <Box display="flex" alignItems="center">
                  <Fade in={fadeIn} timeout={1000}>
                    <Typography
                      variant="h5"
                      fontWeight="bold"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {item.text}
                    </Typography>
                  </Fade>
                  <Tooltip
                    title={item.description}
                    arrow
                    placement="top"
                    sx={{ fontSize: "2rem" }}
                  >
                    <IconButton size="small" color="primary">
                      <InfoOutlinedIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </FlexBetween>
            <FlexBetween sx={{ mt: "0.5rem" }}>
              <LinearProgress
                variant="determinate"
                value={progress * (item.value / 100)}
                sx={{
                  height: 4,
                  borderRadius: 5,
                  width: "100%",
                  backgroundColor: theme.palette.primary.main,
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 5,
                    backgroundColor: item.color,
                  },
                }}
              />
              <Typography
                variant="body2"
                fontWeight="bold"
                sx={{ color: theme.palette.secondary[100], ml: "1rem" }}
              >
                {item.value}%
              </Typography>
            </FlexBetween>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomerInsights;
