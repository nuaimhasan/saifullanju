import { SiSkillshare } from "react-icons/si";
import { AiOutlineContacts } from "react-icons/ai";
import { FaRegUser, FaRegUserCircle } from "react-icons/fa";
import { MdOutlineModelTraining } from "react-icons/md";
import { BiBookAlt } from "react-icons/bi";
import { FaBloggerB } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { BsBoxes } from "react-icons/bs";
import { CgSearchFound } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";

import SidebarItems from "./SidebarItems";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/Redux/api/user/userSlice";

const adminSidebarItems = [
  {
    menu: [
      {
        icon: <BiCategory />,
        title: "Dashbaord",
        path: "/admin/dashboard",
      },
    ],
  },
  {
    title: "Service",
    menu: [
      {
        icon: <BsBoxes />,
        title: "All Services",
        path: "/admin/services/all",
      },
    ],
  },
  {
    title: "Training & Course",
    menu: [
      {
        icon: <SiSkillshare />,
        title: "Training",
        subMenu: [
          {
            title: "All Training",
            path: "/admin/training/all",
          },
          {
            title: "Order Training",
            path: "/admin/training/order/all",
          },
        ],
      },
      {
        icon: <MdOutlineModelTraining />,
        title: "Video Courses",
        path: "/admin/course/all",
      },
    ],
  },
  {
    title: "Book & Order",
    menu: [
      {
        icon: <BiBookAlt />,
        title: "Book",
        subMenu: [
          {
            title: "All Books",
            path: "/admin/book/all",
          },
          {
            title: "Order Books",
            path: "/admin/book/order/all",
          },
        ],
      },
    ],
  },
  {
    title: "Blog",
    menu: [
      {
        icon: <MdOutlineCategory />,
        title: "Categories",
        path: "/admin/blog/category/all",
      },
      {
        icon: <FaBloggerB />,
        title: "Blogs",
        path: "/admin/blog/all",
      },
    ],
  },
  {
    title: "Pages",
    menu: [
      {
        icon: <FaRegUser className="text-[15px]" />,
        title: "About",
        path: "/admin/pages/about",
      },
      {
        icon: <AiOutlineContacts />,
        title: "Contact",
        path: "/admin/pages/contact",
      },
    ],
  },
  {
    title: "Setting",
    menu: [
      {
        icon: <MdOutlineSettings />,
        title: "Settings",
        path: "/admin/settings/profile",
      },
    ],
  },
  {
    title: "SEO",
    menu: [
      {
        icon: <CgSearchFound />,
        title: "SEO",
        path: "/admin/seo-setting",
      },
    ],
  },
];

export default function Sidebar() {
  const { loggedUser } = useSelector((store) => store.user);
  const user = loggedUser?.data;

  const dispatch = useDispatch();

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="sidebar_menu">
        <Link
          href="/admin/dashboard"
          className="block border-b py-2 text-center text-secondary"
        >
          <h2 className="text-3xl font-semibold">Saiful Lanju</h2>
        </Link>

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

      <div className="border-t py-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <FaRegUserCircle className="text-lg" />
            <div>
              <h3 className="font-medium">{user?.name}</h3>
              <p className="-mt-px text-xs text-neutral-content">
                {user?.role}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              const confirm = window.confirm(
                "Are you sure you want to logout?"
              );
              if (confirm) dispatch(userLogout());
            }}
            className="rounded bg-red-100 px-3 py-1.5 text-[13px] text-red-500 duration-300 hover:bg-red-500 hover:text-base-100"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
