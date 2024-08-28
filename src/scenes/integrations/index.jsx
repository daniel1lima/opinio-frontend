import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Modal,
  TextField,
  Button,
  Switch,
  Alert,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import YelpIcon from "assets/yelp-svgrepo-com.svg"; // Import the Yelp SVG
import GoogleIcon from "assets/google-icon.svg"; // Import the Google SVG
import TripAdvisorIcon from "assets/tripadvisor.svg"; // Import the TripAdvisor SVG
import SettingsIcon from "@mui/icons-material/Settings"; // Import the settings icon
import LinkIcon from "@mui/icons-material/Link";
import WarningAmberIcon from "@mui/icons-material/WarningAmber"; // Import warning icon
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline"; // Import checkmark icon
import { differenceInDays, differenceInSeconds, parseISO } from "date-fns"; // Import date utilities

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#007BFF", // Change to blue
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 0.8,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

const Integrations = () => {
  const theme = useTheme();

  const [integrations, setIntegrations] = useState([
    {
      name: "Yelp",
      description: "Customer reviews and ratings.",
      icon: YelpIcon,
      status: false,
      fields: [{ label: "Business ID", value: "" }],
      last_sync: null,
    },
    {
      name: "Google Reviews",
      description: "Manage your Google reviews.",
      icon: GoogleIcon,
      status: false,
      fields: [
        { label: "Business ID", value: "" },
        { label: "API Key", value: "" },
      ],
      last_sync: null,
    },
    {
      name: "Tripadvisor",
      description: "Travel and restaurant reviews.",
      icon: TripAdvisorIcon,
      status: false,
      fields: [{ label: "API Key", value: "" }],
      last_sync: null,
    },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [formData, setFormData] = useState({});
  const [alertVisible, setAlertVisible] = useState(false); // State for alert visibility
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [integrationToRemove, setIntegrationToRemove] = useState(null);
  const [jobStatus, setJobStatus] = useState({});

  useEffect(() => {
    fetchIntegrations();
  }, []);

  useEffect(() => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_SERVICES_BASE_URL}/job_status_webhook?company_id=${localStorage.getItem("company_id")}`,
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setJobStatus(data);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const fetchIntegrations = async () => {
    const baseUrl = process.env.REACT_APP_SERVICES_BASE_URL;
    const companyId = localStorage.getItem("company_id");

    try {
      const response = await fetch(
        `${baseUrl}/company_connections?company_id=${companyId}`,
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const updatedIntegrations = integrations.map((integration) => {
        const matchingConnection = data.connections.find(
          (conn) => conn.type.toLowerCase() === integration.name.toLowerCase(),
        );
        if (matchingConnection) {
          return {
            ...integration,
            status: true,
            fields: integration.fields.map((field) => ({
              ...field,
              value:
                matchingConnection.config[
                  field.label.toLowerCase().replace(" ", "_")
                ] || "",
            })),
            last_sync: matchingConnection.last_sync,
          };
        }
        return integration;
      });

      setIntegrations(updatedIntegrations);
    } catch (error) {
      console.error("Error fetching integrations:", error);
    }
  };

  const getIntegrationStatus = (integration) => {
    if (jobStatus.connector_type === integration.name) {
      if (jobStatus.status === "pending") {
        return "syncing";
      } else if (jobStatus.status === "failed") {
        return "failed";
      } else if (jobStatus.status === "completed") {
        const syncDate = parseISO(jobStatus.updated_at);
        return differenceInSeconds(new Date(), syncDate) <= 259200
          ? "recent"
          : "attention";
      }
    }
    return integration.last_sync
      ? needsAttention(integration.last_sync)
        ? "attention"
        : "recent"
      : "none";
  };

  const needsAttention = (last_sync) => {
    if (last_sync === null) return false;
    const syncDate = parseISO(last_sync);
    return differenceInDays(new Date(), syncDate) > 3;
  };

  const isRecentlySynced = (last_sync) => {
    if (last_sync === null) return false;
    const syncDate = parseISO(last_sync);
    return differenceInDays(new Date(), syncDate) <= 3;
  };

  const isCurrentlySyncing = (last_sync) => {
    return last_sync === null;
  };

  const handleToggle = (index) => {
    if (!integrations[index].status) {
      setSelectedIntegration(index);
      setOpenModal(true);
    } else {
      setIntegrationToRemove(index);
      setConfirmationModal(true);
    }
  };

  const handleConfirmRemove = async () => {
    const newIntegrations = [...integrations];
    newIntegrations[integrationToRemove].status = false;
    setIntegrations(newIntegrations);

    const baseUrl = process.env.REACT_APP_SERVICES_BASE_URL;

    try {
      const response = await fetch(`${baseUrl}/remove_connection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: localStorage.getItem("company_id"),
          type: newIntegrations[integrationToRemove].name,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data); // Handle the response data as needed
    } catch (error) {
      // console.error('Error removing integration:', error);
      // Handle error (e.g., show an error message to the user)
    }

    setConfirmationModal(false);
    setIntegrationToRemove(null);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setSelectedIntegration(null);
    setFormData({});
  };

  const handleConfirm = async () => {
    // Validation check for required fields
    const isValid = integrations[selectedIntegration].fields.every(
      (field) => formData[field.label],
    );
    if (!isValid) {
      setAlertVisible(true); // Show alert if any field is empty
      return; // Prevent further execution
    }

    const newIntegrations = [...integrations];
    newIntegrations[selectedIntegration].status = true;
    newIntegrations[selectedIntegration].fields.forEach((field) => {
      field.value = formData[field.label] || ""; // Store the input values
    });
    setIntegrations(newIntegrations);

    const baseUrl = process.env.REACT_APP_SERVICES_BASE_URL;
    const companyId = localStorage.getItem("company_id");
    const integrationType = newIntegrations[selectedIntegration].name;

    try {
      // First, add the connection
      const addConnectionResponse = await fetch(`${baseUrl}/add_connection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newIntegrations[selectedIntegration],
          company_id: companyId,
          last_sync: "",
        }),
      });

      if (!addConnectionResponse.ok) {
        throw new Error("Failed to add connection");
      }

      // Then, call the /reviews endpoint
      const reviewsResponse = await fetch(`${baseUrl}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company_id: companyId,
          connectors: [integrationType],
          action: "initial",
        }),
      });

      if (!reviewsResponse.ok) {
        throw new Error("Failed to initiate review fetch");
      }

      const reviewsData = await reviewsResponse.json();
      console.log("Reviews fetch initiated:", reviewsData);

      // Handle success (e.g., show a success message)
      // You might want to add a state for success messages and display it to the user
    } catch (error) {
      console.error("Error:", error);
      setAlertVisible(true); // Show alert for error
      // You might want to set a more specific error message based on where the error occurred
    }

    handleModalClose();
  };

  const handleInputChange = (label, value) => {
    setFormData({ ...formData, [label]: value });
  };

  function GradientCircularProgress() {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <Tooltip title="Integration is syncing">
          <CircularProgress
            size={21}
            sx={{ mr: 2, "svg circle": { stroke: "url(#my_gradient)" } }}
          />
        </Tooltip>
      </React.Fragment>
    );
  }

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px" }}
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
              <img
                src={integration.icon}
                alt={`${integration.name} icon`}
                style={{ width: 40, height: 40, marginRight: 10 }}
              />
              <Box>
                <Typography variant="h6">{integration.name}</Typography>
                <Typography variant="body2">
                  {integration.description}
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              {integration.status &&
                (() => {
                  const status = getIntegrationStatus(integration);
                  console.log(status);
                  console.log(integration);
                  switch (status) {
                    case "syncing":
                      return <GradientCircularProgress />;
                    case "failed":
                      return (
                        <Tooltip title="Integration sync failed. Please check your settings.">
                          <IconButton sx={{ mr: 2 }}>
                            <WarningAmberIcon
                              sx={{ color: theme.palette.error.main }}
                            />
                          </IconButton>
                        </Tooltip>
                      );
                    case "attention":
                      return (
                        <Tooltip title="This integration needs attention. Last sync was more than 3 days ago.">
                          <IconButton sx={{ mr: 2 }}>
                            <WarningAmberIcon
                              sx={{ color: theme.palette.warning.main }}
                            />
                          </IconButton>
                        </Tooltip>
                      );
                    case "recent":
                      return (
                        <Tooltip title="Integration synced within the last 3 days">
                          <IconButton sx={{ mr: 2 }}>
                            <CheckCircleOutlineIcon
                              sx={{ color: theme.palette.success.main }}
                            />
                          </IconButton>
                        </Tooltip>
                      );
                    default:
                      return null;
                  }
                })()}
              <IOSSwitch
                checked={integration.status}
                onChange={() => handleToggle(index)}
              />
              <SettingsIcon sx={{ marginLeft: 3, cursor: "pointer" }} />
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
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white", // White background
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
            width: 400,
            maxWidth: "90%", // Responsive width
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <LinkIcon sx={{ mr: 3 }} />
            <Typography
              id="modal-title"
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Additional Information for{" "}
              {integrations[selectedIntegration]?.name}
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
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
                bgcolor: "#f9f9f9", // Light background for input fields
                borderRadius: "4px", // Rounded corners
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc", // Light border color
                  },
                  "&:hover fieldset": {
                    borderColor: "#6200EE", // Purple border on hover
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#6200EE", // Purple border when focused
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
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "#6200EE",
                border: "1px solid #6200EE",
                "&:hover": {
                  backgroundColor: "#EDE7F6",
                },
              }}
            >
              Back
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#6200EE",
                color: "white",
                "&:hover": {
                  backgroundColor: "#3700B3",
                },
              }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Confirmation Modal for removing integration */}
      <Modal
        open={confirmationModal}
        onClose={() => setConfirmationModal(false)}
        aria-labelledby="confirmation-modal-title"
        aria-describedby="confirmation-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            boxShadow: 3,
            p: 4,
            borderRadius: 2,
            width: 400,
            maxWidth: "90%",
          }}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <WarningAmberIcon
              sx={{ mr: 3, color: theme.palette.warning.main }}
            />
            <Typography
              id="confirmation-modal-title"
              variant="h5"
              component="h2"
              sx={{ fontWeight: "bold", color: "#333" }}
            >
              Remove Integration
            </Typography>
          </Box>

          <Typography variant="body2" sx={{ color: "#666", mb: 2 }}>
            Are you sure you want to remove this integration? This action cannot
            be undone.
          </Typography>

          <Box display="flex" justifyContent="flex-end" sx={{ mt: 3 }}>
            <Button
              onClick={() => setConfirmationModal(false)}
              color="secondary"
              sx={{
                mr: 1,
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "#6200EE",
                border: "1px solid #6200EE",
                "&:hover": {
                  backgroundColor: "#EDE7F6",
                },
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmRemove}
              variant="contained"
              color="error"
              sx={{
                padding: "10px 20px",
                borderRadius: "8px",
                backgroundColor: "#d32f2f",
                color: "white",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Integrations;
