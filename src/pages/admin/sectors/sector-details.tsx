import type { SvgIconProps } from '@mui/material';

import React from 'react';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

import Grid from '@mui/material/Grid2';
import { SvgIcon, Typography } from '@mui/material';

import { CONFIG } from 'src/global-config';
import { PageContent } from 'src/layouts/dashboard';

import SectorDetailsView from 'src/sections/sectors/sectors-details-view';

const ArrowBackCustomIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </SvgIcon>
);

const metadata = { title: `Sector Details - ${CONFIG.appName}` };

const SectorDetails: React.FC = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };
  return (
    <PageContent maxWidth={false}>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <Grid container direction="column" rowSpacing={1}>
        <Grid size={12}>
          <Typography
            variant="h5"
            mb={1}
            sx={{
              display: 'flex', // Correct typo here
              justifyContent: 'left', // Center horizontally
              alignItems: 'center', // Center vertically
              flexDirection: 'row', // Align items in a row
              gap: 1, // Adds space between icon and text
            }}
          >
            <ArrowBackCustomIcon
              fontSize="medium"
              onClick={handleBack}
              sx={{
                '&:hover': {
                  cursor: 'pointer', // Changes mouse cursor on hover
                },
              }}
            />
            Sector Details
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Fill in the details for the sector. Ensure all required fields are completed before
            saving.
          </Typography>
        </Grid>
        <Grid size={12}>
          <SectorDetailsView />
        </Grid>
      </Grid>
    </PageContent>
  );
};

export default SectorDetails;
