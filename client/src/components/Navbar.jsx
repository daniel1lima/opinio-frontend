import React, { useState } from "react";
import {
  Menu as MenuIcon,
  Search,
  SettingsOutlined
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  MenuItem,
  Button,
  Box,
  Typography,
  Menu,
  Badge
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { UserButton, useAuth } from "@clerk/clerk-react";
import MailMenu from "./MailMenu";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen, company }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { signOut } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = event =>
    isOpen ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none"
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* {Left Side} */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween borderRadius="9px" gap="3rem" p="0.1rem 1.5rem">
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* {Right Side} */}
        <FlexBetween gap="1.5rem">
          <MailMenu />

          <FlexBetween
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              textTransform: "none",
              gap: "1rem"
            }}
          >
            {/* <Button
              
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "0rem",
              }}
            >
              
            </Button> */}
            <UserButton />
            <Box textAlign="left">
              <Typography
                fontWeight="bold"
                fontSize="0.85rem"
                sx={{ color: theme.palette.secondary[100] }}
              >
                {company.company_name}
              </Typography>
              <Typography
                fontSize="0.75rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.occupation}
              </Typography>
            </Box>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
