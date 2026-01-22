import { deleteTodo } from "@/api/delete-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteTodoMutation() {
  // 삭제 이벤트는 낙관적 업데이트로 한다면
  // 실패할 경우 사라졌던 아이템이 다시 나타나서 사용성이 좋지 않다
  // 낙관적 업데이트도 안내를 잘한다면 사용할 수 있으므로 상황에 맞게 사용할 것

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: (deletedTodo) => {
      // deleteTodo의 반환 값을 매개변수로 받아온다
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.filter((prevTodo) => prevTodo.id !== deletedTodo.id);
      });
    },
    onError: () => {},
  });
}
