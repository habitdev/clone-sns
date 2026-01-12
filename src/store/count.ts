import { create } from "zustand";
import {
  combine,
  createJSONStorage,
  devtools,
  persist,
  subscribeWithSelector,
} from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// combine을 사용하는 이유:
// 첫번째로 넘기는 state의 타입이 자동으로 추론이 되기 때문이다
// 보통 set((store)부분을 오해하지 않도록 set((state)로 바꿔서 입력한다
// immer: 불변성 관리
// immer를 사용하면 set((state) => ({ count: state.count + 1 })); 대신에
// set((state) => state.count++); 를 사용할 수 있다 (속성애 직접 접근해서 값 변경 가능)

/* 
# subscribeWithSelector
: useEffect같은 기능
사용자가 로그아웃 해서 세션을 보관하는 store의 값이 바뀌었을 때 다시 로그인페이지로 이동하게할 때 많이 사용 (side effect)


# persist(스토어, {name, partialize, storage})
: 브라우저 로컬 스토리지에 보관하는 기능
: 두번째 인수로 객체를 전달해야 한다
-> 어떤 이름으로 저장할 것인가

로컬 스토리지에 저장 시 json형식으로 저장되기 때문에 자바스크립트인
actions안의 함수들은 저장되지 않는다
=> 새로고침하면 함수들이 사라져서 어떤 동작도 일어나지 않는다
=> 그래서 partialize로 어떤 걸 저장할지 지정한다

storage: 로컬 스토리지 대신에 세션 스토리지에 저장하도록 하는 옵션

# devtools
디버깅 툴
두번째 인수에 어떤 걸 디버깅할지 스토어의 이름을 넣어준다


**middleware는 적용하는 순서가 중요하므로 아래의 순서로 적용하는 걸 기억하자**

*/

export const useCountStore = create(
  devtools(
    persist(
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
      {
        name: "countStore",
        partialize: (store) => ({
          count: store.count,
        }),
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: "countStore" },
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
