import { format, parseISO } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";

import { Box, Button, Stack, Typography, MenuItem } from "@mui/material";

import { getCategories } from "../../api/category";
import { trpc } from "../../ultis/trpc";

import { Input } from "../Input";

export function EventForm({ mode = "create", onSubmit, defaultValues }) {
  const methods = useForm();

  const { data: getCategoriesResponse } = useQuery(
    ["categories"],
    getCategories
  );

  const edition = trpc.edition.getByActive.useQuery();

  const updatedAtFormatted =
    mode === "edit" &&
    format(parseISO(defaultValues?.updatedAt), "dd/MM/yyyy HH:mm");

  function getDefaultValueOrNull(value) {
    return value ? value : null;
  }

  if (!edition.data) {
    return "loading...";
  }

  const startDateValue = new Date(edition.data.startDate).toISOString();
  const endDateValue = new Date(edition.data.endDate).toISOString();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input
          name="title"
          label="Nome do evento"
          defaultValue={getDefaultValueOrNull(defaultValues?.title)}
        />

        <Input
          name="color"
          label="Categoria"
          defaultValue={getDefaultValueOrNull(defaultValues?.color)}
          select
        >
          {getCategoriesResponse?.data?.map((category) => (
            <MenuItem key={category.color} value={category.color}>
              {category.name}
            </MenuItem>
          ))}
        </Input>

        <Input
          name="day"
          label="Dia"
          defaultValue={getDefaultValueOrNull(defaultValues?.day)}
          select
        >
          <MenuItem key={startDateValue} value={startDateValue}>
            Sábado
          </MenuItem>

          <MenuItem key={endDateValue} value={endDateValue}>
            Domingo
          </MenuItem>
        </Input>

        <Stack direction="row" gap={2}>
          <Input.Time
            name="startDate"
            label="Início"
            defaultValue={getDefaultValueOrNull(defaultValues?.startDate)}
          />

          <Input.Time
            name="endDate"
            label="Fim"
            defaultValue={getDefaultValueOrNull(defaultValues?.endDate)}
          />
        </Stack>

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

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          mt={4}
          mb={6}
        >
          {mode === "edit" && (
            <Typography
              sx={{ fontStyle: "italic", mr: 2 }}
              variant="caption"
              color="text.secondary"
            >
              Alterado por: {defaultValues.author} - {updatedAtFormatted}
            </Typography>
          )}

          <Button type="submit" variant="contained" color="secondary">
            Salvar
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
