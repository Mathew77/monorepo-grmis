import type { Theme, SxProps } from '@mui/material';

import React from 'react';

import { Card, Typography } from '@mui/material';

type StatCardProps = {
  value: string | number; // The main value (e.g., 56)
  label: string; // The label below the value
  sx?: SxProps<Theme>; // Additional styles for customization
  width?: string | number | {};
  height?: string | number;
  labelSize?: string | number;
  valueSize?: string | number;
};

const CustomSummaryCard: React.FC<StatCardProps> = ({
  value,
  label,
  sx,
  width = 'auto',
  height = 'auto',
  valueSize = 40,
  labelSize = 20,
}) => (
  <Card
    sx={{
      backgroundColor: '#333', // Dark background
      color: '#fff', // White text
      borderRadius: 1, // No border radius
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Push value to the top and label to the bottom
      alignItems: 'flex-start', // Align items to the left
      px: 3, // Inner padding
      py: 2,
      height: { height },
      minHeight: 100, // Set consistent height
      width,
      ...sx, // Allow additional custom styles
    }}
  >
    {/* Value */}
    <Typography fontSize={valueSize} fontWeight="bold">
      {value}
    </Typography>

    {/* Label */}
    <Typography fontSize={labelSize}>{label}</Typography>
  </Card>
);

export default CustomSummaryCard;
