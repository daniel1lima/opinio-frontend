import React, { useRef, useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Delete as DeleteIcon,
  Archive as ArchiveIcon,
  Markunread as MarkunreadIcon,
  Report as ReportIcon,
  Label as LabelIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: "16px",
    backgroundColor: "#f1f3f4",
    height: "36px",
    "&:hover": {
      backgroundColor: "#e1e3e4",
    },
    marginLeft: 0,
    width: "100%",
    "@media (min-width: 600px)": {
      marginLeft: "8px",
      width: "auto",
    },
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  },
  searchFocused: {
    width: "40ch",
    transition: "width 0.3s ease-in-out",
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: "8px 8px 8px 0",
    paddingLeft: "calc(1em + 32px)",
    width: "100%",
    "@media (min-width: 960px)": {
      width: "20ch",
    },
  },
  searchIcon: {
    marginRight: "8px",
  },
  shortcutHint: {
    marginLeft: "auto",
    color: "#a0a0a0",
    fontSize: "0.875rem",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
    opacity: 0, // Ensure the default state is not visible
    transition: "opacity 0.3s ease", // Add transition for smooth visibility change
    pointerEvents: "none", // Allow clicks to pass through
  },
  overlayVisible: {
    opacity: 1,
  },
  appBar: {
    position: "fixed", // Ensure it stays at the top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 2,
    boxShadow: "none", // Remove the box shadow
    borderBottom: "1px solid #ddd", // Ensure no border is present
  },
  toolbarOffset: {
    height: 64, // Set the height to match the AppBar height for desktop
    "@media (max-width: 600px)": {
      height: 56, // Set the height to match the AppBar height for mobile
    },
  },
}));

const InboxNavbar = ({ unreadCount, starredCount, totalCount }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const searchInputRef = useRef(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFocus = () => {
    setIsSearchFocused(true);
  };

  const handleBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <>
      <div
        className={`${classes.overlay} ${isSearchFocused ? classes.overlayVisible : ""}`}
      />
      <AppBar
        position="fixed" // Ensure it stays at the top
        color="default"
        sx={{
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          left: 220,
          width: "83%",
        }}
      >
        <Toolbar>
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h4" noWrap fontWeight="bold">
              Inbox
            </Typography>
            <Typography variant="caption" noWrap color="textSecondary">
              {unreadCount} Unread
            </Typography>
          </Box>
          <Box
            className={`${classes.search} ${isSearchFocused ? classes.searchFocused : ""}`}
          >
            <SearchIcon className={classes.searchIcon} />
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              inputRef={searchInputRef}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <Typography className={classes.shortcutHint}>⌘K</Typography>
          </Box>
          <Box flexGrow={1} />
          <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
            <IconButton color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <IconButton color="inherit">
              <DeleteIcon />
            </IconButton>
            <IconButton color="inherit">
              <ArchiveIcon />
            </IconButton>
            <IconButton color="inherit">
              <MarkunreadIcon />
            </IconButton>
            <IconButton color="inherit">
              <ReportIcon />
            </IconButton>
            <IconButton color="inherit">
              <LabelIcon />
            </IconButton>
            <IconButton color="inherit">
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default InboxNavbar;
