import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { PageContent } from 'src/layouts/dashboard';

import CountryListView from 'src/sections/admin/country/country-list-view';


const metadata = { title: `Countries - ${CONFIG.appName}` };
const CurrencyList = () => (
  <PageContent pageTitle={metadata.title}>
    <Grid container direction="column" rowSpacing={2}>
      <Grid size={12}>
        <Typography variant="h5" mb={1}>
          List Of Countries
        </Typography>
        <Typography variant="body2" mb={0} color="textSecondary">
          See below the list of countries
        </Typography>
      </Grid>
      <Grid size={12}>
        <CountryListView />
      </Grid>
    </Grid>
  </PageContent>
);

export default CurrencyList;
