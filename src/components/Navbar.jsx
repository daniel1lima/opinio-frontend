import React, { useState } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import {
  AppBar,
  IconButton,
  Toolbar,
  useTheme,
  Box,
  Typography,
  InputBase,
} from "@mui/material";
import { UserButton, useAuth } from "@clerk/clerk-react";
import MailMenu from "./MailMenu";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen, company, active }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { signOut } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) =>
    isOpen ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* {Left Side} */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* {Right Side} */}
        <FlexBetween gap="1.5rem">
          {active === "inbox" ? (
            <>
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Inbox
              </Typography>
              <InputBase
                placeholder="Search"
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "4px",
                  padding: "0.5rem 1rem",
                  marginLeft: "1rem",
                }}
              />
              <IconButton>
                <MailMenu />
              </IconButton>
            </>
          ) : (
            <>
              <MailMenu />
              <FlexBetween
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
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
            </>
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
