import { ReactNode } from "react";
import { Slider, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

import { Controller, useFormContext } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  defaultValue?: string;
  select?: boolean;
  children?: ReactNode;
}

export function Input({
  name,
  label,
  defaultValue,
  select,
  children,
}: InputProps) {
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

type InputTimeProps = Omit<InputProps, "select" | "children">;

Input.Time = function InputTime({ name, label, defaultValue }: InputTimeProps) {
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

type InputSliderProps = Omit<InputProps, "select" | "children" | "label">;

Input.Slider = function InputSlider({ name, defaultValue }: InputSliderProps) {
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
        />
      )}
    />
  );
};

type InputDateProps = Omit<InputProps, "select" | "children">;

Input.Date = function InputDate({ name, label, defaultValue }: InputDateProps) {
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
