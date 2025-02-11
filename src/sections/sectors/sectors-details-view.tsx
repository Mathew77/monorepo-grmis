import { z as zod } from 'zod';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';

import Grid from '@mui/material/Grid2';
import { Box, Card, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';
import CustomFieldLabel from 'src/components/custom-form-field';

import { sectorsApis } from './apis/sectors-apis';

export type UpdateSectorSchemaType = Zod.infer<typeof UpdateSectorSchema>;

export const UpdateSectorSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
});

const SectorDetailsView: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  // Fetch sector details using React Query
  const { data: sector, isLoading: isQueryLoading } = useQuery({
    queryKey: ['sectorDetails', id],
    queryFn: () => sectorsApis.details(id!), // The query function
    enabled: !!id, // Only fetch if `id` exists
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    retry: 3, // Retry up to 3 times on failure (optional)
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
    }),
    []
  );

  const methods = useForm<UpdateSectorSchemaType>({
    mode: 'all',
    resolver: zodResolver(UpdateSectorSchema),
    defaultValues,
    values: sector || undefined, // `undefined` will let RHF use defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await (id ? sectorsApis.update(data, id) : sectorsApis.post(data));

      toast.success('Details saved successfully');
      navigate(paths.administrator.sectors.root);
    } catch (error) {
      console.error(error);
    }
  });

  const navigate = useNavigate();
  return (
    <Card sx={{ p: 0 }}>
      <Box
        gridColumn={1}
        p={2}
        sx={{
          rowGap: 1,
          columnGap: 1,
          display: 'grid',
        }}
      >
        <Form methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            {/* Sector Name */}
            <Grid size={12}>
              <CustomFieldLabel label="Name *">
                <Field.Text name="name" placeholder="Name" />
              </CustomFieldLabel>
            </Grid>

            {/* Description */}
            <Grid size={12}>
              <CustomFieldLabel label="Description *">
                <Field.Text name="description" multiline rows={4} placeholder="Description" />
              </CustomFieldLabel>
            </Grid>

            {/* Buttons */}
            <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate(paths.administrator.sectors.root)}
              >
                Cancel
              </Button>
              <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
                Save
              </LoadingButton>
            </Grid>
          </Grid>
        </Form>
      </Box>
    </Card>
  );
};

export default SectorDetailsView;
