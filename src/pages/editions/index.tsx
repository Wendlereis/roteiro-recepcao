import React from "react";
import { trpc } from "../../ultis/trpc";
import { Menu } from "../../components/Menu/Menu";
import {
  Container,
  Fab,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { AddRounded } from "@mui/icons-material";
import { format } from "date-fns";

export default function Editions() {
  const edition = trpc.edition.get.useQuery();

  if (!edition.data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Menu />

      <Container>
        <Typography variant="h4" sx={{ mt: 4 }}>
          Encontros
        </Typography>

        <List>
          {edition.data.map((edition) => (
            <ListItem key={edition.id} divider>
              <ListItemText
                primary={edition.name}
                secondary={`${format(
                  new Date(edition.startDate),
                  "dd/MM/yyyy"
                )} - ${format(new Date(edition.endDate), "dd/MM/yyyy")}`}
              />
            </ListItem>
          ))}
        </List>

        <Link href="/editions/create">
          <Fab
            component="a"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            color="secondary"
          >
            <AddRounded />
          </Fab>
        </Link>
      </Container>
    </>
  );
}
