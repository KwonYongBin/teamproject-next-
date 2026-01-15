//"use client";
//
//import { useEffect } from "react";
//import { axiosGet } from "@/utils/dataFetch.js";
//import { useAuthStore } from "@/store/authStore.js";
//
//export default function AuthHydrator() {
//    const login = useAuthStore((s) => s.login);
//    const logout = useAuthStore((s) => s.logout);
//    const authenticated = useAuthStore((s) => s.authenticated);
//    // const setHydrating = useAuthStore((s) => s.setHydrating);
//
//    useEffect(() => {
//        (async () => {
//            try {
//                // refresh 쿠키 기반으로 서버가 Access 재발급/검증
//                const data = await axiosGet("/auth/me");
//
//                console.log("data ::", data);
//                if (data?.authenticated) {
//                    console.log("🔄 Hydrator: 새로고침 → Access Token 재발급됨", data.accessToken);
//                    login({
//                        userId: data.userId,
//                        role: data.role,
//                        accessToken: data.accessToken,
//                    });
//                } else {
//                    logout();
//                }
//            } catch {
//                logout();
//            }
//        })();
//    }, [login, logout]);
//
//    return null; // 화면에 아무것도 렌더링하지 않음
//}

"use client";

import { useEffect } from "react";
import { axiosGet } from "@/utils/dataFetch.js";
import { useAuthStore } from "@/store/authStore.js";

export default function AuthHydrator() {
    const login = useAuthStore((s) => s.login);
    const logout = useAuthStore((s) => s.logout);
    const isLogin = useAuthStore((s) => s.isLogin); // 현재 로그인 상태 확인

    useEffect(() => {
        (async () => {
            try {
                const data = await axiosGet("/auth/me");
                console.log("서버 응답 확인:", data);

                if (data?.authenticated) {
                    // 서버가 인증되었다고 하면 데이터 갱신
                    login({
                        userId: data.userId,
                        role: data.role,
                        accessToken: data.accessToken,
                    });
                }
                // [주의] 백엔드 수정 전까지는 여기서 logout()을 함부로 호출하지 마세요.
                // 서버 응답이 실패해도 로컬 스토리지의 데이터(persist)를 유지하려면 아래를 주석 처리합니다.
                /* else {
                    logout();
                }
                */
            } catch (error) {
                console.error("Hydrator 에러 발생:", error);
            }
        })();
    }, [login, logout]);

    return null;
    //ddddd
}