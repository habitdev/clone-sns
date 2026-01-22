import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDeleteTodoMutation from "@/hooks/mutations/use-delete-todo-mutation";
import useUpdateTodoMutation from "@/hooks/mutations/use-update-todo-mutation";
import type { Todo } from "@/types";
import { Link } from "react-router";

export default function TodoItem({ id, content, isDone }: Todo) {
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo, isPending: isDeleteTodoPending } =
    useDeleteTodoMutation();
  const handleDeleteClick = () => {
    deleteTodo(id);
  };
  const handleCheckboxClick = () => {
    updateTodo({ id, isDone: !isDone });
  };
  return (
    <div className="flex items-center justify-between border p-2">
      <div className="flex gap-5">
        <Input
          type="checkbox"
          checked={isDone}
          onChange={handleCheckboxClick}
          disabled={isDeleteTodoPending}
        />
        <Link to={`/todolist/${id}`}>{content}</Link>
      </div>
      <Button
        onClick={handleDeleteClick}
        variant={"destructive"}
        disabled={isDeleteTodoPending}
      >
        삭제
      </Button>
    </div>
  );
}
