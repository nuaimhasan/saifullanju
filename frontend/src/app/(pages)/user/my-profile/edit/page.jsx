"use client";
import { BiArrowBack } from "react-icons/bi";
import { BiMessageSquareEdit } from "react-icons/bi";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useStudentUpdateInfoMutation } from "@/Redux/api/user/studentApi";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { userLoggedIn } from "@/Redux/api/user/userSlice";

export default function EditProfile() {
  const router = useRouter();
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const dispatch = useDispatch();

  const [studentUpdateInfo, { isLoading }] = useStudentUpdateInfoMutation();
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const res = await studentUpdateInfo(data);
    if (res?.data?.success) {
      toast.success("Profile Updated Successfully");
      dispatch(userLoggedIn({ data: res?.data }));
      router.push("/user/my-profile");
    } else {
      toast.error(res?.data?.message || "Profile Update Failed");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center pb-3 border-b border-dashed">
          <h2 className="font-semibold">Edit Profile</h2>
          <Link
            href="/user/my-profile/edit"
            className="text-sm text-red-500 flex items-center gap-1"
          >
            <BiArrowBack /> Back
          </Link>
        </div>

        <form
          onSubmit={handleUpdateProfile}
          className="pt-4 grid sm:grid-cols-2 gap-4"
        >
          <div>
            <p className="text-neutral-content">Full Name</p>
            <input type="text" name="name" defaultValue={user?.name} />
          </div>

          <div>
            <p className="text-neutral-content">Email</p>
            <input
              type="text"
              name="email"
              defaultValue={user?.email}
              disabled
            />
          </div>

          <div>
            <p className="text-neutral-content">Phone Number</p>
            <input type="text" name="phone" defaultValue={user?.phone} />
          </div>

          <div>
            <p className="text-neutral-content">Whatsapp</p>
            <input type="text" name="whatsapp" defaultValue={user?.whatsapp} />
          </div>

          <div>
            <p className="text-neutral-content">Gender</p>
            <select name="gender" defaultValue={user?.gender}>
              <option value="male">Male</option>
              <option value="female">FeMale</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <p className="text-neutral-content">Age</p>
            <input type="text" name="age" defaultValue={user?.age} />
          </div>

          <div className="sm:col-span-2">
            <p className="text-neutral-content">Address</p>
            <input type="text" name="address" defaultValue={user?.address} />
          </div>

          <div>
            <button disabled={isLoading} className="primary_btn text-sm">
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
