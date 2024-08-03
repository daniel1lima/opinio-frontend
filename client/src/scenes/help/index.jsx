import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import { Avatar, Button, Card, CardContent, Chip, Stack, Checkbox, IconButton, TextField } from '@mui/material'
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

  // GRAB ALL RELEVANT DATA BELOW
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;
  const company = useGetCompanyIdQuery(userFromDb?.company_id).data;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
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
        <Box m="1rem 1rem  0rem" display="flex" justifyContent="center" width="100%">
          <Box ml="0.8rem" mt="1rem">
            <Header title="Contact the team" />
          </Box>
        </Box>
      </FlexBetween>
      <Box gridColumn="span 24">
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Card sx={{ padding: '8px', borderRadius: '8px' }}>
              <CardContent>
                <TextField
                  required
                  label="Name"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '8px',
                      padding: '10px',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: theme.palette.text.secondary,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ padding: '8px', borderRadius: '8px' }}>
              <CardContent>
                <TextField
                  required
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '8px',
                      padding: '10px',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: theme.palette.text.secondary,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Card sx={{ padding: '8px', borderRadius: '8px' }}>
              <CardContent>
                <TextField
                  required
                  label="Message"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  InputProps={{
                    sx: {
                      borderRadius: '8px',
                      padding: '10px',
                    },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: theme.palette.text.secondary,
                    },
                  }}
                />
              </CardContent>
            </Card>
            <Box sx={{ padding: '8px', borderRadius: '8px' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  borderRadius: '8px',
                  padding: '10px 20px',
                  textTransform: 'none',
                  backgroundColor: '#115293',
                  color: theme.palette.common.white,
                  '&:hover': {
                    backgroundColor: '#808080',
                  },
                }}
              >
                Send
              </Button>
            </Box>
          </Stack>
        </form>
      </Box>

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
        
      </Box>
    </Box>
  );
};

export default Insights;