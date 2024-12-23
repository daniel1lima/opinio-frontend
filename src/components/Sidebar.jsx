import React, { useEffect, useState, useTransition } from "react";
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  ArrowBack,
} from "@mui/icons-material";
import InboxIcon from "@mui/icons-material/Inbox";
import LinkIcon from "@mui/icons-material/Link";
import ReviewsIcon from "@mui/icons-material/Reviews";
import InsightsIcon from "@mui/icons-material/Insights";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import logo from "assets/logo.png";
import StarIcon from "@mui/icons-material/Star";

import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetInboxBreakdownQuery } from "state/api";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Insights",
    icon: <InsightsIcon />,
  },
  {
    text: "Reviews",
    icon: <ReviewsIcon />,
  },
  {
    text: "Inbox",
    icon: <InboxIcon />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Integrations",
    icon: <LinkIcon />,
  },
];

const labels = [
  {
    text: "Critical",
    color: "pink",
    count: 152,
    fontWeight: "bold",
  },
  {
    text: "Food",
    color: "blue",
    count: 37,
  },
  {
    text: "Staff",
    color: "green",
    count: 26,
  },
];

const Sidebar = ({
  clerkUser,
  companyDB,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  active,
  setActive,
}) => {
  const { pathname } = useLocation();
  const [showInboxItems, setShowInboxItems] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const theme = useTheme();

  const firstName = clerkUser.firstName;
  const email = clerkUser.email;
  const companyName = companyDB?.company_name;

  const userId = localStorage.getItem("user_id");
  const { data: breakdownData, refetch: refetchInboxBreakdown } =
    useGetInboxBreakdownQuery({ user_id: userId });

  const [inboxBreakdown, setInboxBreakdown] = useState({
    totalReviews: 0,
    unreadReviews: 0,
    starredReviews: 0,
  });

  useEffect(() => {
    if (pathname === "/inbox") {
      setShowInboxItems(true);
      setActive("inbox");
      refetchInboxBreakdown(); // Refetch inbox data when navigating to /inbox
    } else {
      setShowInboxItems(false);
      setActive(pathname.substring(1));
    }
  }, [pathname, refetchInboxBreakdown]);

  useEffect(() => {
    if (breakdownData?.data) {
      setInboxBreakdown({
        totalReviews: breakdownData.data.total_reviews,
        unreadReviews: breakdownData.data.unread_reviews,
        starredReviews: breakdownData.data.starred_reviews,
      });
    }
  }, [breakdownData]);

  const inboxItems = [
    {
      text: "Inbox",
      icon: <InboxIcon />,
      count: inboxBreakdown.unreadReviews,
    },
    {
      text: "Starred",
      icon: <StarIcon />,
      count: inboxBreakdown.starredReviews,
    },
    {
      text: "Drafts",
      icon: <DraftsIcon />,
    },
    {
      text: "Trash",
      icon: <DeleteIcon />,
    },
  ];

  const handleInboxClick = () => {
    setIsAnimating(true);
    startTransition(() => {
      setTimeout(() => {
        setShowInboxItems(true);
        setIsAnimating(false);
        setActive("inbox");
        refetchInboxBreakdown(); // Refetch inbox data when clicking on Inbox
        navigate("/inbox"); // Navigate to inbox
      }, 300);
    });
  };

  const handleBackClick = () => {
    setIsAnimating(true);
    startTransition(() => {
      setTimeout(() => {
        setShowInboxItems(false);
        setIsAnimating(false);
        navigate("/dashboard"); // Navigate to dashboard
      }, 300);
    });
  };

  const handleNavItemClick = (lcText) => {
    if (lcText === "inbox") {
      handleInboxClick();
    } else {
      setShowInboxItems(false);
      navigate(`/${lcText}`);
      setActive(lcText);
    }
  };

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
              transition: "width 0.3s ease-in-out",
            },
          }}
        >
          <Box width="100%">
            <Box m="1rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Box
                    mt="1rem"
                    width="100%"
                    height="3rem"
                    component="img"
                    src={logo}
                    onClick={() => navigate("/dashboard")}
                    sx={{ cursor: "pointer" }}
                  />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            {showInboxItems && (
              <IconButton onClick={handleBackClick} sx={{ ml: "1rem" }}>
                <ArrowBack sx={{ color: "black" }} />
              </IconButton>
            )}
            <List
              sx={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? "translateX(-20px)" : "translateX(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {(showInboxItems ? inboxItems : navItems).map(
                ({ text, icon, count }) => {
                  if (!icon) {
                    return (
                      <Typography
                        key={text}
                        sx={{ m: "2.25rem 0 1rem 3rem", fontWeight: "bold" }}
                      >
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();

                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => handleNavItemClick(lcText)}
                        sx={{
                          backgroundColor:
                            active === lcText
                              ? theme.palette.primary.main
                              : "transparent",
                          color:
                            active === lcText
                              ? "darkblue"
                              : theme.palette.secondary[200],
                          transition:
                            "background-color 0.3s ease, transform 0.2s ease",
                          "&:hover": {
                            transform:
                              active === lcText ? "scale(1.05)" : "scale(1.02)",
                          },
                          borderLeft:
                            active === lcText
                              ? "2px solid transparent"
                              : "none",
                          borderImage:
                            active === lcText
                              ? "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%) 1"
                              : "none",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? "#0072ff"
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontWeight: "bold",
                                color:
                                  active === lcText ? "transparent" : "inherit",
                                backgroundImage:
                                  active === lcText
                                    ? "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)"
                                    : "none",
                                backgroundClip:
                                  active === lcText ? "text" : "border-box",
                                WebkitBackgroundClip:
                                  active === lcText ? "text" : "border-box",
                                WebkitTextFillColor:
                                  active === lcText ? "transparent" : "inherit",
                                fontSize:
                                  active === lcText && lcText === "integrations"
                                    ? "0.8rem"
                                    : "inherit",
                              }}
                            >
                              {text}
                            </Typography>
                          }
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            ml: "auto",
                            color: "textSecondary",
                            opacity: 0.6,
                          }}
                        >
                          {count}
                        </Typography>
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                },
              )}
              {showInboxItems && (
                <>
                  <Typography
                    sx={{ m: "2.25rem 0 1rem 3rem", fontWeight: "bold" }}
                  >
                    Labels
                  </Typography>
                  {labels.map(({ text, color, count }) => (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        sx={{
                          color: "textSecondary",
                          transition: "transform 0.2s ease",
                          "&:hover": {
                            transform: "scale(1.02)",
                          },
                        }}
                      >
                        <Box
                          sx={{
                            width: "10px",
                            height: "10px",
                            backgroundColor: color,
                            borderRadius: "50%",
                            mr: "1rem",
                          }}
                        />
                        <ListItemText
                          primary={
                            <Typography sx={{ fontWeight: "bold" }}>
                              {text}
                            </Typography>
                          }
                        />
                        <Typography
                          variant="body2"
                          fontWeight="bold"
                          sx={{
                            ml: "auto",
                            color: "textSecondary",
                            opacity: 0.6,
                          }}
                        >
                          {count}
                        </Typography>
                      </ListItemButton>
                    </ListItem>
                  ))}
                </>
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
