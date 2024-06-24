import React, { useState } from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

import { Box, useTheme, useMediaQuery, Tab } from "@mui/material";
import { useMemo } from "react";

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



const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [value, setValue] = React.useState(0);

  // GRAB ALL RELEVANT DATABELOW
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;

  const summaryData = useGetSummaryDataByCompanyQuery(userFromDb?.company_id, {skip: !userFromDb?.company_id});

  const reviewData = useGetReviewDataByCompanyQuery(userFromDb?.company_id, {skip: !userFromDb?.company_id});
  
  // const time_review_data = useGetReviewDataByCompanyQuery(userFromDb?.company_id, {skip: !userFromDb?.company_id});

  // const totalReviews = reviewData && reviewData.data && reviewData.data.length > 0 ? reviewData.data.length : "Loading...";

  

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
  
  const totalReviews = filteredReviews && filteredReviews && filteredReviews.length > 0 ? filteredReviews.length : "Loading...";
  console.log(totalReviews)
  
  

  

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  // VALUE IS MY FILTER VALUE

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

        <Stats header="Total Reviews" stat={totalReviews}/>
        <Stats header="New Reviews"/>

        <DashLine data={reviewData} timeframe={value}/>


        {/* TODO: Need the data for this */}


        <DashBar data={summaryData}/>

        {/* ROW 2 */}

        

        {/* ROW 2 COLUMN 2 */}

        <DashInsights />

        <DashRecent />

        <DashReport />
      </Box>
    </Box>
  );
};

export default Dashboard;
