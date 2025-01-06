"use client";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUpdateInfoMutation } from "@/Redux/api/user/adminApi";

export default function Profile() {
  const { loggedUser } = useSelector((store) => store.user);
  const id = loggedUser?.data?._id;

  const router = useRouter();
  const dispatch = useDispatch();

  const [updateInfo, { isLoading }] = useUpdateInfoMutation();

  const handleUpdateInfo = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;

    const data = {
      name,
      email,
      phone,
    };

    const res = await updateInfo({ id, data });

    if (res?.data?.success) {
      toast.success("Update success");
      if (loggedUser?.data?.email != res?.data?.data?.email) {
        localStorage.removeItem("token");
        dispatch(userLoggedIn({ data: undefined }));
        router.push("/login");
      }
    } else {
      toast.error(res?.data?.message || "something went wrong!");
      console.log(res);
    }
  };

  return (
    <section className="p-2">
      <form onSubmit={handleUpdateInfo}>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1">Name</p>
            <input
              type="text"
              name="name"
              defaultValue={loggedUser?.data?.name}
            />
          </div>

          <div>
            <p className="mb-1">Email</p>
            <input
              type="text"
              name="email"
              defaultValue={loggedUser?.data?.email}
            />
          </div>

          <div>
            <p className="mb-1">Phone</p>
            <input
              type="text"
              name="phone"
              defaultValue={loggedUser?.data?.phone}
            />
          </div>
        </div>

        <div className="mt-4">
          <button className="primary_btn text-sm">
            {isLoading ? "Loading..." : "Update Profile"}
          </button>
        </div>
      </form>
    </section>
  );
}
