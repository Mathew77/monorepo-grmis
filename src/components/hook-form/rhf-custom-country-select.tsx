import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { Box, Chip, Avatar, TextField, Autocomplete, InputAdornment } from '@mui/material';

import { countries as defaultCountries } from 'src/assets/data';

type Country = {
  label: string;
  code: string; // ISO 3166-1 alpha-2 country code for flag
};

type CountrySelectProps = {
  name: string;
  multiSelect?: boolean;
  maxSelections?: number;
  countries?: Country[];
  placeholder?: string;
};

const CountryAvatar = ({ code, label, size }: { code: string; label: string; size: number }) => (
  <Avatar
    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
    alt={label}
    sx={{ width: size, height: size }}
  />
);

export const RHFCustomCountrySelect: React.FC<CountrySelectProps> = ({
  name,
  multiSelect = true,
  maxSelections,
  countries = defaultCountries,
  placeholder = `Choose ${multiSelect && maxSelections != 1 ? `countries` : 'a country'}`,
}) => {
  const { control, setValue } = useFormContext();

  // Handles value transformation between field state and Autocomplete component
  const mapFieldValue = (fieldValue: string | string[] | undefined) => {
    if (multiSelect && Array.isArray(fieldValue)) {
      return fieldValue
        .map((label: string) => countries.find((country) => country.label === label))
        .filter((country): country is Country => !!country); // Filter out undefined values
    }
    if (!multiSelect && typeof fieldValue === 'string') {
      return countries.find((country) => country.label === fieldValue) || null;
    }
    return multiSelect ? [] : null; // Default values
  };

  // Updates the field value with selected labels
  const handleChange = (newValue: Country[] | Country | null) => {
    if (multiSelect) {
      const selectedCountries = newValue as Country[];
      if (maxSelections && selectedCountries.length > maxSelections) return; // Enforce max selection
      setValue(
        name,
        selectedCountries.map((option) => option.label),
        { shouldValidate: true }
      );
    } else {
      setValue(name, (newValue as Country)?.label || null, { shouldValidate: true });
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          multiple={multiSelect}
          value={mapFieldValue(field.value)}
          onChange={(event, newValue) => handleChange(newValue)}
          options={countries}
          isOptionEqualToValue={(option, value) => option?.label === value?.label}
          getOptionLabel={(option) => option?.label || ''}
          getOptionDisabled={(option) =>
            Array.isArray(field.value) && field.value.includes(option?.label || '')
          }
          renderTags={(value, getTagProps) =>
            multiSelect &&
            value.map((option, index) => {
              if (!option) return null; // Handle undefined option
              return (
                <Chip
                  label={option.label}
                  avatar={<CountryAvatar code={option.code} label={option.label} size={24} />}
                  {...getTagProps({ index })}
                  variant="outlined"
                  sx={{
                    backgroundColor: '#edeff1',
                    color: 'black',
                  }}
                />
              );
            })
          }
          renderInput={(params) => {
            const selectedCountry =
              !multiSelect && typeof field.value === 'string'
                ? countries.find((country) => country.label === field.value)
                : null;

            return (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                placeholder={placeholder}
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  startAdornment:
                    !multiSelect && selectedCountry ? (
                      <InputAdornment position="start">
                        <CountryAvatar
                          code={selectedCountry.code}
                          label={selectedCountry.label}
                          size={24}
                        />
                      </InputAdornment>
                    ) : (
                      params.InputProps.startAdornment
                    ),
                }}
              />
            );
          }}
          renderOption={(props, option) => {
            if (!option) return null; // Handle undefined option
            const isSelected = Array.isArray(field.value) && field.value.includes(option.label);
            return (
              <Box
                component="li"
                {...props}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor: isSelected ? 'rgba(0, 123, 255, 0.1)' : 'inherit',
                }}
              >
                <CountryAvatar code={option.code} label={option.label} size={20} />
                {option.label}
              </Box>
            );
          }}
        />
      )}
    />
  );
};
