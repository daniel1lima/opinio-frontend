import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import ForwardIcon from "@mui/icons-material/Forward";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

const ReviewHeader = ({ senderName, senderPlatform, date, senderIcon }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      p={2}
      borderBottom="1px solid #ddd"
    >
      <Box display="flex" alignItems="center">
        <Box
          component="img"
          src={senderIcon}
          alt="Sender Avatar"
          borderRadius="50%"
          width={40}
          height={40}
          mr={2}
        />
        <Box>
          <Typography variant="subtitle1">{senderName}</Typography>
          <Typography variant="body2" color="textSecondary">
            {senderPlatform}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body2" color="textSecondary" mr={2}>
          {date}
        </Typography>
        <IconButton size="small">
          <ReplyIcon />
        </IconButton>
        <IconButton size="small">
          <ForwardIcon />
        </IconButton>
        <IconButton size="small">
          <StarOutlineIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ReviewHeader;
