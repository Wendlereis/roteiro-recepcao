import { SessionProvider } from "next-auth/react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";

import { CacheProvider } from "@emotion/react";

import CssBaseline from "@mui/material/CssBaseline";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
            <CssBaseline />
            <Component {...pageProps} />
          </QueryClientProvider>
        </LocalizationProvider>
      </CacheProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
