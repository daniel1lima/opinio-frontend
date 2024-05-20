import React from 'react'
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material'
import LongMenu from 'components/DotMenu'
import FlexBetween from 'components/FlexBetween'
import BarAnimation from 'components/BarAnimated'

const DashBar = () => {
  const theme = useTheme();
  return (
    <Box
          gridColumn="span 11"
          gridRow="span 3"
          backgroundColor={theme.palette.background.default}
          p="1rem"
          borderRadius="0.55rem"
          sx={{
            "&:hover": {
              boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
              transition: "0.3s ease-out"
              // scale: "102.6%"
            }
          }}
        >
          
          <FlexBetween>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              ml="1.5rem"
              mt=".5rem"
              mb="1rem"
            >
              <Typography variant="h4" fontWeight="bold">
                {" "}
                Rating by category
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              ml="1.5rem"
              mt=".5rem"
              mb="1rem"
            >
              <LongMenu />
            </Box>
          </FlexBetween>
          <Box ml="1rem">
            <BarAnimation />
          </Box>
        </Box>
  )
}

export default DashBar
