import { updateTodo } from "@/api/update-todo";
import { QUERY_KEYS } from "@/lib/constants";
import type { Todo } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateTodoMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTodo,
    onMutate: async (updatedTodo) => {
      // 중복 요청 방지를 위해 이전에 요청한 내역을 취소한다
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.todo.detail(updatedTodo.id),
      });

      const prevTodo = queryClient.getQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
      );

      queryClient.setQueryData<Todo>(
        QUERY_KEYS.todo.detail(updatedTodo.id),
        (prevTodo) => {
          if (!prevTodo) return;
          return { ...prevTodo, ...updatedTodo };
        },
      );

      // 오류 발생 시 기존 값으로 다시 되돌리기 위해 기존 값 return
      return {
        prevTodo,
      };
    },
    onError: (error, variables, context) => {
      // 낙관적 업데이트를 하고 요청이 실패했을 경우 원래 데이터로 적용해준다
      if (context && context.prevTodo) {
        queryClient.setQueryData<Todo>(
          QUERY_KEYS.todo.detail(context.prevTodo.id),
          context.prevTodo,
        );
      }
    },
  });
}

// onSettled에서 캐시를 무효화해도 detail의 캐시는 disabled이므로 다시 불러오지 않는다
// 따라서 삭제
