import { fetchTodos } from "@/api/fetch-todos";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useTodosData() {
  const queryClient = useQueryClient();

  return useQuery({
    queryFn: async () => {
      const todos = await fetchTodos();

      // 여러개의 todo 데이터를 각각의 캐시로 저장
      todos.forEach((todo) => {
        queryClient.setQueryData<Todo>(QUERY_KEYS.todo.detail(todo.id), todo);
      });

      return todos.map((todo) => todo.id); // 각 todo의 id만 반환
    },
    queryKey: QUERY_KEYS.todo.list,
    // retry: 0 // 재시도 횟수 지정
  });
}
