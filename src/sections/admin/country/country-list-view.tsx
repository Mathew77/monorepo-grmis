import type { GridColDef } from '@mui/x-data-grid';

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

import { formatDate } from 'src/utils/format-time';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import CustomDataGridToolbar from 'src/components/custom-datagrid-toolbar';
import { GridActionsLinkItem } from 'src/components/custom-grid-action-link-item';

import { countryApis } from './apis/country-apis';

const CountryListView = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const openDialog = useBoolean(false);
  const [selectedId, setSelectedId] = useState<string | null>(null); // Track the selected ID

  // Fetch currencies details using React Query
  const { data: countries, isLoading: isQueryLoading } = useQuery({
    queryKey: ['CountryList', pagination],
    queryFn: () => countryApis.list(pagination.pageNumber, pagination.pageSize),
    retry: 3,
  });

  // Single function to update pagination state
  const handlePaginationChange = (model: { page?: number; pageSize?: number }) => {
    setPagination((prev) => ({
      pageNumber: model.page !== undefined ? model.page + 1 : prev.pageNumber, // Convert to 1-based index
      pageSize: model.pageSize || prev.pageSize,
    }));
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => countryApis.delete(id),
  });

  // Handle delete action
  const handleDelete = async () => {
    if (selectedId) {
      try {
        await deleteMutation.mutateAsync(selectedId);
        toast.success('Country deleted successfully');
        queryClient.invalidateQueries({ queryKey: ['CountryList'] }); // Refresh the sector list
        openDialog.onFalse(); // Close the dialog
      } catch (error: any) {
        console.error('Error deleting country:', error);
        toast.error('Failed to delete country');
      }
    }
  };

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'id', headerName: 'ID', flex: 1, hideable: false },
      { field: 'name', headerName: 'Name', flex: 2 },
      { field: 'code', headerName: 'Name', flex: 2 },
      { field: 'shortName', headerName: 'Name', flex: 2 },
      { field: 'description', headerName: 'Description', flex: 4 },
      {
        field: 'createDate',
        headerName: 'Create Date',
        flex: 1,
        valueFormatter: (params) => formatDate(params as string),
      },
      {
        field: 'updateDate',
        headerName: 'Update Date',
        flex: 1,
        valueFormatter: (params) => formatDate(params as string),
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
            href={paths.administrator.country.edit(params.row.id)}
          />,
          <GridActionsLinkItem
            showInMenu
            icon={<Iconify icon="solar:pen-bold" />}
            label="Edit"
            href={paths.administrator.country.edit(params.row.id)}
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
        rows={countries?.data || []}
        columns={columns}
        loading={isQueryLoading}
        onRowClick={handleRowClick}
        onPaginationModelChange={handlePaginationChange}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
          density: 'standard',
          columns: {
            columnVisibilityModel: {
              id: false,
              description: false,
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
              </Box>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => navigate(paths.administrator.country.create)}
              >
                Country
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
        <DialogContent>Are you sure you want to delete this country?</DialogContent>
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

export default CountryListView;

const hiddenFields = ['id', 'actions'];
const getTogglableColumns = (columns: GridColDef[]) =>
  columns.filter((column) => !hiddenFields.includes(column.field)).map((column) => column.field);
