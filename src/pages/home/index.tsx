import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,

} from "@mui/material";

import { CONFIG } from 'src/global-config';

import HomeWelcomeView from './../../sections/home/welcome-view';
import HomeTableView from './../../sections/home/home-table-view';
import HomeStatisticsView from './../../sections/home/home-statistics-view';


export default function UKPactDashboard() {
  return (
    <Box>
      <HomeWelcomeView />
        <br/>
      {/* Summary Stats */}
      <HomeStatisticsView />
      {/* Applications Table */}
     <HomeTableView />
    </Box>
  );
}
