import { FormProvider, useForm } from "react-hook-form";

import { Button, Stack } from "@mui/material";

import { Input } from "../Input";

export function EventForm({ onSubmit, defaultValues }) {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="title" label="Nome do evento" />

        <Input.Time name="startDate" label="Início" defaultValue={null} />

        <Input.Time name="endDate" label="Fim" defaultValue={null} />

        <Stack direction="row" justifyContent="flex-end">
          <Button sx={{ mt: 4 }} type="submit" variant="contained">
            Salvar
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
