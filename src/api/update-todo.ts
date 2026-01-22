import { API_URL } from "@/lib/constants";
import type { Todo } from "@/types";

// Partial<Todo> : Todo의 모든 프로퍼티가 optional이 됨
export async function updateTodo(todo: Partial<Todo> & { id: string }) {
  const response = await fetch(`${API_URL}/todos/${todo.id}`, {
    method: "PATCH",
    body: JSON.stringify(todo),
  });

  if (!response.ok) throw new Error("update todo failed");
  const data: Todo = await response.json();
  return data;
}
