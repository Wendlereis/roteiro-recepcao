import { Slider, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

import { Controller, useFormContext } from "react-hook-form";

export function Input({ name, label, defaultValue, type, select, children }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          sx={{ mt: 3 }}
          label={label}
          type={type}
          select={select}
          {...field}
          error={!!error}
          helperText={error?.message}
          fullWidth
        >
          {children}
        </TextField>
      )}
    />
  );
}

Input.Time = function InputTime({ name, label, defaultValue }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TimePicker
          label={label}
          onChange={onChange}
          value={value}
          ampm={false}
          renderInput={(params) => (
            <TextField sx={{ mt: 3 }} {...params} fullWidth />
          )}
        />
      )}
    />
  );
};

Input.Slider = function InputTime({ name, label, defaultValue }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Slider
          min={-30}
          max={30}
          step={5}
          onChange={onChange}
          value={value}
          valueLabelDisplay="auto"
          marks
          fullWidth
        />
      )}
    />
  );
};

Input.Date = function InputTime({ name, label, defaultValue }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { onChange, value } }) => (
        <DatePicker
          label={label}
          onChange={onChange}
          value={value}
          renderInput={(params) => (
            <TextField sx={{ mt: 3 }} {...params} fullWidth />
          )}
        />
      )}
    />
  );
};
