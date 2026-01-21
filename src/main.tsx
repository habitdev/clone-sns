import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router";

// 일반적인 개발 환경 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 5 * 60 * 1000, // 메모리에서 캐시를 아예 지워버리는 gcTime은 보통 여유있게 설정한다
      refetchOnMount: true,
      refetchOnWindowFocus: false, // 창 포커스 시 refetch 안함
      refetchOnReconnect: false, // 재연결 시 refetch 안함
      refetchInterval: false, // 주기적으로 refetch 안함
    },
  },
});

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
  // </StrictMode>,
);
