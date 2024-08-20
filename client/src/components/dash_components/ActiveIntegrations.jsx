import React from 'react';
import { Box, Typography, Card, CardContent, Stack, useTheme, CircularProgress, Button } from '@mui/material';
import { styled } from '@mui/system';
import YelpLogo from '../../assets/yelp-svgrepo-com.svg';
import GoogleLogo from '../../assets/google-icon.svg';
import TripLogo from '../../assets/tripadvisor.svg';
import { differenceInDays, parseISO } from 'date-fns';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom'; // Import this if you're using React Router v6+
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// Styled component for the pulsing bulb
const PulsingBulb = styled(Box)(({ isActive }) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: isActive ? 'green' : 'gray',
    transition: 'background-color 0.3s ease',
}));

// Styled Card component
const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    },
}));

const processIntegrations = (data) => {
    if (!data || !data.connections || !Array.isArray(data.connections)) return [];

    return data.connections.map(connection => {
        const lastSyncDate = connection.last_sync ? parseISO(connection.last_sync) : null;
        const daysSinceLastSync = lastSyncDate ? differenceInDays(new Date(), lastSyncDate) : Infinity;

        return {
            name: connection.type,
            lastSync: connection.last_sync || 'N/A',
            status: daysSinceLastSync <= 3 ? 'Active' : 'Inactive',
            statusColor: daysSinceLastSync <= 3 ? 'success' : 'default'
        };
    });
};

const getLogoByPlatform = (platform) => {
    switch (platform.toLowerCase()) {
        case 'yelp':
            return YelpLogo;
        case 'google':
            return GoogleLogo;
        case 'tripadvisor':
            return TripLogo;
        default:
            return null;
    }
};

const ActiveIntegrations = ({ data, isLoading }) => {
    const theme = useTheme();
    const navigate = useNavigate(); // Use this hook if you're using React Router v6+
    const integrations = React.useMemo(() => processIntegrations(data), [data]);

    const handleNavigateToIntegrations = () => {
        // If you're not using React Router, you can use window.location instead
        // window.location.href = '/integrations';
        
        // If you are using React Router v6+, use the navigate function
        navigate('/integrations');
    };

    if (isLoading) {
        return (
            <Box
                gridColumn="span 12"
                gridRow="span 4"
                backgroundColor={theme.palette.background.default}
                borderRadius="0.55rem"
                p="1rem"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            gridColumn="span 12"
            gridRow="span 4"
            backgroundColor={theme.palette.background.default}
            borderRadius="0.55rem"
            p="1rem"
            sx={{
                "&:hover": {
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
                    transition: "0.3s ease-out"
                }
            }}
        >
            <Typography variant="h5" fontWeight="bold" mb={2}>
                Active Integrations
            </Typography>
            {integrations.length === 0 ? (
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="200px"
                    border={`2px dashed ${theme.palette.primary.main}`}
                    borderRadius="12px"
                    p={3}
                    textAlign="center"
                >
                    <Typography variant="h6" color="secondary" gutterBottom>
                        No active integrations found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" mb={2}>
                        Connect your favorite platforms to get started!
                    </Typography>
                    <Button
                        onClick={handleNavigateToIntegrations}
                        variant="contained"
                        color="primary"
                        startIcon={<AddCircleOutlineIcon />}
                        sx={{
                            borderRadius: '20px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                                transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                                backgroundColor: '#007bff', // Changed to a darkish blue color
                            },
                        }}
                    >
                        Set Up Integrations
                    </Button>
                </Box>
            ) : (
                <Stack spacing={2}>
                    {integrations.map((integration) => (
                        <StyledCard key={integration.name} variant="outlined">
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Box display="flex" alignItems="center">
                                        <Box mr={2}>
                                            <img 
                                                src={getLogoByPlatform(integration.name)} 
                                                alt={`${integration.name} Logo`} 
                                                style={{ width: '24px', height: '24px' }} 
                                            />
                                        </Box>
                                        <Typography variant="body1" fontWeight="bold">
                                            {integration.name}
                                        </Typography>
                                    </Box>
                                    <PulsingBulb isActive={integration.status === 'Active'} />
                                </Box>
                                <Typography variant="body2" color="textSecondary" mt={1}>
                                    Last Sync: {integration.lastSync}
                                </Typography>
                            </CardContent>
                        </StyledCard>
                    ))}
                </Stack>
            )}
        </Box>
    );
};

export default ActiveIntegrations;