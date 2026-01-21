import { fetchTodoById } from "@/api/fetch-todo-by-id";
import { useQuery } from "@tanstack/react-query";

export function useTodoDataById(id: number) {
  return useQuery({
    queryFn: () => fetchTodoById(id), // 화살표 함수로 함수를 호출하면서 id값 전달
    queryKey: ["todos", id], // 각 id별로 캐시 데이터를 따로 보관하기 위해 배열에 Id추가
    staleTime: 5000, // 실시간이 중요한 서비스가 아니면 보통 5초에서 30초로 설정한다
    // refetchInterval: 1000, // 1초마다 refetch
    // refetchOnMount: false, // 마운트 시 refetch 안함
    // refetchOnWindowFocus: false, // 창 포커스 시 refetch 안함
    // refetchOnReconnect: false, // 재연결 시 refetch 안함
    // refetchInterval: false, // 주기적으로 refetch 안함
  });
}
