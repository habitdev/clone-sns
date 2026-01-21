import { createTodo } from "@/api/create-todo";
import { QUERY_KEYS } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateTodoMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodo,
    onMutate: () => {},
    onSettled: () => {},
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [newTodo];
        return [...prevTodos, newTodo];
      });
      // 데이터 Refetch없이 변경된 데이터를 화면에 반영하는 방법
      // onSuccess는 매개변수로 반환된 데이터를 받을 수 있다.
    },
    onError: () => {},
  });
}
