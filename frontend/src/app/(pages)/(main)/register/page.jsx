"use client";
import { useStudentRegisterMutation } from "@/Redux/api/user/studentApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function StudentRegister() {
  const [studentRegister, { isLoading }] = useStudentRegisterMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.number.value;
    const gender = form.gender.value;
    const password = form.password.value;
    const repassword = form.repassword.value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;

    if (!emailRegex.test(email)) return toast.error("Invalid email");
    if (!phoneRegex.test(phone)) return toast.error("Invalid phone number");
    if (password !== repassword) return toast.error("Password does not match");

    const info = {
      name,
      email,
      phone,
      gender,
      password,
    };

    const res = await studentRegister(info);

    if (res?.data?.success) {
      Swal.fire("", res?.data?.message, "success");
      form.reset();
    } else {
      Swal.fire("", res?.data?.message, "error");
      console.log(res);
    }
  };

  return (
    <section className="flex h-[90vh] w-full items-center justify-between">
      <div className="mx-auto w-full sm:w-1/2">
        <h2 className="mb-6 text-center text-2xl font-semibold text-neutral">
          User Registration
        </h2>
        <form onSubmit={handleRegister} className="p-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="mb-1 text-[15px]">Full Name</p>
              <input type="text" name="name" required />
            </div>
            <div>
              <p className="mb-1 text-[15px]">Email</p>
              <input type="text" name="email" required />
            </div>
            <div>
              <p className="mb-1 text-[15px]">Number</p>
              <input type="text" name="number" required />
            </div>
            <div>
              <p className="mb-1 text-[15px]">Gender</p>
              <select name="gender">
                <option value="male">Male</option>
                <option value="female">FeMale</option>
                <option value="others">Others</option>
              </select>
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
            <div>
              <p className="mb-1 text-[15px]">Confirm Password</p>
              <input
                type="password"
                placeholder="******"
                name="repassword"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={isLoading}
              className="w-full rounded bg-primary px-4 py-2 text-base-100"
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
