import SearchIcon from "@mui/icons-material/Search";
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Card,
    CardContent,
    TextField,
    MenuItem,
    Box,
    Select
  } from "@mui/material";
  
  import { CONFIG } from 'src/global-config';

const stats = [
  { label: "Available Opportunities", value: 7 },
  { label: "Draft Applications", value: 0 },
  { label: "Submitted Applications", value: 0 },
  { label: "Approved Applications", value: 0 },
];

export default function HomeWelcomeView() {
  
  return (
    <>
    {/* Header with Background Image */}
    <Box sx={{ position: "relative", height: 250, background: `url("${CONFIG.assetsDir}/logo/funds.png") center/cover` }}>
      {/* src={`${CONFIG.assetsDir}/logo/logo-single.svg`} */}
      
        <AppBar position="static" sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }} />
              
          </Toolbar>
        </AppBar>
       
      </Box>
      <Container sx={{ textAlign: "left", mt: 4, color: "black" }}>
          <Typography variant="h4" fontWeight="bold">
            Welcome to the UK_Pact Applicant Portal HomePage
          </Typography>
          <Typography>Apply for funding and track your applications in one place.</Typography>
        </Container>
      
    </>
  );
}