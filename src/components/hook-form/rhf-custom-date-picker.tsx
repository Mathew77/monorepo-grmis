import type { Dayjs } from 'dayjs';
import type { TextFieldProps } from '@mui/material/TextField';
import type { DatePickerProps } from '@mui/x-date-pickers/DatePicker';

import dayjs from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';


// ----------------------------------------------------------------------

type RHFDatePickerProps = DatePickerProps<Dayjs> & {
  name: string;
  placeholder?: string; // Add placeholder prop for flexibility
  slotProps?: {
    textField?: Partial<TextFieldProps>;
  };
};

export function RHFCustomDatePicker({ name, placeholder = "Select a date", slotProps, ...other }: RHFDatePickerProps)
{
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          {...field}
          value={field.value ? dayjs(field.value) : null} // Handle null or undefined values
          onChange={(newValue) => field.onChange(newValue ? dayjs(newValue).toISOString() : null)} // Format to ISO
          slotProps={{
            ...slotProps,
            textField: {
              fullWidth: true,
              error: !!error,
              helperText: error?.message ?? slotProps?.textField?.helperText,
              placeholder, // Set the placeholder explicitly
              ...slotProps?.textField,
            },
          }}
          {...other}
        />
      )}
    />
  );
}