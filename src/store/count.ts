import { create } from "zustand";
import { combine } from "zustand/middleware";

/*
interface Store {
  count: number;
  // actions로 감싸면 하나로 불러와서 사용할 수 있다
  // 규모가 있는 경우 액션을 내부에 작성하면 유지보수가 어려워 잘 사용하지 않음
  actions: {
    increaseOne: () => void;
    decreaseOne: () => void;
  };
}
*/

// combine을 사용하는 이유:
// 첫번째로 넘기는 state의 타입이 자동으로 추론이 되기 때문이다
// 보통 set((store)부분을 오해하지 않도록 set((state)로 바꿔서 입력한다
export const useCountStore = create(
  combine({ count: 0 }, (set, get) => ({
    actions: {
      increaseOne: () => {
        // const count = get().count;
        // set({ count: count + 1 });

        set((state) => ({ count: state.count + 1 }));
      },
      decreaseOne: () => {
        set((state) => ({ count: state.count - 1 }));
      },
    },
  })),
);

/*
export const useCountStore = create<Store>((set, get) => ({
  count: 0,
  actions: {
    increaseOne: () => {
      // const count = get().count;
      // set({ count: count + 1 });

      set((store) => ({ count: store.count + 1 }));
    },
    decreaseOne: () => {
      set((store) => ({ count: store.count - 1 }));
    },
  },
}));
*/

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
