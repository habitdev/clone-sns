import { Button } from "@/components/ui/button";
import { useCountStore } from "@/store/count";
export default function Controller() {
  const { increment, decrement } = useCountStore((store) => store.actions);

  return (
    <div>
      <Button onClick={decrement}>-</Button>
      <Button onClick={increment}>+</Button>
    </div>
  );
}
