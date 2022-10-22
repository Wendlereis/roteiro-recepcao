import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";

import { useMutation } from "@tanstack/react-query";

import { Button, Dialog, DialogTitle, Fab, IconButton, Typography } from "@mui/material";
import { DeleteRounded, AddRounded } from "@mui/icons-material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { Input } from "../components/Input";
import { AppointmentDetail } from "../components/AppointmentDetail";

import { deleteEvent, editEvent, editEventsDuration } from "../api";

import { getEventos } from "./api/roteiro";
import { addMinutes } from "date-fns";

import { removeSeconds } from "../ultis/date";

const currentDate = "2022-10-16";

export default function Roteiro({ eventos }) {
  return (
    <div>
      <Scheduler data={eventos}>
        <ViewState />

        <DayView startDayHour={5} endDayHour={22} cellDuration={15} />

        <Appointments appointmentComponent={AppointmentDetail} />

        <CurrentTimeIndicator updateInterval={60000} />
      </Scheduler>

      <Link href="/create">
        <Fab component="a" sx={{ position: "fixed", bottom: 16, right: 16 }} color="primary">
          <AddRounded />
        </Fab>
      </Link>
    </div>
  );
}

// const editEventMutation = useMutation(editEvent);

// const deleteEventMutation = useMutation(deleteEvent);

// const editEventsDurationMutation = useMutation(editEventsDuration);

// const methods = useForm();

// async function handleSave(values) {
//   const data = {
//     ...values,
//     id: appointment.id,
//     startDate: removeSeconds(new Date(values.startDate)),
//     endDate: removeSeconds(new Date(values.endDate)),
//   };

//   if (data.minutes !== 0) {
//     await editEventMutation.mutateAsync({
//       ...data,
//       endDate: addMinutes(data.endDate, data.minutes),
//     });

//     const { endDate, minutes } = data;

//     await editEventsDurationMutation.mutateAsync({ endDate, minutes });
//   } else {
//     editEventMutation.mutate(data);
//   }
// }

// function handleDelete() {
//   deleteEventMutation.mutate({ id: appointment.id });
// }

{/* <DialogTitle>
<IconButton onClick={handleDelete}>Delete</IconButton>
</DialogTitle>

<Typography variant="h4">Editar evento</Typography>

<Typography variant="subtitle2">Adicione entrada, palestra ou peças</Typography>

<FormProvider {...methods}>
<form onSubmit={methods.handleSubmit(handleSave)}>
  <Input name="title" label="Nome do evento" defaultValue={appointment?.title} />

  <Input.Time name="startDate" label="Início" defaultValue={appointment?.startDate} />

  <Input.Time name="endDate" label="Fim" defaultValue={appointment?.endDate} />

  <Input.Slider name="minutes" label="Minutos" defaultValue={0} />

  <Button variant="outlined" onClick={handleDialogClose}>
    Cancelar
  </Button>

  <Button type="submit" variant="contained">
    Salvar
  </Button>
</form>
</FormProvider> */}

export async function getServerSideProps() {
  const eventos = await getEventos();

  return {
    props: {
      eventos,
    },
  };
}
