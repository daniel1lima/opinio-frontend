import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetReviewDataByCompanyQuery, useGetTransactionsQuery, useGetUserQuery } from "state/api";
import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";
import { Button, Popover, Typography } from "@mui/material";
import { useAuth, useUser } from "@clerk/clerk-react";


const Reviews = () => {
  const theme = useTheme();

  // values to be sent to the backend
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  // GRAB ALL RELEVANT DATABELOW
  const { userId } = useAuth();
  const { user } = useUser();
  const userFromDb = useGetUserQuery(userId).data;

  const {data, isLoading} = useGetReviewDataByCompanyQuery(userFromDb?.company_id, {skip: !userFromDb?.company_id});

  console.log(data);

  const columns = [
    { field: 'assigned_label', headerName: 'Assigned Label', flex: 1 },
    { field: 'company_id', headerName: 'Company ID', flex: 1 },
    { field: 'date', headerName: 'Date', flex: 1 },
    { field: 'industry_id', headerName: 'Industry ID', flex: 1 },
    { field: 'named_labels', headerName: 'Named Labels', flex: 1 },
    { field: 'platform_id', headerName: 'Platform ID', flex: 1 },
    { field: 'polarity', headerName: 'Polarity', flex: 1 },
    { field: 'processed_sentences', headerName: 'Processed Sentences', flex: 1 },
    { field: 'sentiment', headerName: 'Sentiment', flex: 1 },
    {
      field: "action",
      headerName: "Generate Response",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <Button aria-describedby={id} variant="contained" color="success" onClick={handleClick}>
            Respond
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              {/* Content of the Popover */}
              The user ID is: {params.row._id}
            </Box>
          </Popover>
        </>
      ),
    },
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

  const getRowId = (row) => row._id;

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
            <Header title="Reviews" />
          </Box>
        </Box>
      </FlexBetween>
      <Box
      px="1.5rem"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
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
        <DataGrid
        loading={isLoading || !data}
        rows={(data && data) || []}
        columns={columns}
        rowCount={(data && data.length) || 0}
        getRowId={getRowId}
      />
      </Box>
      {/* insert over here */}
    </Box>
  );
};



export default Reviews;
