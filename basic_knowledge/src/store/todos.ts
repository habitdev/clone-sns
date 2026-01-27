import type { Todo } from "@/types";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: { todos: Todo[] } = {
  todos: [], // 빈 객체는 타입을 추론할 수 없기때문에 타입을 정의해준다
};

const useTodosStore = create(
  immer(
    combine(initialState, (set, get) => ({
      actions: {
        createTodo: (content: string) => {
          set((state) => {
            // immer를 적용했기때문에 push메서드도 사용가능하다
            state.todos.push({ id: String(new Date().getTime()), content });
          });
        },
        deleteTodo: (targetId: string) => {
          set((state) => {
            state.todos = state.todos.filter((todo) => todo.id !== targetId);
          });
        },
      },
    })),
  ),
);

export const useTodos = () => {
  const todos = useTodosStore((store) => store.todos);
  return todos;
};

export const useCreateTodo = () => {
  const createTodo = useTodosStore((store) => store.actions.createTodo);
  return createTodo;
};

export const useDeleteTodo = () => {
  const deleteTodo = useTodosStore((store) => store.actions.deleteTodo);
  return deleteTodo;
};
