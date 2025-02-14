import type { TypographyProps } from '@mui/material';

import React from 'react';

import { Typography, FormControl } from '@mui/material';

type TextFieldWithLabelProps = {
  label: string; // Label text
  children?: React.ReactNode; // Allow children components
  mb?: number | string; // Margin-bottom value
  variant?: TypographyProps['variant'];
};

const CustomFieldLabel: React.FC<TextFieldWithLabelProps> = ({
  label,
  children,
  mb = 1,
  variant = 'body2',
}) => (
  <>
    <Typography variant={variant} mb={mb}>
      {label}
    </Typography>
    <FormControl fullWidth required>
      {children}
    </FormControl>
    
  </>
);

export default CustomFieldLabel;
