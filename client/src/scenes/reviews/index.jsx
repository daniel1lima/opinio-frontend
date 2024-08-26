import React, { useState, useEffect } from "react";
import { Box, useTheme, Typography, Paper, Grid } from "@mui/material";
import { DataGrid, GridCheckCircleIcon, GridCloseIcon } from "@mui/x-data-grid";
import ScheduleIcon from '@mui/icons-material/Schedule';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DraftsIcon from '@mui/icons-material/Drafts';
import TimerIcon from '@mui/icons-material/Timer';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useGetReviewDataByCompanyQuery } from "state/api";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Button, Popover } from "@mui/material";
import { useAuth } from "@clerk/clerk-react";
import YelpLogo from '../../assets/yelp-svgrepo-com.svg';
import GoogleLogo from '../../assets/google-icon.svg';
import TripLogo from '../../assets/tripadvisor.svg';


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

const Reviews = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  // Fetch review data whenever page or pageSize changes
  const { data: reviewData, isLoading, error } = useGetReviewDataByCompanyQuery({
    company_id: localStorage.getItem("company_id"),
    page: paginationModel.page + 1, // API pages are usually 1-based
    page_size: paginationModel.pageSize,
  }, {skip: !localStorage.getItem("company_id")});

  const review_data_array = reviewData ? reviewData.reviews : [];

  const columns = [
    { field: 'review_id', headerName: 'ID', flex: 1 },
    { field: 'review_date', headerName: 'DATE', flex: 1 },
    { field: 'review_text', headerName: 'TEXT', flex: 1 },
    { field: 'review_url', headerName: 'URL', flex: 1 },
    { field: 'rating', headerName: 'RATING', flex: 1 },
    { 
      field: 'platform_id', 
      headerName: 'PLATFORM', 
      flex: 1,
      renderCell: (params) => {
        const logo = getLogoByPlatform(params.value);
        return logo ? <img src={logo} alt={`${params.value} Logo`} style={{ width: '24px', height: '24px' }} /> : params.value;
      }
    },
    { field: 'named_labels', headerName: 'LABEL', flex: 1 },
    { field: 'sentiment', headerName: 'SENTIMENT', flex: 1 },
    { field: 'polarity', headerName: 'POLARITY', flex: 1 },
  ];

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const getRowId = (row) => row.review_id; // Use review_id as the unique identifier

  return (
    <Box
      m=".5rem 1.5rem"
      bgcolor={theme.palette.grey[100]}
      sx={{ borderRadius: "16px"}} // Set overflow to hidden
      mb="1rem" // Increased bottom margin to 4rem
      p=".5rem"
    >
      <FlexBetween>
        <Box m="1rem 1rem 0rem">
          <Box ml="0.8rem" mt="1rem">
            <Header title="Reviews" />
          </Box>
        </Box>
      </FlexBetween>
      
      <Box
        px="1.5rem"
        width="100%"
        sx={{
          overflow: "hidden", // Ensure no scrolling within the Box
          "& .MuiDataGrid-root": {
            border: "none",
            borderRadius: "16px",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #ccc", // Show lines between cells
            borderRight: "1px solid #ccc"
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.secondary[100],
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        
        <Grid container spacing={2} mb={2} mt={.5}>
          <Grid item xs={2}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.main, color: theme.palette.secondary[100], borderRadius: '16px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Total reviews</Typography>
                <GridCheckCircleIcon sx={{ color: theme.palette.secondary[100], ml: 1 }} />
              </Box>
              <Typography variant="h4">{reviewData && reviewData.totalReviews}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.secondary[100], borderRadius: '16px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Draft</Typography>
                <DraftsIcon sx={{ color: theme.palette.secondary[100], ml: 1 }} />
              </Box>
              <Typography variant="h4">13</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.secondary[100], borderRadius: '16px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Overdue</Typography>
                <TimerIcon sx={{ color: theme.palette.secondary[100], ml: 1 }} />
              </Box>
              <Typography variant="h4">7</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.secondary[100], borderRadius: '16px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Failed</Typography>
                <GridCloseIcon sx={{ color: theme.palette.secondary[100], ml: 1 }} />
              </Box>
              <Typography variant="h4">5</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.secondary[100], borderRadius: '16px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Scheduled</Typography>
                <ScheduleIcon sx={{ color: theme.palette.secondary[100], ml: 1 }} />
              </Box>
              <Typography variant="h4">24</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', backgroundColor: theme.palette.primary.light, color: theme.palette.secondary[100], borderRadius: '16px' }}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography variant="h6" fontWeight="bold">Paid</Typography>
                <AttachMoneyIcon sx={{ color: theme.palette.secondary[100], ml: 1 }} />
              </Box>
              <Typography variant="h4">312</Typography>
            </Paper>
          </Grid>
        </Grid>
        <DataGrid
          loading={isLoading || !review_data_array}
          rows={(review_data_array && review_data_array) || []}
          columns={columns}
          rowCount={(reviewData && reviewData.totalReviews) || 0} // Assuming the API returns a total count
          getRowId={getRowId} // Use review_id as the unique identifier
          pagination
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]} // Custom page size options
          rowHeight={50} // Adjusted row height to make the DataGrid smaller vertically
          columnHeaderHeight={40} // Adjusted column header height to make the DataGrid smaller vertically
          components={{
            Toolbar: DataGridCustomToolbar,
            Pagination: undefined, // Ensure the Pagination component is included
          }}
        />
      </Box>
    </Box>
  );
};

export default Reviews;