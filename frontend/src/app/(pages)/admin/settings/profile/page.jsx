"use client";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useUpdateInfoMutation } from "@/Redux/api/user/adminApi";

export default function Profile() {
  const { loggedUser } = useSelector((store) => store.user);
  const id = loggedUser?._id;

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

    const res = await updateInfo(data);

    if (res?.data?.success) {
      toast.success("Update success");
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
            <input type="text" name="name" defaultValue={loggedUser?.name} />
          </div>

          <div>
            <p className="mb-1">Email</p>
            <input
              type="text"
              name="email"
              defaultValue={loggedUser?.email}
              disabled
            />
          </div>

          <div>
            <p className="mb-1">Phone</p>
            <input type="text" name="phone" defaultValue={loggedUser?.phone} />
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
