import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useMutation, useQuery } from "@tanstack/react-query";

import { Button, Dialog, Fab, Typography } from "@mui/material";

import { ViewState } from "@devexpress/dx-react-scheduler";
import { Scheduler, DayView, Appointments, CurrentTimeIndicator } from "@devexpress/dx-react-scheduler-material-ui";

import { Input } from "../components/Input";

import { createEvent } from "../api";

import { getEventos } from "./api/roteiro";

const currentDate = "2022-10-16";

const Appointment = ({ children, ...rest }) => {
  return <Appointments.Appointment {...rest}>{children}</Appointments.Appointment>;
};

export default function Roteiro({ eventos }) {
  const [isOpen, setIsOpen] = useState(false);

  const createEventMutation = useMutation(createEvent);

  const methods = useForm();

  const [schedulerData, setSchedulerData] = useState(() =>
    eventos.map((evento, index) => ({
      id: evento.id,
      startDate: evento.start,
      endDate: evento.end,
      title: evento.name,
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
            <Input name="name" label="Nome do evento" />

            <Input.Time name="start" label="Início" />

            <Input.Time name="end" label="Fim" />

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
