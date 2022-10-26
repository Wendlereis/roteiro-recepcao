import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { addMinutes } from "date-fns";

import { ArrowBackRounded } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";

import { removeSeconds } from "../../ultis/date";

import { EventForm } from "../../components/EventForm";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

import { deleteEvent, editEvent, editEventsDuration, getEventById } from "../../api/event";

export default function Edit() {
  const [values, setValues] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState();

  const { push, query } = useRouter();

  const { data: getEventResponse } = useQuery(["event", query.id], () => getEventById({ id: query.id }));

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
      id: getEventResponse.data._id,
      startDate: removeSeconds(new Date(values.startDate)),
      endDate: removeSeconds(new Date(values.endDate)),
    };

    console.log({ data });

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

        {getEventResponse?.data && (
          <Box mt={1}>
            <EventForm mode="edit" onSubmit={handleSubmit} defaultValues={getEventResponse?.data} />
          </Box>
        )}
      </Box>

      <ConfirmationDialog open={isDialogOpen} onConfirm={handleSave} onClose={toggleDialog} />
    </Box>
  );
}
