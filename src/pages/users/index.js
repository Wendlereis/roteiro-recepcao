import { useQuery } from "@tanstack/react-query";

import { Container, Fab, IconButton, Link, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { PersonRemoveAlt1Rounded, PersonAddAlt1Rounded } from "@mui/icons-material";

import { getUsers } from "../../api/user";
import { Menu } from "../../components/Menu/Menu";

export default function Users() {
  const query = useQuery(["users"], getUsers);

  const data = query.data?.data;

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
          {data?.managers.result?.map((manager) => (
            <ListItem key={manager._id} divider>
              <ListItemText primary={manager.name} secondary={manager.email} />

              <IconButton size="small">
                <PersonRemoveAlt1Rounded />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            {data?.managers.metadata.size} de 10 disponíveis
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Equipistas da recepção
        </Typography>

        <List>
          {data?.teamMembers.result?.map((teamMember) => (
            <ListItem key={teamMember._id} divider>
              <ListItemText primary={teamMember.name} secondary={teamMember.email} />

              <IconButton size="small">
                <PersonRemoveAlt1Rounded color="action" />
              </IconButton>
            </ListItem>
          ))}
        </List>

        <Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 5 }}>
            {data?.teamMembers?.metadata.size} de 2 disponíveis
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
