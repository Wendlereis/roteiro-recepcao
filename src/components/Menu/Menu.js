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
import { useRouter } from "next/router";

export function Menu({ label }) {
  const { data, status } = useSession();

  const { push } = useRouter();

  const { isAdmin, isManager } = usePermission();

  const [isOpen, setIsOpen] = useState();

  const isAuthenticated = status === "authenticated";

  function handleOnClick() {
    setIsOpen(true);
  }

  function handleOnClose() {
    setIsOpen(false);
  }

  async function handleOnSignOutClick() {
    await push("/");
    signOut();
  }

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: 'common.white', color: 'text.primary' }}>
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
                  onClick={handleOnSignOutClick}
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
            <ListItem>
              <ListItemButton>
                <Link href="/">
                  <ListItemText primary="Roteiro" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <Link href="/editions">
                  <ListItemText primary="Encontros" />
                </Link>
              </ListItemButton>
            </ListItem>

            <ListItem>
              <ListItemButton>
                <Link href="/users">
                  <ListItemText primary="Usuários" />
                </Link>
              </ListItemButton>
            </ListItem>
          </>
        )}

        {isAuthenticated && (
          <>
            <Divider />

            <ListItem>
              <ListItemButton onClick={handleOnSignOutClick}>
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
