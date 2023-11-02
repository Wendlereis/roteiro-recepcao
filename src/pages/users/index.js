import { Container, Fab, IconButton, Link, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import { PersonRemoveAlt1Rounded, PersonAddAlt1Rounded } from "@mui/icons-material";
import { Menu } from "../../components/Menu/Menu";

export default function Users() {
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
          <ListItem divider>
            <ListItemText primary="Dirigente 1" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 2" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 3" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 4" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 5" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 6" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 7" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 8" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem divider>
            <ListItemText primary="Dirigente 9" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>

          <ListItem>
            <ListItemText primary="Dirigente 10" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded />
            </IconButton>
          </ListItem>
        </List>

        <Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1 }}>
            10 de 10 disponíveis
          </Typography>
        </Stack>

        <Typography variant="h6" sx={{ mt: 3 }}>
          Equipistas da recepção
        </Typography>

        <List>
          <ListItem divider>
            <ListItemText primary="Equipista 1" secondary="example@domain.com" />

            <IconButton size="small">
              <PersonRemoveAlt1Rounded color="action" />
            </IconButton>
          </ListItem>

          <ListItem>
            <ListItemText primary="Equipista 2" secondary="example@domain.com" />

            <IconButton>
              <PersonRemoveAlt1Rounded color="action" />
            </IconButton>
          </ListItem>
        </List>

        <Stack>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 5 }}>
            2 de 2 disponíveis
          </Typography>
        </Stack>

        <Link href="/create">
          <Fab component="a" sx={{ position: "fixed", bottom: 16, right: 16 }} color="secondary">
            <PersonAddAlt1Rounded />
          </Fab>
        </Link>
      </Container>
    </>
  );
}
