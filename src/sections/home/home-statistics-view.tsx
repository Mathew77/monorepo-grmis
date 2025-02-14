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


const stats = [
  { label: "Available Opportunities", value: 7 },
  { label: "Draft Applications", value: 0 },
  { label: "Submitted Applications", value: 0 },
  { label: "Approved Applications", value: 0 },
];


export default function HomeStatisticsView() {
  
  return (
    <>
      <Container sx={{ mt: -4, position: "relative" }}>
        <Grid container spacing={2} justifyContent="space-between">
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={3} key={index}>
              <Card sx={{ backgroundColor: "#011E62", color: "white", textAlign: "center" }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                  <Typography>{stat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Search & Country Select */}
        <Grid container spacing={2} alignItems="center" sx={{ mt: 3 }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search CFP..."
              InputProps={{ startAdornment: <SearchIcon /> }}
            />
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Select defaultValue="ALL" variant="outlined">
              <MenuItem value="ALL">ALL</MenuItem>
              <MenuItem value="Brazil">Brazil</MenuItem>
              <MenuItem value="Thailand">Thailand</MenuItem>
              <MenuItem value="Colombia">Colombia</MenuItem>
            </Select>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}