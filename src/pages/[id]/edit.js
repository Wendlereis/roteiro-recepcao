import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { addMinutes } from "date-fns";

import { ArrowBackRounded, DeleteRounded } from "@mui/icons-material";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { useMutation, useQuery } from "@tanstack/react-query";

import { buildEventDate, removeSeconds } from "../../ultis/date";

import { EventForm } from "../../components/EventForm";
import { ConfirmationDialog } from "../../components/ConfirmationDialog";

import {
  deleteEvent,
  editEvent,
  editEventsDuration,
  getEventById,
} from "../../api/event";
import { DeleteEventDialog } from "../../components/DeleteEventDialog";

export default function Edit() {
  const [values, setValues] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState();

  const { push, query } = useRouter();

  const { data: session } = useSession();

  const { data: getEventResponse } = useQuery(["event", query.id], () =>
    getEventById({ id: query.id })
  );

  const editEventMutation = useMutation(editEvent);

  const deleteEventMutation = useMutation(deleteEvent);

  const editEventsDurationMutation = useMutation(editEventsDuration);

  const { isLoading: isEditEventsMutation } = editEventMutation;
  const { isLoading: isEditEventsDurationMutation } =
    editEventsDurationMutation;
  const { isLoading: isDeleteEventMutation } = deleteEventMutation;

  const isMutationLoading =
    isEditEventsMutation ||
    isEditEventsDurationMutation ||
    isDeleteEventMutation;

  function toggleDialog() {
    setIsDialogOpen(!isDialogOpen);
  }

  function toggleDeleteDialog() {
    setIsDeleteDialogOpen(!isDeleteDialogOpen);
  }

  function handleSubmit(values) {
    setValues(values);
    setIsDialogOpen(!isDialogOpen);
  }

  async function handleDeleteOnConfirm() {
    await deleteEventMutation.mutateAsync({
      id: getEventResponse.data._id,
    });

    push("/");
  }

  async function handleSave() {
    const data = {
      ...values,
      id: getEventResponse.data._id,
      startDate: buildEventDate(
        values.day,
        removeSeconds(new Date(values.startDate))
      ),
      endDate: buildEventDate(
        values.day,
        removeSeconds(new Date(values.endDate))
      ),
      author: session?.user?.name,
      updatedAt: new Date().toISOString(),
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
          <Box display="flex" justifyContent="space-between" width="100%">
            <Link href="/">
              <IconButton
                component="a"
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
              >
                <ArrowBackRounded />
              </IconButton>
            </Link>

            <IconButton
              onClick={toggleDeleteDialog}
              size="large"
              color="inherit"
            >
              <DeleteRounded />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box bgcolor="background.default" p={2}>
        <Typography variant="h3">Editar evento</Typography>
        <Typography color="text.secondary">
          Altere acessos, palestras ou peças
        </Typography>

        {getEventResponse?.data && (
          <Box mt={1}>
            <EventForm
              mode="edit"
              onSubmit={handleSubmit}
              defaultValues={getEventResponse?.data}
            />
          </Box>
        )}
      </Box>

      <ConfirmationDialog
        open={isDialogOpen}
        onConfirm={handleSave}
        onClose={toggleDialog}
        isLoading={isMutationLoading}
      />

      <DeleteEventDialog
        open={isDeleteDialogOpen}
        onConfirm={handleDeleteOnConfirm}
        onClose={toggleDeleteDialog}
        isLoading={isMutationLoading}
      />
    </Box>
  );
}
