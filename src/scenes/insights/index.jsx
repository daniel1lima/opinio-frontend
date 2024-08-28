import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";

// import BreakdownChart from "components/BreakdownChart";
// import OverviewChart from "components/OverviewChart";

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
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
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
              transition: "0.3s ease-out",
              // scale: "102.6%"
            },
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
              {" "}
              Insight 1
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
            <Typography variant="h6"> Some context here</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
            pt="2rem"
          >
            <Typography variant="h6">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          ></Box>
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
              transition: "0.3s ease-out",
              // scale: "102.6%"
            },
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
              {" "}
              Insight 2
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
            <Typography variant="h6"> Some context here</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
            pt="2rem"
          >
            <Typography variant="h6">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          ></Box>
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
              transition: "0.3s ease-out",
              // scale: "102.6%"
            },
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
              {" "}
              Insight 3
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
            <Typography variant="h6"> Some context here</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
            pt="2rem"
          >
            <Typography variant="h6">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          ></Box>
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
              transition: "0.3s ease-out",
              // scale: "102.6%"
            },
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
              {" "}
              Insight 4
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
            <Typography variant="h6"> Some context here</Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
            pt="2rem"
          >
            <Typography variant="h6">
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            gap="10px"
            ml="1.5rem"
            mt=".5rem"
            mb=".5rem"
          ></Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Insights;
