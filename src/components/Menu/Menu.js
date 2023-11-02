import { useState } from "react";

import Link from "next/link";
import { useSession, signOut, signIn } from "next-auth/react";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { MenuRounded, LoginRounded } from "@mui/icons-material";

export function Menu() {
  const { data, status } = useSession();

  const [isOpen, setIsOpen] = useState();

  const isAuthenticated = status === "authenticated";

  function handleOnClick() {
    setIsOpen(true);
  }

  function handleOnClose() {
    setIsOpen(false);
  }

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Box display="flex" justifyContent="space-between" width="100%">
            {isAuthenticated && (
              <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={handleOnClick}>
                <MenuRounded />
              </IconButton>
            )}

            {!isAuthenticated && (
              <Box alignSelf="flex-end">
                <Button color="inherit" startIcon={<LoginRounded />} onClick={signIn}>
                  Entrar
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {isAuthenticated && (
        <Drawer open={isOpen} anchor="left" PaperProps={{ sx: { width: "80%" } }} onClose={handleOnClose}>
          <Box sx={{ paddingX: 2, paddingY: 3, bgcolor: (theme) => theme.palette.primary.main }}>
            <Avatar src={data?.user?.image} />
            <Typography variant="h5" color="common.white" sx={{ mt: 2 }}>
              {data?.user.name}
            </Typography>
          </Box>

          <Divider />

          <ListItem>
            <ListItemButton LinkComponent={Link} href="/">
              <ListItemText primary="Roteiro" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton LinkComponent={Link} href="/events">
              <ListItemText primary="Encontro" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton LinkComponent={Link} href="/users">
              <ListItemText primary="Usuários" />
            </ListItemButton>
          </ListItem>

          {data && (
            <>
              <Divider />

              <ListItem>
                <ListItemButton onClick={signOut}>
                  <ListItemText primary="Sair" primaryTypographyProps={{ color: "error.dark" }} />
                </ListItemButton>
              </ListItem>
            </>
          )}
        </Drawer>
      )}
    </>
  );
}