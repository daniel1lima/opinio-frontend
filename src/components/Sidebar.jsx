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
import SnoozeIcon from "@mui/icons-material/Snooze";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/Delete";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
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

const inboxItems = [
  {
    text: "Inbox",
    icon: <InboxIcon />,
  },
  {
    text: "Starred",
    icon: <StarIcon />,
  },
  {
    text: "Snoozed",
    icon: <SnoozeIcon />,
  },
  {
    text: "Sent",
    icon: <SendIcon />,
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

const Sidebar = ({
  clerkUser,
  companyDB,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const [showInboxItems, setShowInboxItems] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const theme = useTheme();

  const firstName = clerkUser.firstName;
  const email = clerkUser.email;
  const companyName = companyDB?.company_name;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  const handleInboxClick = () => {
    setIsAnimating(true);
    startTransition(() => {
      setTimeout(() => {
        setShowInboxItems(true);
        setIsAnimating(false);
      }, 300); // Duration of the animation
    });
  };

  const handleBackClick = () => {
    setIsAnimating(true);
    startTransition(() => {
      setTimeout(() => {
        setShowInboxItems(false);
        setIsAnimating(false);
        navigate("/dashboard"); // Navigate to dashboard
      }, 300); // Duration of the animation
    });
  };

  const handleNavItemClick = (lcText) => {
    if (lcText === "inbox") {
      handleInboxClick();
    } else {
      setShowInboxItems(false);
    }
    navigate(`/${lcText}`);
    setActive(lcText);
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
                ({ text, icon }) => {
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
                              ? theme.palette.primary[100]
                              : theme.palette.secondary[200],
                          transition:
                            "background-color 0.3s ease, transform 0.2s ease",
                          "&:hover": {
                            transform:
                              active === lcText ? "scale(1.05)" : "scale(1.02)",
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lcText
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                },
              )}
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
