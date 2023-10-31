import { useEffect, useState } from "react";
import { useSession, signOut, signIn } from "next-auth/react";

import {
  AppBar,
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { MenuRounded } from "@mui/icons-material";

export function Menu() {
  const { data, status } = useSession();

  const [isOpen, setIsOpen] = useState();

  function handleOnClick() {
    setIsOpen(true);
  }

  function handleOnClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (status !== "loading" && status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={handleOnClick}>
            <MenuRounded />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer open={isOpen} anchor="left" PaperProps={{ sx: { width: "80%" } }} onClose={handleOnClose}>
        <Box sx={{ paddingX: 2, paddingY: 3, bgcolor: (theme) => theme.palette.primary.main }}>
          <Avatar src={data?.user?.image} />
          <Typography variant="h5" color="common.white" sx={{ mt: 2 }}>
            {data?.user.name}
          </Typography>
        </Box>

        <Divider />

        <ListItem>
          <ListItemButton>
            <ListItemText primary="Roteiro" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemText primary="Encontro" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemText primary="Usuários" />
          </ListItemButton>
        </ListItem>

        <Divider />

        {data && (
          <ListItem>
            <ListItemButton onClick={signOut}>
              <ListItemText primary="Sair" primaryTypographyProps={{ color: "error.dark" }} />
            </ListItemButton>
          </ListItem>
        )}
      </Drawer>
    </>
  );
}
