import { FormProvider, useForm } from "react-hook-form";

import { Box, Button, Stack, Typography } from "@mui/material";

import { Input } from "../Input";

export function EventForm({ mode = "create", onSubmit, defaultValues }) {
  const methods = useForm();

  function getDefaultValueOrNull(value) {
    return value ? value : null;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="title" label="Nome do evento" defaultValue={getDefaultValueOrNull(defaultValues?.title)} />

        <Input.Time name="startDate" label="Início" defaultValue={getDefaultValueOrNull(defaultValues?.startDate)} />

        <Input.Time name="endDate" label="Fim" defaultValue={getDefaultValueOrNull(defaultValues?.endDate)} />

        {mode === "edit" && (
          <Box mt={3}>
            <Typography variant="caption" sx={{ ml: 2 }} color="text.secondary">
              Minutos
            </Typography>

            <Box mt={1} mx={1}>
              <Input.Slider name="minutes" label="Minutos" defaultValue={0} />
            </Box>
          </Box>
        )}

        <Stack direction="row" justifyContent="flex-end">
          <Button sx={{ mt: 4 }} type="submit" variant="contained">
            Salvar
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
