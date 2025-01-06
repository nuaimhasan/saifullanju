"use client";
import "@/app/styles/admin.css";
import { useEffect, useState } from "react";
import UserSidebar from "@/app/components/user/Sidebar/Sidebar";
import UserHeader from "@/app/components/user/UserHeader";
import PrivateRoute from "./PrivateRoute";

export default function UserLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        (!e.target.closest(".admin_sidebar") &&
          !e.target.closest(".user_sidebar_btn")) ||
        e.target.closest(".admin_siderbar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);

  return (
    <PrivateRoute>
      <aside className={`admin_sidebar ${sidebar && "admin_sidebar_show"}`}>
        <UserSidebar setSidebar={setSidebar} />
      </aside>
      <div className="admin_content">
        <UserHeader setSidebar={setSidebar} />
        <main className="py-3 sm:p-3">{children}</main>
      </div>
    </PrivateRoute>
  );
}
