import { TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";

import { Controller, useFormContext } from "react-hook-form";

export function Input({ name, label }) {
  const { control } = useFormContext();

  return <Controller name={name} control={control} render={({ field }) => <TextField label={label} {...field} />} />;
}

Input.Time = function InputTime({ name, label }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
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
