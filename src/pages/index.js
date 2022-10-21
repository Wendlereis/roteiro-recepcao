import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import Link from "next/link";

import { useMutation } from "@tanstack/react-query";

import { Button, Dialog, DialogTitle, Fab, IconButton, Typography } from "@mui/material";
import { DeleteRounded, AddRounded } from "@mui/icons-material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { Input } from "../components/Input";

import { deleteEvent, editEvent, editEventsDuration } from "../api";

import { getEventos } from "./api/roteiro";
import { addMinutes } from "date-fns";

import { removeSeconds } from "../ultis/date";

const currentDate = "2022-10-16";

function Appointment({ children, ...rest }) {
  const [appointment, setAppointment] = useState();

  const editEventMutation = useMutation(editEvent);

  const deleteEventMutation = useMutation(deleteEvent);

  const editEventsDurationMutation = useMutation(editEventsDuration);

  const methods = useForm();

  function handleDialogClose() {
    setAppointment(undefined);
  }

  async function handleSave(values) {
    const data = {
      ...values,
      id: appointment.id,
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
      editEventMutation.mutate(data);
    }
  }

  function handleDelete() {
    deleteEventMutation.mutate({ id: appointment.id });
  }

  function handleAppointmentSelect(appointment) {
    setAppointment(appointment.data);
  }

  return (
    <>
      <Appointments.Appointment onClick={handleAppointmentSelect} {...rest}>
        {children}
      </Appointments.Appointment>

      <Dialog open={!!appointment} onClose={handleDialogClose}>
        <DialogTitle>
          <IconButton onClick={handleDelete}>
            <DeleteRounded />
          </IconButton>
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
        </FormProvider>
      </Dialog>
    </>
  );
}

export default function Roteiro({ eventos }) {
  const [schedulerData, setSchedulerData] = useState(() =>
    eventos.map((evento, index) => ({
      ...evento,
      id: evento._id,
    }))
  );

  function handleAppointmentClick() {}

  return (
    <div>
      <Scheduler data={schedulerData}>
        <ViewState />

        <DayView startDayHour={5} endDayHour={22} cellDuration={15} />

        <Appointments appointmentComponent={Appointment} />

        <CurrentTimeIndicator updateInterval={60000} />
      </Scheduler>

      <Link href="/create">
        <Fab component="a" sx={{ position: "fixed", bottom: 16, right: 16 }} variant="extended" color="primary">
          <AddRounded />
        </Fab>
      </Link>
    </div>
  );
}

export async function getServerSideProps() {
  const eventos = await getEventos();

  return {
    props: {
      eventos,
    },
  };
}
