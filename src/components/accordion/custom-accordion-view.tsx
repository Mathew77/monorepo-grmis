import type {
  Theme,
  SxProps,
  AccordionProps,
  AccordionSummaryProps,
  AccordionDetailsProps,
} from '@mui/material';

import React from 'react';

import { styled } from '@mui/material/styles';
import { Box, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';

import { Iconify } from 'src/components/iconify';

type GenericAccordionProps = {
  title: string; // Title of the accordion
  defaultExpanded?: boolean; // Whether the accordion is expanded by default
  children: React.ReactNode; // Content of the accordion
  icon?: React.ReactNode; // Custom expand icon
  actionIcon?: React.ReactNode; // Action icon(s) to be displayed before the expand icon
  accordionProps?: AccordionProps; // Additional props for the Accordion
  summaryProps?: AccordionSummaryProps; // Additional props for the AccordionSummary
  detailsProps?: AccordionDetailsProps; // Additional props for the AccordionDetails
  sx?: SxProps<Theme>;
  rotateIcon?: boolean; // Flag to enable/disable rotation
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
  borderRadius: theme.shape.borderRadius,
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px)',
  },
}));

const CustomAccordionView: React.FC<GenericAccordionProps> = ({
  title,
  defaultExpanded = true,
  children,
  icon = <Iconify icon="eva:arrow-ios-downward-fill" />,
  actionIcon,
  accordionProps,
  summaryProps,
  detailsProps,
  sx,
  rotateIcon = true,
}) => (
  <StyledAccordion defaultExpanded={defaultExpanded} {...accordionProps} sx={sx}>
    <AccordionSummary
      {...summaryProps}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '& .MuiAccordionSummary-expandIconWrapper': {
          transform: rotateIcon ? 'rotate(0deg)' : 'none', // Apply rotation based on the flag
          transition: rotateIcon ? 'transform 0.3s ease' : 'none', // Apply animation based on the flag
        },
        '&.Mui-expanded .MuiAccordionSummary-expandIconWrapper': {
          transform: rotateIcon ? 'rotate(180deg)' : 'none', // Rotate when expanded if the flag is true
        },
      }}
    >
      <Typography variant="h5" sx={{ flexGrow: 1 }}>
        {title}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* Render action icons before the expand icon */}
        {icon}
        {actionIcon && <Box>{actionIcon}</Box>}
      </Box>
    </AccordionSummary>
    <AccordionDetails {...detailsProps}>{children}</AccordionDetails>
  </StyledAccordion>
);

export default CustomAccordionView;
