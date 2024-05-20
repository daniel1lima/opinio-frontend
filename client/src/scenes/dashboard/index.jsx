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



import { Tabs } from "@mui/material";
import LineAnimation from "components/LineAnimated";
import LongMenu from "components/DotMenu";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useGetCompanyIdQuery, useGetUserQuery } from "state/api";
import Dashgauge from "components/dash_components/DashGauge";
import DashBar from "components/dash_components/DashBar";
import TeamView from "components/dash_components/TeamView";
import DashLine from "components/dash_components/DashLine";
import DashInsights from "components/dash_components/DashInsights";
import DashRecent from "components/dash_components/DashRecent";
import DashReport from "components/dash_components/DashReport";
import DashNivoGauge from "components/dash_components/DashNivoGauge";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const [value, setValue] = React.useState(0);

  // GRAB ALL RELEVANT DATABELOW
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;
  const company = useGetCompanyIdQuery(userFromDb?.company_id).data;

  // const { data, isLoading } = useGetDataQuery({
  //   page,
  //   pageSize,
  //   sort: JSON.stringify(sort),
  //   search,
  // });



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
      mb="1.5rem"
      p=".5rem"
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

        <DashNivoGauge />

        <TeamView />

        <DashBar />

        {/* ROW 2 */}
        
        <DashLine />
        
        {/* ROW 2 COLUMN 2 */}

        <DashInsights />
        
      
        <DashRecent />

        <DashReport />

      </Box>
    </Box>
  );
};

export default Dashboard;
