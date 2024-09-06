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
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { MenuRounded, LoginRounded, LogoutRounded } from "@mui/icons-material";

import { usePermission } from "../../hook/usePermission";

export function Menu({ label }) {
  const { data, status } = useSession();

  const { isAdmin, isManager } = usePermission();

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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            {isAdmin && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleOnClick}
              >
                <MenuRounded />
              </IconButton>
            )}

            {label && <Typography variant="h6">{label}</Typography>}

            {!isAuthenticated && (
              <Box alignSelf="flex-end">
                <Button
                  color="inherit"
                  startIcon={<LoginRounded />}
                  onClick={signIn}
                >
                  Entrar
                </Button>
              </Box>
            )}

            {!isAdmin && isAuthenticated && (
              <Box alignSelf="flex-end">
                <Button
                  color="inherit"
                  startIcon={<LogoutRounded />}
                  onClick={signOut}
                >
                  Sair
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={isOpen}
        anchor="left"
        PaperProps={{ sx: { width: "70%" } }}
        onClose={handleOnClose}
      >
        <Box
          sx={{
            paddingX: 2,
            paddingY: 3,
            bgcolor: (theme) => theme.palette.primary.main,
          }}
        >
          <Avatar src={data?.user?.image} />
          <Typography variant="h5" color="common.white" sx={{ mt: 2 }}>
            {data?.user.name}
          </Typography>
        </Box>

        <Divider />

        {isManager && (
          <>
            <Link href="/">
              <ListItem>
                <ListItemButton>
                  <ListItemText primary="Roteiro" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link href="/editions">
              <ListItem>
                <ListItemButton>
                  <ListItemText primary="Encontros" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link href="/users">
              <ListItem>
                <ListItemButton href="/users">
                  <ListItemText primary="Usuários" />
                </ListItemButton>
              </ListItem>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Divider />

            <ListItem>
              <ListItemButton onClick={signOut}>
                <ListItemIcon>
                  <LogoutRounded color="error" />
                </ListItemIcon>

                <ListItemText
                  primary="Sair"
                  primaryTypographyProps={{ color: "error", fontWeight: 500 }}
                />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </Drawer>
    </>
  );
}
