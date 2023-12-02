import { Button, Container, Stack, Typography } from "@mui/material";
import { Menu } from "../../components/Menu/Menu";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import { trpc } from "../../ultis/trpc";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CreateEdition() {
  const methods = useForm();

  const { push } = useRouter();

  const mutation = trpc.edition.create.useMutation();

  async function onSubmit(edtion) {
    mutation.mutate({ ...edtion, active: true });
  }

  useEffect(() => {
    if (mutation.isSuccess) {
      push("/editions");
    }
  }, [mutation, push]);

  return (
    <>
      <Menu />

      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Adicionar encontro
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input name="name" label="Nome" />

            <Input.Date name="startDate" label="Sábado" defaultValue={null} />

            <Input.Date name="endDate" label="Domingo" defaultValue={null} />

            <Stack direction="row" justifyContent="flex-end">
              <Button sx={{ mt: 4 }} type="submit" variant="contained">
                Adicionar
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Container>
    </>
  );
}
