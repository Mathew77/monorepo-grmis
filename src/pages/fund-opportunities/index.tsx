import { Container,Typography } from '@mui/material';

import FundOpportunitiesListView from './../../sections/fund-opportunities/fund-opportunities-list-view';
//import ApplyFundOpportunities from './../../sections/fund-opportunities/apply-fund-opportunities';

export default function FundingOpportunities() {


  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" color="#011E62">Available Funding Opportunities</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        See below the list of available funding opportunities. Click on the programme you wish to apply for to view more details.
      </Typography>
      <FundOpportunitiesListView />
    </Container>
  );
}