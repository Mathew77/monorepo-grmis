import React from "react";

import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";
import { Container, Typography, Button, TextField, MenuItem, Tabs, Tab, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


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
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell><strong>Project_ID</strong></TableCell>
              <TableCell><strong>CFP name</strong></TableCell>
              <TableCell><strong>Project name</strong></TableCell>
              <TableCell><strong>Date Submitted</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Last updated</strong></TableCell>
              <TableCell><strong>Comments</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} align="center">
                <Typography variant="h6" fontStyle="italic" color="primary.dark">
                  No data saved yet!
                </Typography>
                <Typography variant="body2" color="primary.dark">
                  Once you make an application, it shall be saved and displayed here.
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};


