import type { GridColDef } from '@mui/x-data-grid';

import dayjs from 'dayjs';
import { useNavigate } from 'react-router';
import React, { useMemo, useState } from 'react';
import { useBoolean } from 'minimal-shared/hooks';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Dialog from '@mui/material/Dialog';
import { Box, Card, Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarQuickFilter,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import CustomDataGridToolbar from 'src/components/custom-datagrid-toolbar';
import { GridActionsLinkItem } from 'src/components/custom-grid-action-link-item';

import { sectorsApis } from './apis/sectors-apis';

type ISector = {
  id?: string;
  name: string;
  status: string;
};

const SectorsListView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const openDialog = useBoolean(false);
  const [selectedId, setSelectedId] = useState<string | null>(null); // Track the selected ID

  // Fetch sector details using React Query
  const { data: sectors, isLoading: isQueryLoading } = useQuery({
    queryKey: ['sectorList', pagination],
    queryFn: () => sectorsApis.list(pagination.pageNumber, pagination.pageSize), // The query function
    retry: 3, // Retry up to 3 times on failure (optional)
  });


  // Single function to update pagination state
  const handlePaginationChange = (model: { page?: number; pageSize?: number }) => {
    setPagination((prev) => ({
      pageNumber: model.page !== undefined ? model.page + 1 : prev.pageNumber, // Convert to 1-based index
      pageSize: model.pageSize || prev.pageSize,
    }));
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sectorsApis.delete(id),
  });

  // Handle delete action
  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteMutation.mutateAsync(selectedId);
        toast.success('Sector deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['sectorList'] }); // Refresh the sector list
        openDialog.onFalse(); // Close the dialog
      } catch (error: any) {
        console.error('Error deleting sector:', error);
        toast.error('Failed to delete sector');
      }
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', flex: 1, hideable: false },
      { field: 'name', headerName: 'Name', flex: 2 },
      { field: 'description', headerName: 'Description', flex: 4 },
      {
        field: 'createDate',
        headerName: 'Create Date',
        flex: 1,
        valueFormatter: (params) => dayjs(params as string).format('DD/MM/YYYY'),
      },
      {
        field: 'updateDate',
        headerName: 'Update Date',
        flex: 1,
        valueFormatter: (params) => dayjs(params as string).format('DD/MM/YYYY'),
      },
      {
        type: 'actions',
        field: 'actions',
        headerName: ' ',
        align: 'right',
        headerAlign: 'right',
        width: 80,
        sortable: false,
        filterable: false,
        disableColumnMenu: true,
        getActions: (params) => [
          <GridActionsLinkItem
            showInMenu
            icon={<Iconify icon="solar:eye-bold" />}
            label="View"
            href={paths.administrator.sectors.edit(params.row.id)}
          />,
          <GridActionsLinkItem
            showInMenu
            icon={<Iconify icon="solar:pen-bold" />}
            label="Edit"
            href={paths.administrator.sectors.edit(params.row.id)}
          />,
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label="Delete"
            onClick={() => {
              setSelectedId(params.row.id); // Set the selected ID
              openDialog.onTrue(); // Open the dialog
            }}
            sx={{ color: 'error.main' }}
          />,
        ],
      },
    ],
    []
  );

  const handleRowClick = (params: any) => {
    //setSelectedFund(params.row);
  };

  return (
    <Card
      sx={{
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        padding: '2px',
      }}
    >
      <DataGrid
        rows={sectors?.data||[]}
        columns={columns}
        loading={isQueryLoading}
        onRowClick={handleRowClick}
        onPaginationModelChange={handlePaginationChange}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          density: 'standard',
          columns: {
            columnVisibilityModel: {
              // Hide the column initially
              id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, { value: -1, label: 'All' }]}
        slots={{
          toolbar: () => (
            <CustomDataGridToolbar>
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
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => navigate(paths.administrator.sectors.create)}
              >
                Sector
              </Button>
            </CustomDataGridToolbar>
          ),
          noRowsOverlay: () => <>Blank</>,
          noResultsOverlay: () => <>Empty</>,
        }}
        slotProps={{
          columnsManagement: {
            getTogglableColumns,
          },
        }}
        sx={{
          [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' },
        }}
      />

      {/* AlertDialog Component */}
      <Dialog open={openDialog.value} onClose={openDialog.onFalse}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>Are you sure you want to delete this sector?</DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={openDialog.onFalse}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SectorsListView;

const hiddenFields = ['id', 'actions'];
const getTogglableColumns = (columns: GridColDef[]) =>
  columns.filter((column) => !hiddenFields.includes(column.field)).map((column) => column.field);
