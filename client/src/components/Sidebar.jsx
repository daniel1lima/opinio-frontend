import React from "react";
import {
  Box,
  Divider,
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
import LinkIcon from '@mui/icons-material/Link';
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PointOfSaleOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";

import ReviewsIcon from "@mui/icons-material/Reviews";

import InsightsIcon from "@mui/icons-material/Insights";

import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import logo from "assets/logo.png";
import { UserButton } from "@clerk/clerk-react";

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
    icon: <PointOfSaleOutlined />,
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
  const navigate = useNavigate();
  const theme = useTheme();

  const firstName = clerkUser.firstName;
  const email = clerkUser.email;

  const companyName = companyDB?.company_name;

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
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
            <List>
              {navItems.map(({ text, icon }) => {
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
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.primary.main // Solid color for active item
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[100] // Text color for active item
                            : theme.palette.secondary[200],
                        transition: "background-color 0.3s ease, transform 0.2s ease", // Animation transition
                        "&:hover": {
                          transform: active === lcText ? "scale(1.05)" : "scale(1.02)", // Scale effect on hover
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
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
              })}
            </List>
          </Box>

          
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;