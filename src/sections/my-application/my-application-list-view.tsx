import React from "react";

import SearchIcon from "@mui/icons-material/Search";
import {  Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";


const statuses = ["All", "Draft", "Submitted", "Approved", "Rejected"];

export default function MyApplicationView (){
  return (
    <>

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
    </>
  );
};


