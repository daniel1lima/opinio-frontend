import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import SettingsIcon from "@mui/icons-material/Settings";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { styled } from "@mui/system";

const options = [
  {
    icon: <SettingsIcon />,
    title: "Settings",
    description: "Update Dashboard",
  },
  {
    icon: <EventIcon />,
    title: "Event Update",
    description: "An event date update again",
  },
  {
    icon: <AccountCircleIcon />,
    title: "Profile",
    description: "Update your profile",
  },
  {
    icon: <ErrorIcon />,
    title: "Application Error",
    description: "Check Your running application",
  },
];

const ITEM_HEIGHT = 48;

const PulsingDot = styled("div")({
  width: "10px",
  height: "10px",
  backgroundColor: "blue",
  borderRadius: "50%",
  animation: "pulse 3s infinite",
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 0,
    },
    "50%": {
      transform: "scale(1.2)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1)",
      opacity: 0,
    },
  },
});

export default function MailMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MailIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          height: "100%",
          maxHeight: ITEM_HEIGHT * 9.5,
          width: "300px",
          borderRadius: "10px",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        className="custom-menu"
      >
        {options.map((option) => (
          <MenuItem key={option.title} onClick={handleClose}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <ListItemText
              primary={option.title}
              secondary={option.description}
            />
            <PulsingDot />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
