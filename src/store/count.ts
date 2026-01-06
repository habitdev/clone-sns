import { create } from "zustand";
import { combine, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// combine을 사용하는 이유:
// 첫번째로 넘기는 state의 타입이 자동으로 추론이 되기 때문이다
// 보통 set((store)부분을 오해하지 않도록 set((state)로 바꿔서 입력한다
// immer: 불변성 관리
// immer를 사용하면 set((state) => ({ count: state.count + 1 })); 대신에
// set((state) => state.count++); 를 사용할 수 있다 (속성애 직접 접근해서 값 변경 가능)

/* 
subscribeWithSelector
: useEffect같은 기능
사용자가 로그아웃 해서 세션을 보관하는 store의 값이 바뀌었을 때 다시 로그인페이지로 이동하게할 때 많이 사용 (side effect)

*/

export const useCountStore = create(
  subscribeWithSelector(
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
  ),
);

// 선택된 값(첫번째 인자: 여기선 count)이 변경될 때마다 두번째 인자(여기선 console.log(count))가 실행된다
// 두번째 인자의 매개변수는 첫번째 인자의 값과 동일하다..?
useCountStore.subscribe(
  (store) => store.count,
  (count, prevCount) => {
    // Listhener
    console.log(count, prevCount);

    const store = useCountStore.getState(); // 현재 count값
    // useCountStore.setState((store) => {}); // 여기서 값을 변경하면 무한 루프에 빠진다
  },
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
