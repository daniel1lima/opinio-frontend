import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, useTheme, useMediaQuery, Tab, Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { Tabs } from "@mui/material";
import LineAnimation from "components/LineAnimated";
import LongMenu from "components/DotMenu";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useGetCompanyIdQuery, useGetUserQuery, useGetReviewDataByCompanyQuery, useGetSummaryDataByCompanyQuery } from "state/api";
import DashBar from "components/dash_components/DashBar";
import DashLine from "components/dash_components/DashLine";
import DashInsights from "components/dash_components/DashInsights";
import DashRecent from "components/dash_components/DashRecent";
import DashReport from "components/dash_components/DashReport";
import Stats from "components/dash_components/Stats";
import { subWeeks, subMonths, subYears, isAfter } from "date-fns";
import { keyframes } from "@emotion/react";
import { GridCloseIcon } from "@mui/x-data-grid";
import { siLK } from "@mui/material/locale";

// Define the keyframes for the gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }

  50% { background-position: 100% 80%; }

  100% { background-position: 0% 80%; }
`;

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [value, setValue] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  // GRAB ALL RELEVANT DATA BELOW
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;

  const summaryData = useGetSummaryDataByCompanyQuery(userFromDb?.company_id, {skip: !userFromDb?.company_id});
  const reviewData = useGetReviewDataByCompanyQuery(userFromDb?.company_id, {skip: !userFromDb?.company_id});

  console.log(reviewData)
  console.log(summaryData)

  const filterReviews = (reviews, timeframe) => {
    if (!reviews || !reviews.length) return []; // If reviews are empty, return empty array
    const now = new Date();
    switch (timeframe) {
      case 0:
        return reviews; // Return all reviews
      case 1:
        const lastWeek = subWeeks(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastWeek)
        );
      case 2:
        const lastMonth = subMonths(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastMonth)
        );
      case 3:
        const lastYear = subYears(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastYear)
        );
      default:
        return [];
    }
  };

  const filteredReviews = filterReviews(reviewData.data, value);
  const totalReviews = filteredReviews && filteredReviews.length > 0 ? filteredReviews.length : "";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Animation for the welcome message
  const welcomeAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
      mb="1.5rem"
      p=".5rem"
    >
      

      <FlexBetween>
        <Box m=".5rem 1rem 0rem">
          <Box ml="0.8rem">
            <Header title="Dashboard" />
          </Box>

          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{ borderRadius: "", bgcolor: theme.palette.grey[100] }}
            indicatorColor="secondary"
          >
            <Tab label="All Time" />
            <Tab label="Week" />
            <Tab label="Month" />
            <Tab label="Year" />
          </Tabs>
        </Box>
      </FlexBetween>

      {showWelcome && (
        <animated.div style={welcomeAnimation}>
          <Box
            p="1rem"
            mt="1rem"
            sx={{
              position: "relative", // Add relative positioning
              background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
              backgroundSize: "200% 200%",
              animation: `${gradientAnimation} 4s ease infinite`, // Apply the animation
              color: theme.palette.primary.contrastText,
              borderRadius: "16px",
              mb: "1.5rem",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                color: theme.palette.primary.contrastText,
              }}
              onClick={() => setShowWelcome(false)}
            >
              <GridCloseIcon />
            </Box>
            <Typography fontWeight="bold" variant="h4">Hey {user?.firstName}, Welcome back!</Typography>
            <Typography fontStyle="italic" mt="1rem" variant="h6">Our company reviews are soaring high! Customers are loving our new features and services. Keep up the great work team!</Typography>
          </Box>
        </animated.div>
      )}

      <Box
        m="20px"
        display="grid"
        gridTemplateColumns="repeat(32, 1fr)"
        gridAutoRows="100px"
        gap="30px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <Stats header="Total Reviews" stat={totalReviews} />
        <Stats header="New Reviews" stat={15} />
        <DashInsights />
        <DashLine data={reviewData} timeframe={value} />

        {/* ROW 2 */}
        <DashBar data={summaryData} />
        <DashRecent data={reviewData} />
      </Box>
    </Box>
  );
};

export default Dashboard;
