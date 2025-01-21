"use client";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import { useLoginMutation } from "@/Redux/api/user/studentApi";
import PageViewClient from "@/app/hooks/PageViewClient";

export default function StudentLogin() {
  const { loggedUser } = useSelector((store) => store.user);
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (loggedUser?.success && loggedUser?.data?.role == "user") {
      router.push("/user/dashboard");
    } else if (loggedUser?.success && loggedUser?.data?.role == "admin") {
      router.push("/admin/dashboard");
    }
  }, [loggedUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const info = {
      email,
      password,
    };

    const res = await login(info);

    if (res?.data?.success) {
      toast.success("Login success");
    } else {
      toast.error(res?.data?.message || "Login failed");
      console.log(res);
    }
  };

  return (
    <>
      <PageViewClient title="Login" url="/login" />
      <div className="flex h-[85vh] w-full items-center justify-between">
        <div className="mx-auto w-full rounded p-4 shadow sm:w-[430px]">
          <h2 className="mb-6 text-center text-2xl font-semibold text-neutral">
            Login
          </h2>
          <form onSubmit={handleLogin} className="p-4">
            <div className="mb-4">
              <p className="mb-1 text-[15px]">Email</p>
              <input type="text" name="email" required />
            </div>
            <div>
              <p className="mb-1 text-[15px]">Password</p>
              <input
                type="password"
                placeholder="******"
                name="password"
                required
              />
            </div>

            <div className="mt-4">
              <button
                className="w-full rounded bg-primary px-4 py-2 text-base-100"
                disabled={isLoading && "disabled"}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>

          <div className="p-4 flex justify-between items-center text-sm">
            <Link href="/register" className="text-blue-600">
              Click Here To Register
            </Link>
            <Link href="/forgot-password" className="text-neutral/80">
              Forgot Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
