import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Avatar, Button, Card, CardContent, Chip, Stack, Checkbox, IconButton } from '@mui/material'
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useAuth, useUser } from "@clerk/clerk-react";
import { useGetCompanyIdQuery, useGetUserQuery } from "state/api";

const Insights = () => {
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

  const insights = [
    {
      title: "Clean/service the bathrooms",
      description: "Users complained that the bathrooms had a foul smell and were not clean.",
      status: "Facility",
      timeLogged: "4h 20m",
      statusColor: "success"
    },
    {
      title: "Improve starter food quality",
      description: "Multiple users have stated that the starter bread is stale and the butter is hard.",
      status: "Food",
      timeLogged: "20h 45m",
      statusColor: "info"
    },
    {
      title: "Greeter staff training", 
      description: "5 Users have commented on rude behavior from the greeter staff.",
      status: "Service",
      timeLogged: "60h 0m",
      statusColor: "warning"
    },
  
    {
      title: "Lower music prior to 8:00PM", 
      description: "Guests that arrive early have complained that the music is too loud, making it hard to have a conversation.",
      status: "Facility",
      timeLogged: "0h 20m",
      statusColor: "success"
    },
  
    {
      title: "Include online menu on tables", 
      description: "Guests have requested that the menu be available online and on the table through QR codes.",
      status: "Facility",
      timeLogged: "5h 15m",
      statusColor: "success"
    } ];

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
      mb="1.5rem"
      p=".5rem"
    >
      <FlexBetween>
        <Box m="1rem 1rem  0rem">
          <Box ml="0.8rem" mt="1rem">
            <Header title="Actionable Insights" />
          </Box>
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

        {/* insight 1 */}

        <Box
          gridColumn="span 12"
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
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h3" fontWeight="bold">
              Clean/service the guest bathrooms
            </Typography>
            <Box ml={30}>
              <Chip label="Facility" color="success" />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h6" fontWeight="600" fontStyle='italic'>
              Estimated time to resolve: 4h 20m
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            pt="2rem"
          >
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mb=".5rem"
          >
            <Typography variant="h8">
            It is recommended to address the recent complaints about foul smells and unclean conditions in our guest bathrooms immediately. Start by deploying a dedicated cleaning team to thoroughly disinfect all surfaces, toilets, sinks, mirrors, and floors using high-quality products that eliminate bacteria and neutralize odors. Inspect and resolve any plumbing issues to ensure proper drainage and leak prevention, and check the ventilation system to ensure adequate airflow. Ensure all necessary supplies are restocked and increase the frequency of cleanings.
            <br/> <br/> For long-term prevention, establish a rigorous cleaning schedule, conduct routine maintenance checks on plumbing and ventilation systems, and implement a system to monitor and promptly respond to guest feedback. Provide comprehensive training for staff on thorough cleaning procedures and the importance of maintaining high hygiene standards. These steps will help ensure our guest bathrooms remain clean and pleasant, enhancing the overall guest experience.
            </Typography>
          </Box>
        </Box>


{/* insight 2 */}

<Box
          gridColumn="span 12"
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
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h3" fontWeight="bold"> Improve starter food quality</Typography>
            <Box ml={42}>
              <Chip label="Food" color="info" />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h6" fontWeight="600" fontStyle='italic'>
              Estimated time to resolve: 20h 45m
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            pt="2rem"
          >
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mb=".5rem"
          >
            <Typography variant="h8">
            To address feedback on our starter foods, particularly the stale bread and hard butter, we recommend sourcing fresh bread from a reputable bakery or baking in-house daily and storing butter at an optimal temperature for softness. Implement strict quality control procedures for all starters, ensuring they meet our freshness standards before serving. Additionally, establish a policy to replace any substandard food items immediately.
<br/> <br/>
For long-term improvements, regularly evaluate suppliers to maintain high-quality ingredients, periodically review the menu to introduce fresh, seasonal options, and conduct staff training on proper storage and presentation. Implement a system to monitor guest feedback and respond promptly to issues, using this feedback for continuous menu and preparation enhancements. These steps will ensure guests enjoy consistently fresh and high-quality starters and overall dining experiences.               </Typography>
          </Box>
        </Box>

 {/* insight 3 */}

<Box
          gridColumn="span 12"
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
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h3" fontWeight="bold">
            Greeter staff training
            </Typography>
            <Box ml={52}>
              <Chip label="Service" color="warning" />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h6" fontWeight="600" fontStyle='italic'>
              Estimated time to resolve: 60h 0m
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            pt="2rem"
          >
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mb=".5rem"
          >
            <Typography variant="h8">
            To address the feedback about rude behavior from our greeter staff, we recommend implementing a comprehensive training program focused on customer service skills, including proper greeting etiquette, conflict resolution, and maintaining a friendly demeanor. Consider partnering with a reputable training provider like The Emirates Academy of Hospitality Management in Dubai for professional guidance. This training should emphasize the importance of first impressions and handling difficult situations professionally.
            <br/> <br/>
            For long-term improvements, establish regular refresher courses to reinforce these skills and ensure consistent performance. Additionally, implement a feedback system to monitor guest experiences and identify areas for further improvement. These steps will help ensure our greeter staff provides a warm, welcoming, and professional first impression for all guests.
            </Typography>
          </Box>
        </Box>

 {/* insight 4 */}

 <Box
          gridColumn="span 12"
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
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h3" fontWeight="bold">
            Lower music prior to 8:00PM
            </Typography>
            <Box ml={38}>
              <Chip label="Facility" color="success" />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h6" fontWeight="600" fontStyle='italic'>
              Estimated time to resolve: 0h 20m
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            pt="2rem"
          >
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mb=".5rem"
          >
            <Typography variant="h8">
            To address complaints about loud music for guests arriving early, we recommend lowering the volume of the music prior to 8:00 PM to create a more conducive atmosphere for conversation. This adjustment will help ensure a pleasant experience for early arrivals by reducing noise levels and allowing guests to engage in conversation comfortably.
            <br/> <br/>
For long-term improvements, establish a clear policy for managing music volume based on the time of day and guest feedback. Regularly monitor the volume levels to ensure they align with the desired ambiance and make adjustments as needed. This approach will enhance the overall guest experience and maintain a welcoming environment throughout the evening.
            </Typography>
          </Box>
        </Box>

        {/* insight 5 */}

 <Box
          gridColumn="span 12"
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
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h3" fontWeight="bold">
            Include online menu on tables
            </Typography>
            <Box ml={38}>
              <Chip label="Facility" color="success" />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          >
            <Typography variant="h6" fontWeight="600" fontStyle='italic'>
              Estimated time to resolve: 5h 15m
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            pt="2rem"
          >
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mb=".5rem"
          >
            <Typography variant="h8">
            To address guest requests for online access to the menu, we recommend implementing QR codes on tables that link to the online menu. This allows guests to view the menu on their smartphones, enhancing convenience and reducing physical contact.
<br/> <br/>
For a more integrated solution, consider using services like QPay, which not only provide online menu access but also streamline ordering and payment processes through QR codes. Implementing such a system can enhance the overall guest experience by making menu browsing and transactions more efficient. Ensure that the online menu is regularly updated and accessible to maintain a smooth operation.  
              </Typography>
          </Box>
        </Box>

      </Box>
    </Box>
  );
};

export default Insights;
