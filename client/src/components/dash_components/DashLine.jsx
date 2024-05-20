import React from 'react'
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material'
import LongMenu from 'components/DotMenu'
import FlexBetween from 'components/FlexBetween'
import BarAnimation from 'components/BarAnimated'
import LineAnimation from 'components/LineAnimated'

const DashLine = () => {
    const theme = useTheme();
  return (
    <Box
          gridColumn="span 13"
          gridRow="span 3"
          backgroundColor={theme.palette.background.default}
          borderRadius="0.55rem"
          p="1rem"
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
            >
              <Typography variant="h4" fontWeight="bold">
                {" "}
                Frequency of Reviews
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              ml="1.5rem"
              mt=".5rem"
            >
              <LongMenu />
            </Box>
          </FlexBetween>

          <Box ml="1rem">
            <LineAnimation />
          </Box>
        </Box>
  )
}

export default DashLine
