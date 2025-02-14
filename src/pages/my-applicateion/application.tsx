import React from "react";

import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Typography, Button, TextField, MenuItem, Tabs, Tab, Box, } from "@mui/material";

import MyApplicationView from './../../sections/my-application/my-application-list-view';

const statuses = ["All", "Draft", "Submitted", "Approved", "Rejected"];

export default function CFPApplications (){
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header Section */}
      <Grid container justifyContent="space-between" alignItems="center" sx={{ my: 3 }}>
        <Grid size={9}> 
          <Typography variant="h4" fontWeight="bold">My CFP Applications</Typography>
          <Typography variant="body1" color="textSecondary">
            See below, all your active applications. Click on the selected application to view more details or switch between the tabs to access by status.
          </Typography>
        </Grid>
        <Grid size={3}>
          <Button variant="contained" color="error" sx={{ borderRadius: "20px", px: 3 }}>
            Start New Application
          </Button>
        </Grid>
      </Grid>

      {/* Tabs Section */}
      <Tabs value={0} textColor="primary" indicatorColor="secondary">
        {statuses.map((status, index) => (
          <Tab key={index} label={`${status} (0)`} />
        ))}
      </Tabs>

      {/* Search & Filter Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <TextField
          variant="outlined"
          placeholder="Search application..."
          InputProps={{ startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} /> }}
          sx={{ width: "40%" }}
        />
        <TextField select label="Status" defaultValue="All" sx={{ width: 150 }}>
          {statuses.map((status, index) => (
            <MenuItem key={index} value={status}>
              {status}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Table Section */}
      <MyApplicationView />
    </Container>
  );
};


