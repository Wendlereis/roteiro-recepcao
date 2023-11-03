import { format, parseISO } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";

import { Box, Button, Stack, Typography, MenuItem } from "@mui/material";

import { getCategories } from "../../api/category";

import { Input } from "../Input";

import { edition } from "../../ultis/date";

export function EventForm({ mode = "create", onSubmit, defaultValues }) {
  const methods = useForm();

  const { data: getCategoriesResponse } = useQuery(["categories"], getCategories);

  const updatedAtFormatted = mode === "edit" && format(parseISO(defaultValues?.updatedAt), "dd/MM/yyyy hh:mm");

  function getDefaultValueOrNull(value) {
    return value ? value : null;
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input name="title" label="Nome do evento" defaultValue={getDefaultValueOrNull(defaultValues?.title)} />

        <Input name="color" label="Categoria" defaultValue={getDefaultValueOrNull(defaultValues?.color)} select>
          {getCategoriesResponse?.data?.map((category) => (
            <MenuItem key={category.color} value={category.color}>
              {category.name}
            </MenuItem>
          ))}
        </Input>

        <Input name="day" label="Dia" defaultValue={getDefaultValueOrNull(defaultValues?.day)} select>
          <MenuItem key={edition.startDate} value={edition.startDate}>
            Sábado
          </MenuItem>

          <MenuItem key={edition.endDate} value={edition.endDate}>
            Domingo
          </MenuItem>
        </Input>

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

        <Stack direction="row" justifyContent="flex-end" alignItems="center" mt={4} mb={6}>
          {mode === "edit" && (
            <Typography sx={{ fontStyle: "italic", mr: 2 }} variant="caption" color="text.secondary">
              Alterado por: {defaultValues.author} - {updatedAtFormatted}
            </Typography>
          )}

          <Button type="submit" variant="contained">
            Salvar
          </Button>
        </Stack>
      </form>
    </FormProvider>
  );
}
