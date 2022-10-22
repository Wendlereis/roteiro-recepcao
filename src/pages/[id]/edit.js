import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { addMinutes } from "date-fns";

import { ArrowBackRounded } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { useMutation } from "@tanstack/react-query";

import { removeSeconds } from "../../ultis/date";

import { EventForm } from "../../components/EventForm";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

import { deleteEvent, editEvent, editEventsDuration } from "../../api";

import { getEventById } from "../api/roteiro";

export default function Edit({ event }) {
  const [values, setValues] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState();

  const { push } = useRouter();

  const editEventMutation = useMutation(editEvent);

  const deleteEventMutation = useMutation(deleteEvent);

  const editEventsDurationMutation = useMutation(editEventsDuration);

  function toggleDialog() {
    setIsDialogOpen(!isDialogOpen);
  }

  function handleSubmit(values) {
    setValues(values);
    setIsDialogOpen(!isDialogOpen);
  }

  async function handleSave() {
    const data = {
      ...values,
      id: event._id,
      startDate: removeSeconds(new Date(values.startDate)),
      endDate: removeSeconds(new Date(values.endDate)),
    };

    if (data.minutes !== 0) {
      await editEventMutation.mutateAsync({
        ...data,
        endDate: addMinutes(data.endDate, data.minutes),
      });

      const { endDate, minutes } = data;

      await editEventsDurationMutation.mutateAsync({ endDate, minutes });
    } else {
      await editEventMutation.mutateAsync(data);
    }

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
        <Typography variant="h3">Editar evento</Typography>
        <Typography color="text.secondary">Altere acessos, palestras ou peças</Typography>

        <Box mt={1}>
          <EventForm mode="edit" onSubmit={handleSubmit} defaultValues={event} />
        </Box>
      </Box>

      <ConfirmationDialog open={isDialogOpen} onConfirm={handleSave} onClose={toggleDialog} />
    </Box>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const event = await getEventById(params.id);

  return {
    props: { event },
  };
}
