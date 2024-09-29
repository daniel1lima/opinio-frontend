import React from "react";
import { Box, useTheme, useMediaQuery, Divider } from "@mui/material";
import Header from "components/Header";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useGetCompanyIdQuery, useGetUserQuery } from "state/api";
import {
  CoronavirusOutlined,
  SupportAgentOutlined,
  GroupOutlined,
  RestaurantOutlined,
  FactCheckOutlined,
  BusinessCenterOutlined,
} from "@mui/icons-material";

import CustomerInsights from "./CustomerInsights";
import MetricsSection from "./MetricsSection";
import InsightBox from "./InsightBox";

const Insights = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;
  const company = useGetCompanyIdQuery(userFromDb?.company_id).data;

  const positiveInsights = [
    {
      icon: CoronavirusOutlined,
      text: "Covid Protocols",
      value: 95,
      color: theme.palette.success.main,
    },
    {
      icon: SupportAgentOutlined,
      text: "Fast Customer Support",
      value: 82,
      color: theme.palette.primary.dark,
    },
    {
      icon: GroupOutlined,
      text: "Social Environment",
      value: 89,
      color: theme.palette.info.main,
    },
  ];

  const negativeInsights = [
    {
      icon: RestaurantOutlined,
      text: "Food Safety",
      value: 74,
      color: theme.palette.warning.main,
    },
    {
      icon: FactCheckOutlined,
      text: "Compliance Basics Procedures",
      value: 52,
      color: theme.palette.error.main,
    },
    {
      icon: BusinessCenterOutlined,
      text: "Company Networking",
      value: 38,
      color: theme.palette.secondary.main,
    },
  ];

  const insightBoxes = [
    {
      title: "To-Do 1",
      problem: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      dotColors: ["#FFD700", "#D3D3D3", "#D3D3D3"],
    },
    {
      title: "To-Do 2",
      problem:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
      dotColors: ["#4CAF50", "#4CAF50", "#4CAF50"],
    },
    {
      title: "To-Do 3",
      problem:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris...",
      dotColors: ["#4CAF50", "#4CAF50", "#D3D3D3"],
    },
    {
      title: "To-Do 4",
      problem:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum...",
      dotColors: ["#4CAF50", "#4CAF50", "#D3D3D3"],
    },
  ];

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
      mb="1.5rem"
      p="2rem"
    >
      <Box ml="0.8rem">
        <Header title="Insights" />
      </Box>

      <Divider sx={{ mb: "2rem" }} />

      <Box display="grid" gridTemplateColumns="repeat(2, 3fr)" gap="20px">
        <CustomerInsights
          title="Customers Are Loving..."
          insights={positiveInsights}
        />
        <CustomerInsights
          title="Driving Reviews Down..."
          insights={negativeInsights}
        />
      </Box>

      <MetricsSection />

      <Box
        display="grid"
        gridTemplateColumns="repeat(2, 1fr)"
        gap="20px"
        mt="20px"
      >
        {insightBoxes.map((insight, index) => (
          <InsightBox key={index} {...insight} />
        ))}
      </Box>
    </Box>
  );
};

export default Insights;
