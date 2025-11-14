"use client";

import AuthProvider from "@/contexts/react/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const client = new QueryClient({});
const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default AppProvider;
