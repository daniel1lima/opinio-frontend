import React from 'react'
import { Avatar, Box, Checkbox, FormControlLabel, FormGroup, Stack, Typography, useTheme } from '@mui/material'
import LongMenu from 'components/DotMenu'
import FlexBetween from 'components/FlexBetween'
import BarAnimation from 'components/BarAnimated'
import LineAnimation from 'components/LineAnimated'

const DashInsights = () => {
    const theme = useTheme()
  return (
    <Box
          gridColumn="span 11"
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
              Insights
            </Typography>
          </Box>
          <Box ml="1rem" mt="2rem">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Insight 1"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: "16px",
                    fontWeight: "bold"
                  }
                }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Insight 2"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: "16px",
                    fontWeight: "bold"
                  }
                }}
              />
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Insight 3"
                sx={{
                  ".MuiFormControlLabel-label": {
                    fontSize: "16px",
                    fontWeight: "bold"
                  }
                }}
              />
            </FormGroup>
          </Box>
        </Box>
  )
}

export default DashInsights
