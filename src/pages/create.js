import { FormProvider, useForm } from "react-hook-form";

import { ArrowBackRounded } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";

import { Input } from "../components/Input";

import { createEvent } from "../api";

import { removeSeconds } from "../ultis/date";

export default function Create() {
  const methods = useForm();

  const { push } = useRouter();

  const createEventMutation = useMutation(createEvent);

  async function handleSave(values) {
    const data = {
      ...values,
      startDate: removeSeconds(values.startDate),
      endDate: removeSeconds(values.endDate),
    };

    await createEventMutation.mutateAsync(data);

    push("/");
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <IconButton component="a" size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
              <ArrowBackRounded />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <Box bgcolor="background.default" p={2}>
        <Typography variant="h3">Novo evento</Typography>
        <Typography color="text.secondary">Adicione acessos, palestras ou peças</Typography>

        <Box mt={1}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleSave)}>
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
        </Box>
      </Box>
    </Box>
  );
}
