# MEMO

### TanStack Query

API 요청에 대한 데이터를 지역이나 전역상태로 관리하기엔
전역상태는 코드가 매우 복잡해지고
지역상태는 여러 컴포넌트에서 이용할 수 없으며 코드가 매우 복잡해지므로
=> 서버 상태로 관리한다 -> TanStack Query
(로딩상태, 성공/실패 유무, 에러 객체, cacheOptions 등)

### json-server

db.json이 리액트파일로 간주되지 않도록
(리액트 파일로 간주되면 db.json이 수정되면 리렌더링이 일어나기 때문이다)
vite.config.ts의 설정을 수정한다

```
  server: {
    watch: {
      ignored: ["**/server/**"], // server 폴더 하위 파일은 무시
    },
  },
```

## tanStack Query

강력한 캐싱 기능을 이용해 앱을 최적화 할 수 있다.
적절한 타이밍에 캐시 데이터를 갱신하거나 삭제할 수 있다.

### 캐시 5가지 상태

**1. fetching**
데이터를 불러오는 중 일때

**2. fresh**
데이터가 막 불러와진 상태 (신선한 때)

**3. stale**
데이터가 불러와지고 좀 지난 데이터 (데이터가 상한 상태)
-> 오래된 데이터

```plantext

staleTime: fresh였던 데이터가 stale상태가 될때까지의 시간
- 유통기한
- 각각의 캐시 데이터별로 직접 설정이 가능하다

```

**4. refetching(-> fetching)**
데이터를 다시 불러옴

4.1) mount: 이 캐시 데이터를 사용하는 컴포넌트가 마운트 되었을 때
4.2) WindowFocus: 사용자가 이 탭에 다시 돌아왔을 때
4.3) Reconnect: 사용자의 인터넷 연결이 끊어졌다가 다시 연결 되었을 때
4.4) Interval: 설정한 특정 시간을 주기로 데이터를 다시 불러옴

**5. inactive**
이 캐시 데이터를 활용하는 컴포넌트가 하나도 없을 때
=> 많아서 좋을 게 없음, 메모리 낭비로 이어질 수 있음

**6. deleted**
inactive 상태가 일정 시간(gcTime: 가비지 타임) 이상 지속되면 캐시 데이터가 삭제된다
기본 가비지 타임은 5분

---

⭐️ gcTime과 staleTime은 같이 가지 않는다
staleTime이 길어서 데이터가 fresh한 상태라고 하더라도
inactive가 된다면 gcTime이 지났을 때 deleted 상태가 된다

---

### 캐싱 매커니즘

```ts
useQuery({
  queryFn: fetchTodos,
  queryKey: ["todos"],
  // retry: 0 // 재시도 횟수 지정
  isDone: true,
});
```

**useQuery**
데이터를 가져오는 것만 가능하다

**useMutation**
데이터를 변경(조작/수정)하는 것만 가능하다
isPending: mutation 함수로 호풀한 비동기 상태의 로딩 상태를 알 수 있다

```ts
onMutate: () => {}, // 요청이 시작될 때
onSettled: () => {}, // 요청이 완료될 때
onSuccess: () => {}, // 요청이 성공했을 떼
onError: () => {}, // 요청이 실패했을 떼
```

**queryKey**

- 쿼리를 식별하는 고유한 키
- queryKey에 지정된 이름으로 캐싱된다
- queryKey가 동일하면 같은 쿼리로 인식한다 => 불필요한 네트워크 요청을 방지한다
- 배열 형태로 작성하며, 배열의 요소가 변경되면 쿼리가 다시 실행된다
- 배열의 첫 번째 요소는 쿼리의 종류를 나타내는 문자열로, 보통 API의 엔드포인트를 사용한다
- 배열의 두 번째 요소부터는 쿼리의 파라미터를 나타내며, 배열의 요소가 변경되면 쿼리가 다시 실행된다
- 상황에 따라 최신 데이터를 적용할 수 있다

---

모든 쿼리가 동일한 조건을 가지게 하고 싶다면
`new QueryClient({defaultOptions: {queries: {staleTime: 60 * 60 * 1000}}})` 이런식으로 `QueryClient` 안에 입력하면 된다

---
