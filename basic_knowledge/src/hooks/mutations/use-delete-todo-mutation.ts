import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTodoMutation() {
  // 삭제 이벤트는 낙관적 업데이트로 한다면
  // 실패할 경우 사라졌던 아이템이 다시 나타나서 사용성이 좋지 않다
  // 낙관적 업데이트도 안내를 잘한다면 사용할 수 있으므로 상황에 맞게 사용할 것

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedTodo) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.todo.detail(deletedTodo.id),
      });
      queryClient.setQueryData<String[]>(
        QUERY_KEYS.todo.list,
        (prevTodoIds) => {
          if (!prevTodoIds) return [];
          return prevTodoIds.filter((id) => id !== deletedTodo.id);
        },
      );
    },
    onError: () => {},
  });
}
