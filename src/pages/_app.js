import { SessionProvider } from "next-auth/react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

import { CacheProvider } from "@emotion/react";

import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { theme } from "../lib/materialUi";
import createEmotionCache from "../lib/emotion";

import { trpc } from "../ultis/trpc";

const clientSideEmotionCache = createEmotionCache();

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const queryClient = new QueryClient();

  const { session } = pageProps;

  return (
    <SessionProvider session={session}>
      <CacheProvider value={emotionCache}>
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
          <QueryClientProvider client={queryClient}>
            <MuiThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </QueryClientProvider>
        </LocalizationProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
