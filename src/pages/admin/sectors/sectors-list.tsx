import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { PageContent } from 'src/layouts/dashboard';

import SectorsListView from 'src/sections/sectors/sectors-list-view';

const metadata = { title: `Funds - ${CONFIG.appName}` };
const SectorsList = () => (
  <PageContent pageTitle={metadata.title}>
    <Grid container direction="column" rowSpacing={2}>
      <Grid size={12}>
        <Typography variant="h5" mb={1}>
          List Of Sectors
        </Typography>
        <Typography variant="body2" mb={0} color="textSecondary">
          See below the list of sectors
        </Typography>
      </Grid>
      <Grid size={12}>
        <SectorsListView />
      </Grid>
    </Grid>
  </PageContent>
);

export default SectorsList;
