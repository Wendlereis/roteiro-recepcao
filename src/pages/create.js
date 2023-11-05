import { ArrowBackRounded } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { useMutation } from "@tanstack/react-query";

import { EventForm } from "../components/EventForm";

import { createEvent } from "../api/event";

import { buildEventDate, removeSeconds } from "../ultis/date";

export default function Create() {
  const { push } = useRouter();

  const { data: session } = useSession();

  const createEventMutation = useMutation(createEvent);

  async function handleSave(values) {
    const data = {
      ...values,
      startDate: buildEventDate(values.day, removeSeconds(values.startDate)),
      endDate: buildEventDate(values.day, removeSeconds(values.endDate)),
      author: session?.user?.name,
      updatedAt: new Date().toISOString(),
    };

    await createEventMutation.mutateAsync(data);

    push("/");
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Link href="/">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <ArrowBackRounded />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>

      <Box bgcolor="background.default" p={2}>
        <Typography variant="h3">Novo evento</Typography>
        <Typography color="text.secondary">
          Adicione acessos, palestras ou peças
        </Typography>

        <Box mt={1}>
          <EventForm onSubmit={handleSave} />
        </Box>
      </Box>
    </Box>
  );
}
