import { Button } from "@/components/ui/button";
import useDeleteTodoMutation from "@/hooks/mutations/use-delete-todo-mutation";
import useUpdateTodoMutation from "@/hooks/mutations/use-update-todo-mutation";
import { useTodoDataById } from "@/hooks/queries/use-todo-data-by-id";
import { Link } from "react-router";

export default function TodoItem({ id }: { id: string }) {
  const { data: todo } = useTodoDataById(id, "LIST");

  if (!todo) {
    throw new Error("Todo not found");
  }
  const { content, isDone } = todo;

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
        <input
          disabled={isDeleteTodoPending}
          onClick={handleCheckboxClick}
          type={"checkbox"}
          checked={isDone}
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
