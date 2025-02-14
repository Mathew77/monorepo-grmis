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

import { CountrySchema } from 'src/types/admin/Country';

import { countryApis } from './apis/country-apis';

export type countrySchemaType = Omit<Zod.infer<typeof CountrySchema>, 'createDate' | 'updateDate'>;



const CountryDetailsView: React.FC = () => {
  const { id } = useParams<{ id?: string }>();

  // Fetch country details
  const { data: country, isLoading: isQueryLoading } = useQuery({
    queryKey: ['CountryDetails', id],
    queryFn: () =>  countryApis.details(id!), // The query function
    enabled: !!id, // Only fetch if `id` exists
    retry: 3
  });

  const defaultValues = useMemo(
    () => ({
      name: '',
      description: '',
    } as unknown as countrySchemaType),
    []
  );

  const methods = useForm<countrySchemaType>({
    mode: 'all',
    resolver: zodResolver(CountrySchema),
    defaultValues,
    values: country?.data || undefined, // `undefined` will let RHF use defaultValues
  });

  const {
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await  countryApis.post(data);
      toast.success('Details saved successfully');
      navigate(paths.administrator.country.root);
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
            <Grid size={12}>
              <CustomFieldLabel label="Name *">
                <Field.Text name="name" placeholder="Name" />
              </CustomFieldLabel>
            </Grid>
            <Grid size={12}>
              <CustomFieldLabel label="Code">
                <Field.Text name="code" placeholder="Code" />
              </CustomFieldLabel>
            </Grid>
            <Grid size={12}>
              <CustomFieldLabel label="Short Name">
                <Field.Text name="shortName" placeholder="Short Name" />
              </CustomFieldLabel>
            </Grid>
            <Grid size={12}>
              <CustomFieldLabel label="Description">
                <Field.Text name="description" multiline rows={4} placeholder="Description" />
              </CustomFieldLabel>
            </Grid>

            {/* Buttons */}
            <Grid size={12} display="flex" justifyContent="flex-end" gap={2}>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => navigate(paths. administrator.country.root)}
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

export default CountryDetailsView;
