import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { DownloadOutlined, Timeline } from "@mui/icons-material";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Tab,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
// import BreakdownChart from "components/BreakdownChart";
// import OverviewChart from "components/OverviewChart";

import StatBox from "components/StatBox";

import { Tabs } from "@mui/material";
import BarAnimation from "components/BarAnimated";
import LineAnimation from "components/LineAnimated";
import LongMenu from "components/DotMenu";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useGetCompanyIdQuery, useGetUserQuery } from "state/api";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [value, setValue] = React.useState(0);

  // GRAB ALL RELEVANT DATABELOW
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;
  const company = useGetCompanyIdQuery(userFromDb?.company_id).data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
      mb="1.5rem"
    >
      <FlexBetween>
        <Box m="1rem 1rem 0rem">
          <Box ml="0.8rem" mt="1rem">
            <Header title="Dashboard" />
          </Box>

          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
            sx={{ borderRadius: "", bgcolor: theme.palette.grey[100] }}
            indicatorColor="secondary"
          >
            <Tab label="Week" />
            <Tab label="Month" />
            <Tab label="Year" />
          </Tabs>
        </Box>
      </FlexBetween>

      <Box
        m="20px"
        display="grid"
        gridTemplateColumns="repeat(24, 1fr)"
        gridAutoRows="100px"
        gap="30px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" }
        }}
      >
        {/* ROW 1 */}

        <Box
          gridColumn="span 7"
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
          <FlexBetween>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              ml="1.5rem"
              mt=".5rem"
              mb=".5rem"
            >
              <Typography variant="h4" fontWeight="bold">
                {" "}
               Overall Score
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              ml="1.5rem"
              mt=".5rem"
              mb=".5rem"
            >
              <LongMenu />
            </Box>
          </FlexBetween>
          <Box  sx={{ borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Gauge width={150} height={150} value={80} sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 20,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#2456EC",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      }}/>
          </Box>
        </Box>

        <Box
          gridColumn="span 6"
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
          <FlexBetween>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              ml="1.5rem"
              mt=".5rem"
              mb=".5rem"
            >
              <Typography variant="h4" fontWeight="bold">
                {" "}
               Team Members
              </Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="row"
              gap="10px"
              ml="1.5rem"
              mt=".5rem"
              mb=".5rem"
            >
              <LongMenu />
            </Box>
          </FlexBetween>
          <Box  sx={{ borderRadius: "16px", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Stack direction="column" spacing={2}>
          <Stack direction="row" spacing={2}>
              <Avatar alt="Khrish" src="" />
              <Avatar alt="Youssef" src="" />
              <Avatar alt="Khrish" src="" />
              <Avatar alt="Youssef" src="" />
            </Stack>
            <Stack direction="row" spacing={2}>
              <Avatar alt="Khrish" src="" />
              <Avatar alt="Youssef" src="" />
              <Avatar alt="Khrish" src="" />
              <Avatar alt="Youssef" src="" />
            </Stack>
          </Stack>  
            
          </Box>
        </Box>



        {/* EL 2 */}
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

        {/* ROW 2 */}
        
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
        
        {/* ROW 2 COLUMN 2 */}


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
              Qualitative Report
            </Typography>
          </Box>
          <Box ml="1rem" mt="2rem">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Dashboard;
