import React, { useState } from "react";
import { Box, Typography, useTheme, Modal, TextField, Button, Slider, Switch, Stack, Alert } from "@mui/material";
import { styled } from '@mui/material/styles';
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import YelpIcon from "assets/yelp-svgrepo-com.svg"; // Import the Yelp SVG
import GoogleIcon from "assets/google-icon.svg"; // Import the Google SVG
import TripAdvisorIcon from "assets/tripadvisor.svg"; // Import the TripAdvisor SVG
import SettingsIcon from '@mui/icons-material/Settings'; // Import the settings icon
import LinkIcon from '@mui/icons-material/Link';

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#007BFF', // Change to blue
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: .8,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const Integrations = () => {
  const theme = useTheme();
  
  const [integrations, setIntegrations] = useState([
    { name: "Yelp", description: "Customer reviews and ratings.", icon: YelpIcon, status: true, fields: [{ label: "Business ID", value: "" }] },
    { name: "Google Reviews", description: "Manage your Google reviews.", icon: GoogleIcon, status: true, fields: [{ label: "Business ID", value: "" }, { label: "API Key", value: "" }] },
    { name: "Tripadvisor", description: "Travel and restaurant reviews.", icon: TripAdvisorIcon, status: false, fields: [{ label: "API Key", value: "" }] },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [formData, setFormData] = useState({});
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility

  const handleToggle = (index) => {
    if (!integrations[index].status) {
      setSelectedIntegration(index);
      setOpenModal(true);
    } else {
      const newIntegrations = [...integrations];
      newIntegrations[index].status = false;
      setIntegrations(newIntegrations);
    }
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedIntegration(null);
    setFormData({});
  };

  const handleConfirm = async () => {
    // Validation check for required fields
    const isValid = integrations[selectedIntegration].fields.every(field => formData[field.label]);
    if (!isValid) {
      setAlertVisible(true); // Show alert if any field is empty
      return; // Prevent further execution
    }

    const newIntegrations = [...integrations];
    newIntegrations[selectedIntegration].status = true;
    newIntegrations[selectedIntegration].fields.forEach(field => {
      field.value = formData[field.label] || ""; // Store the input values
    });
    setIntegrations(newIntegrations);
    
    // Use base URL from .env
    const baseUrl = process.env.REACT_APP_SERVICES_BASE_URL || "http://localhost:5000/"

    console.log(baseUrl)

    try {
        const response = await fetch(baseUrl + "add_connection" , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...newIntegrations[selectedIntegration], company_id: localStorage.getItem('company_id') }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data); // Handle the response data as needed
    } catch (error) {
        console.error('Error fetching data:', error);
        setAlertVisible(true); // Show alert for error
    }

    handleModalClose();
  };

  const handleInputChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px"}}
      p="1.5rem"
    >
      <FlexBetween>
        <Header title="Integrations" />
      </FlexBetween>

      <Typography variant="body1" sx={{ mt: 2 }}>
        Select and connect tools you use to integrate with your workflow.
      </Typography>

      <Box mt={3}>
        {integrations.map((integration, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p={2}
            bgcolor="white"
            borderRadius="8px"
            mb={2}
          >
            <Box display="flex" alignItems="center">
              <img src={integration.icon} alt={`${integration.name} icon`} style={{ width: 40, height: 40, marginRight: 10 }} />
              <Box>
                <Typography variant="h6">{integration.name}</Typography>
                <Typography variant="body2">{integration.description}</Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <IOSSwitch 
                checked={integration.status} 
                onChange={() => handleToggle(index)} 
              />
              <SettingsIcon sx={{ marginLeft: 3, cursor: 'pointer' }} />
            </Box>
          </Box>
        ))}
      </Box>

      {/* Modal for additional information */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'white', // White background
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
            width: 400,
            maxWidth: '90%', // Responsive width
          }}
        >
            <Box display="flex" alignItems="center" mb={2}>
              <LinkIcon sx={{ mr: 3 }}/>
              <Typography id="modal-title" variant="h5" component="h2" sx={{ fontWeight: 'bold', color: '#333' }}>
                Additional Information for {integrations[selectedIntegration]?.name}
              </Typography>
            </Box>
            
          <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
            Please provide the required information for the integration.
          </Typography>
          {alertVisible && (
            <Alert 
              severity="error" 
              onClose={() => setAlertVisible(false)} 
              sx={{ mb: 2 }}
            >
              Please fill in all required fields.
            </Alert>
          )}
          {integrations[selectedIntegration]?.fields.map((field, idx) => (
            <TextField
              key={idx}
              fullWidth
              label={field.label}
              variant="outlined"
              value={formData[field.label] || ""}
              onChange={(e) => handleInputChange(field.label, e.target.value)}
              required // Make the field required
              sx={{ 
                mt: 2, 
                bgcolor: '#f9f9f9', // Light background for input fields
                borderRadius: '4px', // Rounded corners
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#ccc', // Light border color
                  },
                  '&:hover fieldset': {
                    borderColor: '#6200EE', // Purple border on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6200EE', // Purple border when focused
                  },
                },
              }}
            />
          ))}
          <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button 
              onClick={handleModalClose} 
              color="secondary" 
              sx={{ 
                mr: 1, 
                padding: '10px 20px', 
                borderRadius: '8px', 
                backgroundColor: 'white', 
                color: '#6200EE', 
                border: '1px solid #6200EE', 
                '&:hover': { 
                  backgroundColor: '#EDE7F6', 
                } 
              }}
            >
              Back
            </Button>
            <Button 
              onClick={handleConfirm} 
              variant="contained" 
              color="primary" 
              sx={{ 
                padding: '10px 20px', 
                borderRadius: '8px', 
                backgroundColor: '#6200EE', 
                color: 'white', 
                '&:hover': { 
                  backgroundColor: '#3700B3', 
                } 
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Integrations;