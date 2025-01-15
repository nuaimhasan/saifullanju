"use client";
import { useUpdatePasswordMutation } from "@/Redux/api/user/adminApi";
import { userLoggedIn } from "@/Redux/api/user/userSlice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePassword() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.user);
  const id = loggedUser?.data?._id;

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation();

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const currentPassword = form.currentPassword.value;
    const password = form.password.value;
    const rePassword = form.rePassword.value;

    if (password !== rePassword) {
      return toast.error("Password and Re Password not match");
    }

    const data = {
      currentPassword,
      newPassword: password,
    };

    const res = await updatePassword(data);

    if (res?.data?.success) {
      toast.success("Password update success");
      localStorage.removeItem("token");
      dispatch(userLoggedIn({ data: undefined }));
      router.push("/login");
    } else {
      toast.error(res?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="bg-base-100 border rounded p-3">
      <form onSubmit={handleUpdatePassword}>
        <div className="grid gap-4 sm:w-1/2">
          <div>
            <p className="mb-1">Current Password</p>
            <input type="password" name="currentPassword" />
          </div>

          <div>
            <p className="mb-1">New Password</p>
            <input type="password" name="password" />
          </div>

          <div>
            <p className="mb-1">Re Password</p>
            <input type="password" name="rePassword" />
          </div>
        </div>

        <div className="mt-4">
          <button disabled={isLoading} className="primary_btn text-sm">
            {isLoading ? "Loading..." : "Update Password"}
          </button>
        </div>
      </form>
    </section>
  );
}
