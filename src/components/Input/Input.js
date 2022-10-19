import { Slider, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

import { Controller, useFormContext } from "react-hook-form";

export function Input({ name, label, defaultValue, type }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field }) => <TextField label={label} type={type} {...field} />}
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
          renderInput={(params) => <TextField {...params} />}
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
        <Slider min={-30} max={30} step={5} onChange={onChange} value={value} marks valueLabelDisplay="auto" />
      )}
    />
  );
};
