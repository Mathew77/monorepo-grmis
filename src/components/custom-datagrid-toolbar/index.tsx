import type { Theme, SxProps } from '@mui/material';

import React from 'react';

import { Box } from '@mui/material';
import {
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

type GenericToolbarProps = {
  onFilterButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Callback for filter button
  customButtons?: React.ReactNode; // Additional custom buttons/actions
  children?: React.ReactNode; // Allow children components
  sx?: SxProps<Theme>; // Custom styles for the toolbar
};

const CustomDataGridToolbar: React.FC<GenericToolbarProps> = ({
  onFilterButtonClick,
  customButtons,
  children,
  sx,
}) => (
  <GridToolbarContainer>
    {children || (
      <>
        <GridToolbarQuickFilter />

        <Box
          sx={{
            gap: 1,
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <GridToolbarColumnsButton />
          <GridToolbarExport />
          {/* <GridToolbarFilterButton onClick={onFilterButtonClick} /> */}
        </Box>
      </>
    )}
  </GridToolbarContainer>
);

export default CustomDataGridToolbar;
