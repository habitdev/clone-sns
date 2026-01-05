import { create } from "zustand";

interface Store {
  count: number;
  // actions로 감싸면 하나로 불러와서 사용할 수 있다
  // 규모가 있는 경우 액션을 내부에 작성하면 유지보수가 어려워 잘 사용하지 않음
  actions: {
    increaseOne: () => void;
    decreaseOne: () => void;
  };
}

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
