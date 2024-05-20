import React from 'react'

import { Box, Typography, useTheme } from '@mui/material'


const DashRecent = () => {
    const theme = useTheme()
  return (
    <Box
          gridColumn="span 12"
          gridRow="span 2"
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
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt="1.5rem"
          >
            <Typography variant="h4" fontWeight="bold">
              {" "}
              Recent Reviews
            </Typography>
          </Box>
          <Box ml="1rem" mt="2rem">
           5 recent reviews here
          </Box>
        </Box>
  )
}

export default DashRecent
