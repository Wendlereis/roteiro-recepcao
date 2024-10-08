import { useRouter } from "next/router";

import * as yup from "yup";

import { Button, Container, MenuItem, Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, useForm } from "react-hook-form";

import { Menu } from "../../components/Menu/Menu";
import { Input } from "../../components/Input";

import { createUser } from "../../api/user";
import { useUsers } from "../../hook/useUsers";

const schema = yup.object({
  name: yup.string().required("Campo obrigatório"),
  email: yup
    .string()
    .email("Insira um e-mail válido")
    .required("Campo obrigatório"),
  role: yup.string().required("Campo obrigatório"),
});

export default function CreateUser() {
  const { users } = useUsers();

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { push } = useRouter();

  const addUserMutation = useMutation(createUser);

  const hasManagerSeatsAvailable = users?.managers.metadata.seatsAvailable;
  const hasTeamMemberSeatsAvailable =
    users?.teamMembers.metadata.seatsAvailable;

  async function onSubmit(values) {
    await addUserMutation.mutateAsync(values);

    push("/users");
  }

  return (
    <>
      <Menu />

      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Adicionar usuário
        </Typography>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input name="name" label="Nome" />

            <Input name="email" label="E-mail" />

            <Input name="role" label="Permissão" select>
              {hasManagerSeatsAvailable && (
                <MenuItem value="dirigente">Dirigente</MenuItem>
              )}
              {hasTeamMemberSeatsAvailable && (
                <MenuItem value="equipista">Equipista</MenuItem>
              )}
            </Input>

            <Stack direction="row" justifyContent="flex-end">
              <Button
                sx={{ mt: 4 }}
                type="submit"
                variant="contained"
                color="secondary"
              >
                Adicionar
              </Button>
            </Stack>
          </form>
        </FormProvider>
      </Container>
    </>
  );
}
