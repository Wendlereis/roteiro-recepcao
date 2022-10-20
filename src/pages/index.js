import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { Button, Dialog, DialogTitle, Fab, IconButton, Typography } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { Input } from "../components/Input";

import { createEvent, deleteEvent, editEvent, editEventsDuration } from "../api";

import { getEventos } from "./api/roteiro";
import { addMinutes } from "date-fns";

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
      id: appointment.id,
      ...values,
    };

    if (values.minutes !== 0) {
      console.log("COM MINUTOS");
      await editEventMutation.mutateAsync({
        ...data,
        endDate: addMinutes(new Date(values.endDate), values.minutes),
      });

      const { endDate, minutes } = data;

      await editEventsDurationMutation.mutateAsync({ endDate, minutes });
    } else {
      console.log("SEM MINUTOS");
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
  const [isOpen, setIsOpen] = useState(false);

  const createEventMutation = useMutation(createEvent);

  const methods = useForm();

  const [schedulerData, setSchedulerData] = useState(() =>
    eventos.map((evento, index) => ({
      ...evento,
      id: evento._id,
    }))
  );

  function handleAppointmentClick() {
    setIsOpen(true);
  }

  function handleDialogClose() {
    setIsOpen(false);
  }

  function handleSave(values) {
    createEventMutation.mutate(values);
  }

  return (
    <div>
      <Scheduler data={schedulerData}>
        <ViewState />

        <DayView startDayHour={5} endDayHour={22} cellDuration={15} />

        <Appointments appointmentComponent={Appointment} />

        <CurrentTimeIndicator updateInterval={1000} />
      </Scheduler>

      <Dialog open={isOpen} onClose={handleDialogClose}>
        <Typography variant="h4">Criar evento</Typography>

        <Typography variant="subtitle2">Adicione entrada, palestra ou peças</Typography>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSave)}>
            <Input name="title" label="Nome do evento" />

            <Input.Time name="startDate" label="Início" />

            <Input.Time name="endDate" label="Fim" />

            <Button variant="outlined" onClick={handleDialogClose}>
              Cancelar
            </Button>

            <Button type="submit" variant="contained">
              Salvar
            </Button>
          </form>
        </FormProvider>
      </Dialog>

      <Fab color="primary" variant="extended" onClick={handleAppointmentClick}>
        Criar evento
      </Fab>
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
