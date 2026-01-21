import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
        // todo 리스트의 캐시 데이터를 무효화해서 데이터를 다시 불러오게 한다(새로고침 효과)
        // 데이터가 너무 많거나 자주 refetching을 할 경우 서버에 부하가 일어날 수 있다
      });
    },
    onError: () => {},
  });
}
