import React from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Button, Card, Grid, Typography, Chip } from "@mui/material";


export default function FundOpportunitiesViewDetail () {
  return (
    <Box sx={{ p: 4 }}>
      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Button startIcon={<ArrowBackIcon />} sx={{ color: "#5F6C7B" }}>
          Back
        </Button>
        <Button endIcon={<ArrowForwardIcon />} sx={{ color: "#5F6C7B" }}>
          Next
        </Button>
      </Box>

      {/* Project Summary Card */}
      <Card sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Box>
          <Typography fontWeight={600} color="green">
            CFP name
          </Typography>
          <Typography>Brazil Fund Forest Sector</Typography>
        </Box>
        <Box>
          <Typography fontWeight={600} color="green">
            Fund name
          </Typography>
          <Typography>Brazil-UK Pact</Typography>
        </Box>
        <Box>
          <Typography fontWeight={600}>Status</Typography>
          <Chip label="Live" color="success" sx={{ fontWeight: "bold" }} />
        </Box>
        <Button variant="contained" color="error" sx={{ fontWeight: "bold" }}>
          Apply Now
        </Button>
      </Card>

      {/* Project Overview Header */}
      <Box sx={{ backgroundColor: "#12284C", p: 2, borderRadius: 1, mb: 2 }}>
        <Typography color="white" fontWeight={600}>
          Project Overview
        </Typography>
      </Box>

      {/* Project Information */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: "Start Date", value: "15-04-2025" },
          { label: "End Date", value: "14-01-2027" },
          { label: "Submission Date", value: "04-03-2025" },
          { label: "Sector", value: "AFOLU" },
          { label: "Reference Number", value: "BR-0311024" },
        ].map((item, index) => (
          <Grid item xs={6} sm={4} md={2.4} key={index}>
            <Typography fontWeight={600}>{item.label}</Typography>
            <Typography color="text.secondary">{item.value}</Typography>
          </Grid>
        ))}
      </Grid>

      {/* Objectives */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Objectives
      </Typography>
      <ul>
        <li>Support sustainable energy adoption in target communities.</li>
        <li>Foster collaboration among stakeholders to ensure a green recovery.</li>
        <li>Strengthen local capacity for environmental and energy management.</li>
      </ul>

      {/* Project Description */}
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Project Description
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        The Brazil Fund Forest Sector project is a strategic initiative aimed at facilitating Brazils shift towards a 
        diversified and cleaner energy matrix. This transition is pivotal for enhancing energy security and resilience, 
        reducing greenhouse gas emissions, and fostering sustainable economic growth. The project focuses on three key 
        intervention areas:
      </Typography>
      <Typography fontWeight={600}>1. Expansion of Large-Scale Non-Conventional Renewable Energy Projects:</Typography>
      <Typography color="text.secondary" gutterBottom>
        This involves integrating renewable energy sources into Brazils national electricity grid, supporting both national 
        and global climate objectives, and advancing the transition to a low-carbon energy system.
      </Typography>
      <Typography fontWeight={600}>2. Modernization of the Electricity Market</Typography>
      <Typography color="text.secondary" gutterBottom>
        Developing a market framework that ensures the seamless integration of renewable energy, enhancing the grids 
        flexibility, reliability, and efficiency.
      </Typography>
      <Typography fontWeight={600}>3. Just and Equitable Phasing Out of Coal-Fired Power Plants</Typography>
      <Typography color="text.secondary">
        A phased-out model of coal-fired plants, ensuring a fair transition to sustainable industries and creating new 
        employment opportunities.
      </Typography>
    </Box>
  );
};


