import { useState } from "react";

import {
  Container,
  Fab,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import {
  PersonRemoveAlt1Rounded,
  PersonAddAlt1Rounded,
} from "@mui/icons-material";

import { trpc } from "../../ultis/trpc";

import { useUsers } from "../../hook/useUsers";

import { Menu } from "../../components/Menu/Menu";
import { usePermission } from "../../hook/usePermission";

export default function Users() {
  const { users, refetch } = useUsers();

  const { isAdmin, isManager } = usePermission();

  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  const isCreateEnabled =
    isAdmin &&
    (users?.managers.metadata.seatsAvailable ||
      users?.teamMembers.metadata.seatsAvailable);

  const hasSingleManager = users?.managers?.metadata?.size <= 1;

  const deleteUserMutation = trpc.user.delete.useMutation({
    onSuccess: () => {
      setDeleteErrorMessage("");
      refetch();
    },
    onError: (error) => {
      const code = error?.data?.code;

      if (code === "CONFLICT") {
        return setDeleteErrorMessage(
          "Não é possível remover o último dirigente do sistema.",
        );
      }

      if (code === "FORBIDDEN") {
        return setDeleteErrorMessage(
          "Apenas dirigentes podem excluir usuários.",
        );
      }

      setDeleteErrorMessage("Não foi possível excluir o usuário.");
    },
  });

  function handleOnDeleteUser(user) {
    return async () => {
      setDeleteErrorMessage("");

      await deleteUserMutation.mutateAsync({ id: user._id });
    };
  }

  function isDeleteDisabled(user) {
    if (!isManager) {
      return true;
    }

    return user.role === "dirigente" && hasSingleManager;
  }

  return (
    <>
      <Menu />

      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Usuários
        </Typography>

        {!!deleteErrorMessage && (
          <Typography variant="body2" color="error.main" sx={{ mt: 2 }}>
            {deleteErrorMessage}
          </Typography>
        )}

        <Typography variant="h6" sx={{ mt: 3 }}>
          Dirigentes
        </Typography>

        <List>
          {users?.managers.result?.map((manager) => (
            <ListItem key={manager._id} divider>
              <ListItemText primary={manager.name} secondary={manager.email} />

              <IconButton
                size="small"
                color="primary"
                onClick={handleOnDeleteUser(manager)}
                disabled={isDeleteDisabled(manager)}
              >
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
              <ListItemText
                primary={teamMember.name}
                secondary={teamMember.email}
              />

              <IconButton
                size="small"
                color="primary"
                onClick={handleOnDeleteUser(teamMember)}
                disabled={isDeleteDisabled(teamMember)}
              >
                <PersonRemoveAlt1Rounded />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 5 }}>
            {users?.teamMembers?.metadata.size} de 2 disponíveis
          </Typography>
        </Stack>

        {isCreateEnabled && (
          <Link href="/users/create">
            <Fab
              component="a"
              sx={{ position: "fixed", bottom: 16, right: 16 }}
              color="secondary"
            >
              <PersonAddAlt1Rounded />
            </Fab>
          </Link>
        )}
      </Container>
    </>
  );
}
