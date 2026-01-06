import { create } from "zustand";
import { combine } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// combine을 사용하는 이유:
// 첫번째로 넘기는 state의 타입이 자동으로 추론이 되기 때문이다
// 보통 set((store)부분을 오해하지 않도록 set((state)로 바꿔서 입력한다
// immer: 불변성 관리
// immer를 사용하면 set((state) => ({ count: state.count + 1 })); 대신에
// set((state) => state.count++); 를 사용할 수 있다 (속성애 직접 접근해서 값 변경 가능)
export const useCountStore = create(
  immer(
    combine({ count: 0 }, (set, get) => ({
      actions: {
        increaseOne: () => {
          // const count = get().count;
          // set({ count: count + 1 });

          // set((state) => ({ count: state.count + 1 }));

          set((state) => {
            state.count += 1;
          });
        },
        decreaseOne: () => {
          // set((state) => ({ count: state.count - 1 }));
          set((state) => {
            state.count -= 1;
          });
        },
      },
    })),
  ),
);

// 유지보수가 쉽도록
export const useCount = () => {
  const count = useCountStore((store) => store.count);

  return count;
};
export const useIncreaseCount = () => {
  const increase = useCountStore((store) => store.actions.increaseOne);
  return increase;
};
export const useDecreaseCount = () => {
  const decrease = useCountStore((store) => store.actions.decreaseOne);
  return decrease;
};
