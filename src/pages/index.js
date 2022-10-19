import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useMutation } from "@tanstack/react-query";

import { Button, Dialog, Fab, Slider, Typography } from "@mui/material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { Input } from "../components/Input";

import { createEvent, editEvent } from "../api";

import { getEventos } from "./api/roteiro";
import { addMinutes } from "date-fns";

const currentDate = "2022-10-16";

function Appointment({ children, ...rest }) {
  const [appointment, setAppointment] = useState();

  const editEventMutation = useMutation(editEvent);

  const methods = useForm();

  function handleDialogClose() {
    setAppointment(undefined);
  }

  function handleSave(values) {
    const data = {
      id: appointment.id,
      ...values,
    };

    if (values.minutes !== 0) {
      data.endDate = addMinutes(new Date(values.endDate), values.minutes);
    }

    editEventMutation.mutate(data);
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

        <DayView startDayHour={0} endDayHour={24} cellDuration={60} />

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
