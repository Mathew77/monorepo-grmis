import type { Theme, SxProps, SvgIconProps } from '@mui/material';

import React from 'react';

import { Box, SvgIcon, Typography } from '@mui/material';

const ArrowBackCustomIcon: React.FC<SvgIconProps> = (props) => (
  <SvgIcon {...props}>
    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
  </SvgIcon>
);

type CustomPageHeaderProps = {
  title: string; // Title text
  subtitle?: string; // Subtitle text
  showBackArrow?: boolean; // Controls visibility of the back arrow
  onBackClick?: () => void; // Callback when the back arrow is clicked
  rightContent?: React.ReactNode; // Content to display on the right
  sx?: SxProps<Theme>; // Additional styles for the header container
};

const CustomPageHeader: React.FC<CustomPageHeaderProps> = ({
  title,
  subtitle,
  showBackArrow = false,
  onBackClick,
  rightContent,
  sx,
}) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 2, // Adjust spacing below the header
      ...sx,
    }}
  >
    {/* Title and Subtitle */}
    <Box>
      <Typography
        variant="h4"
        fontWeight="normal"
        mb={1}
        sx={{
          display: 'flex', // Correct typo here
          justifyContent: 'left', // Center horizontally
          alignItems: 'center', // Center vertically
          flexDirection: 'row', // Align items in a row
          gap: 1, // Adds space between icon and text
        }}
      >
        {showBackArrow && (
          <ArrowBackCustomIcon
            fontSize="medium"
            onClick={onBackClick}
            sx={{
              '&:hover': {
                cursor: 'pointer', // Changes mouse cursor on hover
              },
            }}
          />
        )}
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="textSecondary" mt={0.5}>
          {subtitle}
        </Typography>
      )}
    </Box>

    {/* Right Content */}
    {rightContent && <Box>{rightContent}</Box>}
  </Box>
);

export default CustomPageHeader;
