"use client"

import Link from "next/link";
import Header from "./Header";
import Image from "next/image";
import login from "../public/Images/login.png";
import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function Login() {

    const router = useRouter();

    const [form, setForm] = useState({ email: "", password: "" });
    const [submitting, setSubmitting] = useState(false);

    function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
        setForm(prev => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);


        console.log("Submitting login:", form);

        try {
            const res = await axios.post("/api/auth/login", {
                email: form.email,
                password: form.password,
            });

            if (res.data?.success) {
                toast.success("Login successful");
                let redirectTo = res.data.redirect ?? "/home";
                if (redirectTo === "/dashboard") redirectTo = "/home";
                router.push(redirectTo);
            } else {
                toast.error(res.data?.error ?? "Login failed");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                let message = "Something went wrong";

                const data = error.response?.data;
                if (data && typeof data === "object") {
                    // Narrow to a safe record type (NOT `any`)
                    const d = data as Record<string, unknown>;

                    const errField = d["error"];
                    const msgField = d["message"];

                    if (typeof errField === "string") {
                        message = errField;
                    } else if (typeof msgField === "string") {
                        message = msgField;
                    } else if (typeof error.message === "string") {
                        message = error.message;
                    }
                } else if (typeof error.message === "string") {
                    message = error.message;
                }

                toast.error(message);
            } else {
                toast.error("Unexpected error occurred");
            }
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="relative z-0">
            <Header />

            <div className="relative z-10 lg:flex justify-evenly  mx-auto w-11/12 mt-12">
                <div>
                    <Image className="sm:w-[11/12] h-[500px] mb-4 lg:w-[530px] lg:h-[650px]" src={login} alt="Login Image" />
                </div>
                <div>
                    <h1 className=" text-5xl">Make Art </h1>
                    <h1 className="text-5xl ps-24 pt-1">With Heart </h1>

                    <p className="text-center mt-6 text-xl">Welcome to Artistry </p>
                    <p className="sm:text-center mt-2 text-md">Where every brushstrokes tells a story and every canvas is alive.</p>

                    {/* LOGIN FORM */}
                    <div className="mb-6 lg:mb-0 mt-10 w-12/12 lg:w-11/12 border border-slate-700 bg-black px-6 py-10 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                            Login
                        </h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* EMAIL */}
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-3 text-slate-400" />

                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={form.email}
                                    onChange={(e) => update("email", e.target.value)}
                                    required
                                    className="w-full pl-10 pr-3 py-2 bg-[#111] border border-slate-700 text-white rounded-md focus:border-slate-500 outline-none"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-3 text-slate-400" />

                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={form.password}
                                    onChange={(e) => update("password", e.target.value)}
                                    required
                                    className="w-full pl-10 pr-3 py-2 bg-[#111] border border-slate-700 text-white rounded-md focus:border-slate-500 outline-none"
                                />
                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={submitting}
                                className="bg-slate-700 text-white px-5 py-2 rounded-md hover:bg-slate-800 transition disabled:opacity-60"
                            >
                                {submitting ? "logging in..." : "Login"}
                            </button>

                        </form>

                        {/* REGISTER LINK */}
                        <p className="text-center mt-8 text-sm text-slate-300">
                            Don’t have an account?{" "}
                            <Link href="/register" className="text-blue-400 underline">
                                Register
                            </Link>
                        </p>
                    </div>
                    {/* END FORM */}
                </div>
            </div>

            {/* <Link href="/register">Go to Register</Link> */}
        </div>
    );
}