import React from 'react';
import { Box, Typography, Card, CardContent, Chip, Stack, useTheme } from '@mui/material';
import { styled } from '@mui/system';
import YelpLogo from '../../assets/yelp-svgrepo-com.svg';
import GoogleLogo from '../../assets/google-icon.svg';
import TripLogo from '../../assets/tripadvisor.svg';

// Styled component for the pulsing bulb
const PulsingBulb = styled(Box)(({ isActive }) => ({
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: isActive ? '2px solid green' : '2px solid red',
    backgroundColor: 'transparent',
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

const ActiveIntegrations = () => {
    const theme = useTheme();
    const integrations = [
        { name: 'Yelp', lastSync: '2023-10-01 12:00 PM', status: 'Active', statusColor: 'success' },
        { name: 'Google Reviews', lastSync: '2023-10-02 09:30 AM', status: 'Active', statusColor: 'success' },
        { name: 'Tripadvisor', lastSync: '2023-10-01 03:45 PM', status: 'Inactive', statusColor: 'warning' },
    ];

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
            <Stack spacing={2}>
                {integrations.map((integration) => (
                    <StyledCard key={integration.name} variant="outlined">
                        <CardContent>
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                                <Box display="flex" alignItems="center">
                                    {/* Icon space for company logos */}
                                    <Box mr={2}>
                                        {integration.name === 'Yelp' && (
                                            <img src={YelpLogo} alt="Yelp Logo" style={{ width: '24px', height: '24px' }} />
                                        )}
                                        {integration.name === 'Google Reviews' && (
                                            <img src={GoogleLogo} alt="Google Logo" style={{ width: '24px', height: '24px' }} />
                                        )}
                                        {integration.name === 'Tripadvisor' && (
                                            <img src={TripLogo} alt="Tripadvisor Logo" style={{ width: '24px', height: '24px' }} />
                                        )}
                                        {/* Add similar conditions for other logos if needed */}
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
        </Box>
    );
};

export default ActiveIntegrations;