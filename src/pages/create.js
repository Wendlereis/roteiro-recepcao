import { ArrowBackRounded } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";

import { useMutation } from "@tanstack/react-query";

import { createEvent } from "../api";

import { removeSeconds } from "../ultis/date";
import { EventForm } from "../components/EventForm";

export default function Create() {
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
          <EventForm onSubmit={handleSave} />
        </Box>
      </Box>
    </Box>
  );
}
