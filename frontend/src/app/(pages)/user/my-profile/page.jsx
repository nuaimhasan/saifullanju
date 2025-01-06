"use client";
import { BiMessageSquareEdit } from "react-icons/bi";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function MyProfile() {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  return (
    <section>
      <div className="bg-base-100 p-4 rounded shadow">
        <div className="flex justify-between items-center pb-3 border-b border-dashed">
          <h2 className="font-semibold">My Profile</h2>
          <Link href="/user/my-profile/edit">
            <BiMessageSquareEdit className="text-primary text-xl" />
          </Link>
        </div>

        <div className="pt-4 grid sm:grid-cols-2 gap-4">
          <div>
            <p className="mb-1 text-[15px] text-neutral-content">Full Name</p>
            <p>{user?.name}</p>
          </div>

          <div>
            <p className="mb-1 text-[15px] text-neutral-content">Email</p>
            <p>{user?.email}</p>
          </div>

          <div>
            <p className="mb-1 text-[15px] text-neutral-content">
              Phone Number
            </p>
            <p>{user?.phone}</p>
          </div>

          <div>
            <p className="mb-1 text-[15px] text-neutral-content">Whatsapp</p>
            <p>{user?.whatsapp}</p>
          </div>

          <div>
            <p className="mb-1 text-[15px] text-neutral-content">Gender</p>
            <p>{user?.gender}</p>
          </div>

          <div>
            <p className="mb-1 text-[15px] text-neutral-content">Age</p>
            <p>{user?.age}</p>
          </div>

          <div>
            <p className="mb-1 text-[15px] text-neutral-content">Address</p>
            <p>{user?.address}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
