import { useEffect, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { FaRegUserCircle } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/Redux/api/user/userSlice";

export default function AdminHeader({ setSidebar }) {
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const { loggedUser } = useSelector((store) => store.user);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (!e.target.closest(".d_btn")) {
        setDropdown(false);
      }
    });
  }, []);

  return (
    <header className="bg-base-100 px-6 py-3 text-neutral shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSidebar(true)}
            className="admin_sidebar_btn lg:hidden"
          >
            <HiOutlineMenuAlt2 className="text-xl" />
          </button>
          <div className="flex items-center text-[15px]">
            <Link href="/" target="_blank" title="visit front-end">
              <TbWorldWww className="text-xl sm:text-2xl" />
            </Link>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setDropdown(!dropdown)}
            className="d_btn flex items-center gap-1"
          >
            <FaRegUserCircle className="text-lg" />
            {loggedUser?.data?.name || "Admin"}
          </button>

          {dropdown && (
            <div className="absolute right-0 top-[140%] z-50 min-w-52 rounded bg-base-100 p-2 shadow">
              <div className="border-b p-2">
                <div className="text-sm font-semibold">
                  {loggedUser?.data?.name}
                </div>
                <div className="text-sm">{loggedUser?.data?.email}</div>
              </div>

              <ul>
                <li>
                  <Link
                    href="/admin/general-setting/profile"
                    className="block rounded border-b px-2 py-1 duration-200 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/admin/settings/profile"
                    className="block rounded border-b px-2 py-1 duration-200 hover:bg-gray-100"
                  >
                    Setting
                  </Link>
                </li>
              </ul>

              <button
                onClick={() => dispatch(userLogout())}
                className="w-full rounded px-2 py-1 text-start text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
