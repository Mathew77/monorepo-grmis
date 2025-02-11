import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { PageContent } from 'src/layouts/dashboard';

import CurrencyListView from 'src/sections/admin/currency/currency-list-view';


const metadata = { title: `Currencies - ${CONFIG.appName}` };
const CurrencyList = () => (
  <PageContent pageTitle={metadata.title}>
    <Grid container direction="column" rowSpacing={2}>
      <Grid size={12}>
        <Typography variant="h5" mb={1}>
          List Of Currency
        </Typography>
        <Typography variant="body2" mb={0} color="textSecondary">
          See below the list of currencies
        </Typography>
      </Grid>
      <Grid size={12}>
        <CurrencyListView />
      </Grid>
    </Grid>
  </PageContent>
);

export default CurrencyList;
