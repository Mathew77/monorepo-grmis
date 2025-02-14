import React, { useState } from "react";

import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Container,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  IconButton,
} from "@mui/material";


const StyledTabs = styled(Tabs)({
  borderBottom: "1px solid #E0E0E0",
});

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: "bold",
  fontSize: "16px",
  "&.Mui-selected": {
    color: "white",
    backgroundColor: "#0A3D91",
  },
}));

const EligibilityChecker = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabChange = (_event:any, newValue:any) => setTabIndex(newValue);

  return (
    <Container maxWidth="md">
      {/* Back Button */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="body1">Back</Typography>
      </Box>

      {/* Top Section */}
      <Paper elevation={0} sx={{ p: 2, mb: 2, backgroundColor: "#F5F5F5" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={4}>
            <Typography fontWeight="bold">CFP name</Typography>
            <Typography>Brazil Fund Forest Sector</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="bold">Fund name</Typography>
            <Typography>Brazil-UK Pact</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography fontWeight="bold">Status</Typography>
            <Button
              variant="contained"
              disabled
              sx={{
                backgroundColor: "#D1D1D1",
                color: "black",
                textTransform: "none",
              }}
            >
              Co-creation
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <StyledTabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
        <StyledTab label="Eligibility checker" />
        <StyledTab label="Document Upload" />
        <StyledTab label="Applicant Details" />
        <StyledTab label="Review & Submit" />
      </StyledTabs>

      {tabIndex === 0 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold">Eligibility checker</Typography>
          <Typography color="gray">
            Want to check if your project is eligible before applying? Use the quick check list below. You can find more about eligibility for this call, and for UK PACT funding by reading our Applicant Handbook and Terms of Reference.
          </Typography>

          {[
            "Is your project aligned to at least one of the areas of interventions of the call?",
            "Is the value of your project up to £500,000 per financial year and up to 2 years?",
            "Is your organisation eligible to apply for UK PACT funding and on a not-for-profit basis? Note that public entities, government agencies and/or departments are not eligible.",
            "Are your project activities and costs eligible? Please note: we cannot award funding for infrastructure projects or for tangible assets and profit is not eligible cost in UK PACT budgets, either as a direct cost or within overheads.",
          ].map((question, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography>{question}</Typography>
              <RadioGroup row>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          ))}

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button variant="contained" sx={{ backgroundColor: "#0A3D91", color: "white", mr: 2 }}>
              Save Draft
            </Button>
            <Button variant="contained" disabled sx={{ backgroundColor: "#F5C6C6", color: "#FFF" }}>
              Continue
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default EligibilityChecker;
