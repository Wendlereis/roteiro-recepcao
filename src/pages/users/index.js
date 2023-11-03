import { useMutation } from "@tanstack/react-query";

import { Container, Fab, IconButton, Link, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { PersonRemoveAlt1Rounded, PersonAddAlt1Rounded } from "@mui/icons-material";

import { deleteUser, getUsers } from "../../api/user";

import { useUsers } from "../../hook/useUsers";

import { Menu } from "../../components/Menu/Menu";

export default function Users() {
  const { users } = useUsers();

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      query.refetch();
    },
  });

  function handleOnDeleteUser(id) {
    return async () => {
      await deleteUserMutation.mutateAsync({ id });
    };
  }

  return (
    <>
      <Menu />

      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Usuários
        </Typography>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Dirigentes
        </Typography>

        <List>
          {users?.managers.result?.map((manager) => (
            <ListItem key={manager._id} divider>
              <ListItemText primary={manager.name} secondary={manager.email} />

              <IconButton size="small" onClick={handleOnDeleteUser(manager._id)}>
                <PersonRemoveAlt1Rounded />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {users?.managers.metadata.size} de 10 disponíveis
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Equipistas da recepção
        </Typography>

        <List>
          {users?.teamMembers.result?.map((teamMember) => (
            <ListItem key={teamMember._id} divider>
              <ListItemText primary={teamMember.name} secondary={teamMember.email} />

              <IconButton size="small" onClick={handleOnDeleteUser(teamMember._id)}>
                <PersonRemoveAlt1Rounded color="action" />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 5 }}>
            {users?.teamMembers?.metadata.size} de 2 disponíveis
          </Typography>
        </Stack>

        <Link href="/users/create">
          <Fab component="a" sx={{ position: "fixed", bottom: 16, right: 16 }} color="secondary">
            <PersonAddAlt1Rounded />
          </Fab>
        </Link>
      </Container>
    </>
  );
}
