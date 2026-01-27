import { Button } from "@/components/ui/button";
import { useDecreaseCount, useIncreaseCount } from "@/store/count";
export default function Controller() {
  const increment = useIncreaseCount();
  const decrement = useDecreaseCount();

  return (
    <div>
      <Button onClick={decrement}>-</Button>
      <Button onClick={increment}>+</Button>
    </div>
  );
}
