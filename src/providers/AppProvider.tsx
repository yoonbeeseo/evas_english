import { AuthProvider } from "./contexts";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProvider;
