import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient;

export const getQueryClient = () => {
  if (!queryClient) {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: 1,
          staleTime: 5 * 60 * 1000,
        },
      },
    });
  }
  return queryClient;
};
