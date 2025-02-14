import {
    Typography,
    Container,
    Card,
    Grid,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
  } from "@mui/material";

  import { CONFIG } from 'src/global-config';

  const applications = [
    { no: 1, fund: "Brazil", name: "Brazil Fund Forest Sector", sector: "AFOLU", deadline: "04-03-2025", status: "Live" },
    { no: 2, fund: "Thailand", name: "Thailand Green Finance and Carbon Markets sector", sector: "Green Finance", deadline: "04-01-2025", status: "Closed" },
    { no: 3, fund: "Colombia", name: "Colombia Solar Energy for Off-grid Communities", sector: "Energy", deadline: "04-03-2025", status: "Live" },
  ];

export default function HomeTableView() {
  
  return (
    <>
       <Container sx={{ mt: 4 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Fund</TableCell>
                <TableCell>CFP Name</TableCell>
                <TableCell>Sector</TableCell>
                <TableCell>Application Deadline</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.no}>
                  <TableCell>{app.no}</TableCell>
                  <TableCell>{app.fund}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{app.name}</Typography>
                  </TableCell>
                  <TableCell>{app.sector}</TableCell>
                  <TableCell>{app.deadline}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        backgroundColor: app.status === "Live" ? "#C8E6C9" : "#FFCDD2",
                        color: app.status === "Live" ? "green" : "red",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        display: "inline-block"
                      }}
                    >
                      {app.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography color="red" fontWeight="bold" sx={{ cursor: "pointer" }}>
                      View details
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/>
        
      {/* About Us and Help Centre Sections */}
  <Grid container spacing={4} sx={{ my: 4 }}>
    <Grid item xs={12} sm={6}>
      <Card sx={{ p: 3, backgroundColor: "#f7f9fc" }}>
        <CardContent>
        <img src={`${CONFIG.assetsDir}/logo/uk-pact.png`}  width="120" height="70" />
          <Typography variant="h5">About Us</Typography>
          <Typography>
            At UK PACT, we are committed to making a positive impact through our work in every industry where we work. 
            With a diverse team of professionals dedicated to innovation and excellence, we strive to address complex challenges and 
            create sustainable solutions that transform lives and communities.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Card sx={{ p: 3, backgroundColor: "#f7f9fc" }}>
      <img src={`${CONFIG.assetsDir}/logo/uk-pact.png`}  width="120" height="70" />
        <CardContent>
          <Typography variant="h5">Help Centre</Typography>
          <Typography><a href="#">How to apply</a></Typography>
          <Typography><a href="#">Eligibility guidelines</a></Typography>
          <Typography><a href="#">Documents required</a></Typography>
          <Typography><a href="#">Contact Us</a></Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
      </Container>
    </>
  );
}