//import { create } from "zustand";
//
//export const useAuthStore = create((set) => ({
//    userId: null,
//    role: null,
//    accessToken: null,
//    isLogin: false,
//    authChecked: false,   // 새로고침 호출 : 로그인 상태 체크 완료 여부
//    cartCount: 0,        //  장바구니 수량
//
//    // 🚀 로그인 성공 - 사용자아이디, 역할, 액세스토큰 정보 저장
//    login: ({ userId, role, accessToken }) =>
//        set({
//            userId,
//            role,
//            accessToken,
//            isLogin: true,
//            // isHydrating: false,   // 로그인 끝났으니 확인 완료
//            authChecked: true,
//        }),
//
//    // 🔥 accessToken만 갱신할 때 사용 (refresh 용)
//    setAccessToken: (accessToken) =>
//        set((state) => ({
//            ...state,
//            accessToken,
//        })),
//
//    // 🚀 로그 아웃 - 사용자아이디, 역할, 액세스토큰 정보 저장
//    logout: () =>
//        set({
//            userId: null,
//            role: null,
//            accessToken: null,
//            isLogin: false,
//            authChecked: true,
//            cartCount: 0,
//        }),
//
//    // 🛒 장바구니 수량 변경
//    // setCartCount: (count) =>
//    //     set({
//    //         cartCount: count,
//    //     }),
//
//}));


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // 1. 미들웨어 임포트

export const useAuthStore = create(
    persist( // 2. 전체 스토어를 persist로 감싸기
        (set) => ({
            userId: null,
            role: null,
            accessToken: null,
            isLogin: false,
            authChecked: false,   // 새로고침 호출 : 로그인 상태 체크 완료 여부
            cartCount: 0,        // 장바구니 수량

            // 🚀 로그인 성공
            login: ({ userId, role, accessToken }) =>
                set({
                    userId,
                    role,
                    accessToken,
                    isLogin: true,
                    authChecked: true,
                }),

            // 🔥 accessToken만 갱신할 때 사용 (refresh 용)
            setAccessToken: (accessToken) =>
                set((state) => ({
                    ...state,
                    accessToken,
                })),

            // 🚀 로그 아웃
            logout: () =>
                set({
                    userId: null,
                    role: null,
                    accessToken: null,
                    isLogin: false,
                    authChecked: true,
                    cartCount: 0,
                }),

            // 🛒 장바구니 수량 변경
            setCartCount: (count) =>
                set({
                    cartCount: count,
                }),
        }),
        {
            name: "auth-storage", // 3. 로컬스토리지에 저장될 키 이름 (중복 금지)
            storage: createJSONStorage(() => localStorage), // 4. 저장소 종류 설정 (기본값 localStorage)
            // partialize: (state) => ({ userId: state.userId, isLogin: state.isLogin }), // (선택사항) 특정 값만 저장하고 싶을 때 사용
        }
    )
);