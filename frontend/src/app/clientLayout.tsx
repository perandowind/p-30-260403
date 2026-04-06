'use client';
import { useAuth } from "@/global/auth/hook/useAuth";
import { fetchApi } from "@/lib/client";
import { MemberDto } from "@/type/member";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export default function ClientLayout({ children }: {
    children: React.ReactNode;
}) {

    const authState = useAuth();
    const { loginMember, getLoginMember, logout } = useAuth();
    const isLogin = loginMember !== null;
    const router = useRouter();

    useEffect(() => {
        getLoginMember();
    }, []);

    return (
        <>
            <AuthContext.Provider value={authState}>
                <header>
                    <nav className="flex gap-4">
                        <Link href="/">메인</Link>
                        <Link href="/posts">목록</Link>
                        {!isLogin && <Link href="/member/login">로그인</Link>}
                        {isLogin && <button onClick={logout}>로그아웃</button>}
                        {isLogin && <Link href="#">{loginMember?.name}</Link>}
                    </nav>
                </header>
                <main className="flex-grow flex flex-col gap-4 justify-center items-center">
                    {children}
                </main>
                <footer>푸터</footer>
            </AuthContext.Provider>
        </>
    )
}