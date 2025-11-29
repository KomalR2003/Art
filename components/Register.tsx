"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

// lucide-react icons
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  Briefcase,
  Palette,
  Globe,
  FileText,
} from "lucide-react";
import Link from "next/link";

// import bgr from "/Images/bgr.jpg";


type Role = "user" | "admin" | "artist";

export default function Register() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    dob: "",
    role: "user" as Role,
    experience: "",
    specialization: "",
    portfolio: "",
    bio: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: "" }));
  }

  // function validate() {
  //   const e: Record<string, string> = {};
  //   if (!form.username.trim()) e.username = "Username required";
  //   if (!form.email.match(/^\S+@\S+\.\S+$/)) e.email = "Invalid email";
  //   if (form.password.length < 6) e.password = "Min 6 characters";
  //   if (!form.mobile.match(/^[0-9]{7,15}$/)) e.mobile = "Invalid mobile";
  //   if (!form.dob) e.dob = "Date of birth required";

  //   if (!form.agree) e.agree = "Agree to terms";

  //   if (form.role === "artist") {
  //     if (!form.experience.trim()) e.experience = "Experience required";
  //     if (!form.specialization.trim()) e.specialization = "Specialization required";
  //   }

    // return e;
  // }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await axios.post("/api/auth/register", form);

      if (res.data?.success) {
        toast.success("Registered Successfully");
        router.push("/login");
      } else {
        toast.error(res.data?.error ?? "Registration failed");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let message = "Something went wrong";

        const data = error.response?.data;

        if (data && typeof data === "object") {
          if ("error" in data && typeof data.error === "string") {
            message = data.error;
          } else if ("message" in data && typeof data.message === "string") {
            message = data.message;
          }
        }

        toast.error(message);
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  }

  return (
    <div className="min-h-screen bg-black flex justify-center py-12 px-4">
      <div className="w-10/12 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT PANEL */}
        <div
          style={{ backgroundImage: `url('/Images/bgr.jpg')` }}
          className="relative bg-cover bg-center bg-no-repeat hidden md:flex flex-col justify-center rounded-xl p-10 shadow-lg"
        >
          {/* Dark overlay ONLY on image */}
          <div className="absolute inset-0 bg-black/60 rounded-xl"></div>

          {/* Content stays clear */}
          <div className="relative z-10 text-center">
            <h1 className="text-3xl font-bold text-white">Create Your Artistry Account</h1>
            <p className="text-slate-300 mt-3 text-sm">
              Build your identity, showcase your talent, and connect with a global audience.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-center gap-3 text-slate-300">
                <Palette size={20} />
                <span>Made for artists & creators</span>
              </div>

              <div className="flex items-center justify-center gap-3 text-slate-300">
                <Globe size={20} />
                <span>Showcase to the world</span>
              </div>

              <div className="flex items-center justify-center gap-3 text-slate-300">
                <User size={20} />
                <span>Build your personal brand</span>
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT FORM CARD */}
        <div className="bg-[#0f0f0f] border border-slate-700 rounded-xl p-8 shadow-xl text-white">
          <h2 className="text-2xl font-semibold">Register</h2>
          <p className="text-sm text-slate-400">Fill your details below</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">

            {/* Username */}
            <div>
              <label className="text-sm text-slate-300">Username</label>
              <div className="relative mt-1">
                <User size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  value={form.username}
                  onChange={(e) => update("username", e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 bg-black border rounded-md text-white 
                  ${errors.username ? "border-red-500" : "border-slate-700"}`}
                  placeholder="Your username"
                />
              </div>
              {errors.username && <p className="text-xs text-red-500">{errors.username}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-slate-300">Email</label>
              <div className="relative mt-1">
                <Mail size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 bg-black border rounded-md text-white 
                  ${errors.email ? "border-red-500" : "border-slate-700"}`}
                  placeholder="email"
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-slate-300">Password</label>
              <div className="relative mt-1">
                <Lock size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 bg-black border rounded-md text-white 
                  ${errors.password ? "border-red-500" : "border-slate-700"}`}
                  placeholder=" password"
                />
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
            </div>

            {/* Mobile */}
            <div>
              <label className="text-sm text-slate-300">Mobile</label>
              <div className="relative mt-1">
                <Phone size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  value={form.mobile}
                  onChange={(e) => update("mobile", e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 bg-black border rounded-md text-white 
                  ${errors.mobile ? "border-red-500" : "border-slate-700"}`}
                  placeholder="9123456789"
                />
              </div>
              {errors.mobile && <p className="text-xs text-red-500">{errors.mobile}</p>}
            </div>

            {/* DOB */}
            <div>
              <label className="text-sm text-slate-300">Date of Birth</label>
              <div className="relative mt-1">
                <Calendar size={18} className="absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => update("dob", e.target.value)}
                  className={`w-full pl-10 pr-3 py-2 bg-black border rounded-md text-white 
                  ${errors.dob ? "border-red-500" : "border-slate-700"}`}
                />
              </div>
              {errors.dob && <p className="text-xs text-red-500">{errors.dob}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-slate-300">Role</label>
              <select
                value={form.role}
                onChange={(e) => update("role", e.target.value as Role)}
                className="w-full mt-1 py-2 px-3 bg-black border border-slate-700 rounded-md text-white"
              >
                <option value="user">User</option>
                <option value="artist">Artist</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Artist Only Fields */}
            {form.role === "artist" && (
              <div className="space-y-4">

                {/* Experience */}
                <div>
                  <label className="text-sm text-slate-300">Experience (years)</label>
                  <div className="relative mt-1">
                    <Briefcase size={18} className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="number"
                      value={form.experience}
                      onChange={(e) => update("experience", e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 bg-black border rounded-md text-white 
                      ${errors.experience ? "border-red-500" : "border-slate-700"}`}
                      placeholder="e.g. 3"
                    />
                  </div>
                  {errors.experience && <p className="text-xs text-red-500">{errors.experience}</p>}
                </div>

                {/* Specialization */}
                <div>
                  <label className="text-sm text-slate-300">Specialization</label>
                  <div className="relative mt-1">
                    <Palette size={18} className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                      value={form.specialization}
                      onChange={(e) => update("specialization", e.target.value)}
                      className={`w-full pl-10 pr-3 py-2 bg-black border rounded-md text-white 
                      ${errors.specialization ? "border-red-500" : "border-slate-700"}`}
                      placeholder="e.g. Digital Art, Watercolor"
                    />
                  </div>
                  {errors.specialization && (
                    <p className="text-xs text-red-500">{errors.specialization}</p>
                  )}
                </div>


                {/* Portfolio */}
                <div>
                  <label className="text-sm text-slate-300">Portfolio URL (optional)</label>
                  <div className="relative mt-1">
                    <Globe size={18} className="absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="url"
                      value={form.portfolio}
                      onChange={(e) => update("portfolio", e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-black border border-slate-700 rounded-md text-white"
                      placeholder="https://"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="text-sm text-slate-300">Bio (optional)</label>
                  <div className="relative mt-1">
                    <FileText size={18} className="absolute left-3 top-2.5 text-slate-400" />
                    <textarea
                      rows={3}
                      value={form.bio}
                      onChange={(e) => update("bio", e.target.value)}
                      className="w-full pl-10 pr-3 py-2 bg-black border border-slate-700 rounded-md text-white"
                      placeholder="Tell something about yourself"
                    />
                  </div>
                </div>

              </div>


            )}





            <button
              type="submit"
              disabled={submitting}
              className="bg-slate-700 text-white px-5 py-2 rounded-md hover:bg-slate-800 transition disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Register"}
            </button>

            {/* Login LINK */}
            <p className="text-center mt-8 text-sm text-slate-300">
              Don’t have an account?{" "}
              <Link href="/login" className="text-blue-400 underline">
                Login
              </Link>
            </p>
            {/* </div> */}

          </form>
        </div>
      </div>
    </div>
  );
}
