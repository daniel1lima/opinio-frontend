import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, useTheme, useMediaQuery, Tab, Typography } from "@mui/material";
import { useSpring, animated } from "@react-spring/web";
import { Tabs } from "@mui/material";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  useGetUserQuery,
  useGetReviewDataByCompanyQuery,
  useGetCompanyConnectionsQuery,
} from "state/api";
import DashLine from "components/dash_components/DashLine";
import DashInsights from "components/dash_components/DashInsights";
import DashRecent from "components/dash_components/DashRecent";
import Stats from "components/dash_components/Stats";
import ActiveIntegrations from "components/dash_components/ActiveIntegrations";
import { subWeeks, subMonths, subYears, isAfter } from "date-fns";
import { keyframes } from "@emotion/react";
import { GridCloseIcon } from "@mui/x-data-grid";

// Define the keyframes for the gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 80%; }
  100% { background-position: 0% 80%; }
`;

const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [value, setValue] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [layouts, setLayouts] = useState({
    lg: [
      { i: "stats1", x: 0, y: 0, w: 8, h: 2 },
      { i: "stats2", x: 8, y: 0, w: 8, h: 2 },
      { i: "activeIntegrations", x: 30, y: 8, w: 16, h: 3 },
      { i: "dashLine", x: 0, y: 2, w: 16, h: 6 },
      { i: "dashRecent", x: 0, y: 8, w: 16, h: 6 },
      { i: "dashInsights", x: 32, y: 0, w: 16, h: 8 },
    ],
  });

  const onLayoutChange = (newLayout, layouts) => {
    // Convert the current layout to a map for easy lookup
    const currentLayoutMap = layouts.lg.reduce((acc, item) => {
      acc[item.i] = item;
      return acc;
    }, {});

    // Check if any items have switched positions
    const switchedItems = newLayout.filter(
      (item) =>
        currentLayoutMap[item.i] &&
        (item.x !== currentLayoutMap[item.i].x ||
          item.y !== currentLayoutMap[item.i].y),
    );

    if (switchedItems.length === 2) {
      // Two items have switched positions
      const [item1, item2] = switchedItems;

      // Create a new layout with the switched positions
      const updatedLayout = layouts.lg.map((item) => {
        if (item.i === item1.i) {
          return { ...item, x: item2.x, y: item2.y };
        } else if (item.i === item2.i) {
          return { ...item, x: item1.x, y: item1.y };
        }
        return item;
      });

      // Update the layouts state
      setLayouts({ ...layouts, lg: updatedLayout });
    } else {
      // If no switch occurred, update layouts as normal
      setLayouts(layouts);
    }
  };

  // GRAB ALL RELEVANT DATA BELOW
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;

  // const summaryData = useGetSummaryDataByCompanyQuery(userFromDb?.company_id, {skip: !userFromDb?.company_id});
  const {
    data: reviewData,
    isLoading,
    error,
  } = useGetReviewDataByCompanyQuery(
    {
      company_id: localStorage.getItem("company_id"),
      page: 1,
      page_size: 1,
    },
    { skip: !localStorage.getItem("company_id") },
  );

  // Ensure reviewData is defined before accessing its properties

  const totalReviews = reviewData ? reviewData.totalReviews : 0; // Extract total reviews count

  const { data: connectionsData, isLoading: isConnectionsLoading } =
    useGetCompanyConnectionsQuery(localStorage.getItem("company_id"), {
      skip: !localStorage.getItem("company_id"),
    });
  // console.log(connectionsData)

  // console.log(reviewData)

  const filterReviews = (reviews, timeframe) => {
    if (!reviews || !reviews.length) return []; // If reviews are empty, return empty array
    const now = new Date();
    switch (timeframe) {
      case 0:
        return reviews; // Return all reviews
      case 1:
        const lastWeek = subWeeks(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastWeek),
        );
      case 2:
        const lastMonth = subMonths(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastMonth),
        );
      case 3:
        const lastYear = subYears(now, 1);
        return reviews.filter((review) =>
          isAfter(new Date(review.date), lastYear),
        );
      default:
        return [];
    }
  };

  const filteredReviews = reviewData
    ? filterReviews(reviewData.data, value)
    : [];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Animation for the welcome message
  const welcomeAnimation = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: { tension: 200, friction: 20 },
  });

  // Get today's day of the week
  const today = new Date().toLocaleString("en-US", { weekday: "long" });

  // Extract today's reviews count
  const newReviewsToday = reviewData?.week?.[today] || 0;

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
            <Typography fontWeight="bold" variant="h4">
              Hey {user?.firstName}, Welcome back!
            </Typography>
            <Typography fontStyle="italic" mt="1rem" variant="h6">
              Our company reviews are soaring high! Customers are loving our new
              features and services. Keep up the great work team!
            </Typography>
          </Box>
        </animated.div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 32, md: 24, sm: 16, xs: 8, xxs: 4 }}
        rowHeight={60}
        onLayoutChange={onLayoutChange}
        isDraggable
        isResizable={false}
        allowOverlap={true}
        preventCollision={true}
        compactType={null}
        maxRows={14} // Add this line to limit the maximum number of rows
      >
        <div key="stats1">
          <Stats header="Total Reviews" stat={totalReviews} />
        </div>
        <div key="stats2">
          <Stats header="New Reviews" stat={newReviewsToday} />
        </div>
        <div key="activeIntegrations">
          <ActiveIntegrations
            data={connectionsData}
            isLoading={isConnectionsLoading}
          />
        </div>
        <div key="dashLine">
          <DashLine timeframe={value} />
        </div>
        <div key="dashRecent">
          <DashRecent data={reviewData} />
        </div>
        <div key="dashInsights">
          <DashInsights />
        </div>
      </ResponsiveGridLayout>
    </Box>
  );
};

export default Dashboard;
