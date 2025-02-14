import type { Dayjs } from "dayjs";
import type { TextFieldProps } from "@mui/material";
import type { MobileTimePickerProps } from "@mui/x-date-pickers/MobileTimePicker";

import dayjs from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

type RHFMobileTimePickerProps = MobileTimePickerProps<Dayjs> & {
  name: string;
  placeholder?: string; // Allow placeholder to be passed
  ampm?: boolean; // Enable or disable 12-hour format
  slotProps?: {
    textField?: Partial<TextFieldProps>;
  };
};

export function RHFCustomMobileTimePicker({
  name,
  slotProps,
  placeholder = "Select time",
  ampm = true, // Default to 12-hour format
  ...other
}: RHFMobileTimePickerProps)
{
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MobileTimePicker
          {...field}
          value={field.value ? dayjs(field.value) : null} // Handle null or undefined values
          onChange={(newValue) => field.onChange(newValue ? dayjs(newValue).toISOString() : null)} // Ensure ISO format
          ampm={ampm}
          slotProps={{
            textField: {
              fullWidth: true,
              error: !!error,
              placeholder, // Pass the placeholder explicitly
              helperText: error?.message ?? slotProps?.textField?.helperText,
              ...slotProps?.textField,
            },
            ...slotProps,
          }}
          {...other}
        />
      )}
    />
  );
}
