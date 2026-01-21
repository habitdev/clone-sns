export const API_URL = "http://localhost:3000";

// 쿼리 키를 정의하는 객체
// 쿼리 키를 정의하는 이유: 캐시 데이터를 관리하기 쉽고, 코드의 가독성을 높일 수 있다
// 쿼리 키 팩토리 방식
export const QUERY_KEYS = {
  todo: {
    all: ["todo"],
    list: ["todo", "list"],
    detail: (id: string) => ["todo", "detail", id],
  },
};
