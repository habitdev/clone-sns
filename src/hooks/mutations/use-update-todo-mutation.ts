import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
      // 낙관적 업데이트 중에 다시 조회하는 경우 데이터의 값이 꼬일 수 있으므로
      // 업데이트가 완전히 종료되기 전에 조회하는 요청이 들어올 경우 이 요청을 취소시킨다

      const prevTodos = queryClient.getQueryData<Todo[]>(QUERY_KEYS.todo.list);
      queryClient.setQueryData<Todo[]>(QUERY_KEYS.todo.list, (prevTodos) => {
        if (!prevTodos) return [];
        return prevTodos.map((prevTodo) =>
          prevTodo.id === updatedTodo.id
            ? { ...prevTodo, ...updatedTodo }
            : prevTodo,
        );
      });

      return { prevTodos };
    },
    onError: (error, variables, context) => {
      // 낙관적 업데이트를 하고 요청이 실패했을 경우 원래 데이터로 적용해준다
      if (context && context.prevTodos) {
        queryClient.setQueryData<Todo[]>(
          QUERY_KEYS.todo.list,
          context.prevTodos,
        );
      }
    },
    onSettled: () => {
      // 서버와 동일한 데이터가 동일한지(무결성) 확인하기 위해 다시 조회한다
      // 캐시를 지워서 리페칭 시킨다
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.todo.list,
      });
    },
  });
}
