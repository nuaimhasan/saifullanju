"use client";
import { AiOutlineClose } from "react-icons/ai";
import { BiBookReader } from "react-icons/bi";
import { SiSkillshare } from "react-icons/si";
import { BiVideo } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

import SidebarItems from "./SidebarItems";
import { useSelector } from "react-redux";
import Image from "next/image";

const adminSidebarItems = [
  {
    menu: [
      {
        icon: <BiCategory />,
        title: "Dashbaord",
        path: "/user/dashboard",
      },
      {
        icon: <SiSkillshare />,
        title: "My Training",
        path: "/user/my-training",
      },
      {
        icon: <BiVideo className="text-xl" />,
        title: "My Courses",
        path: "/user/my-courses",
      },
      {
        icon: <BiBookReader />,
        title: "Order Books",
        path: "/user/my-books",
      },
      {
        icon: <FaRegUser className="text-[15.5px]" />,
        title: "My Profile",
        path: "/user/my-profile",
      },
    ],
  },
];

export default function Sidebar({ setSidebar }) {
  const { loggedUser } = useSelector((store) => store.user);
  const user = loggedUser;

  return (
    <div className="flex h-full flex-col justify-between relative">
      <button
        onClick={() => setSidebar(false)}
        className="absolute top-2 right-1 text-neutral-content lg:hidden"
      >
        <AiOutlineClose />
      </button>

      <div className="flex flex-col items-center justify-center gap-2 py-4 text-center">
        <Image
          src="/user.jpg"
          alt="avatar"
          className="w-[105px] h-[105px] rounded-full border-2"
          width={100}
          height={100}
        />
        <h2 className="font-semibold text-xl">{user?.name}</h2>
        <div className="text-sm text-neutral/80 -mt-2">
          <p>{user?.email}</p>
          <p>{user?.phone}</p>
        </div>
      </div>

      <div className="sidebar_menu user_sidebar_menu">
        <nav className="admin_siderbar_item flex flex-col gap-3">
          {adminSidebarItems?.map((item, i) => (
            <ul key={i}>
              <h3 className="pb-2 text-[13px] uppercase text-neutral/60">
                {item?.title}
              </h3>
              {item?.menu?.map((menu, i) => (
                <SidebarItems key={i} item={menu} />
              ))}
            </ul>
          ))}
        </nav>
      </div>
    </div>
  );
}
