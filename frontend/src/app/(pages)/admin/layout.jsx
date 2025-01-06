"use client";
import "@/app/styles/admin.css";
import AdminHeader from "@/app/components/admin/AdminHeader";
import Sidebar from "@/app/components/admin/Sidebar/Sidebar";
import { useEffect, useState } from "react";
import PrivateRoute from "./PrivateRoute";

export default function AdminLayout({ children }) {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        !e.target.closest(".admin_sidebar") &&
        !e.target.closest(".admin_sidebar_btn")
      ) {
        setSidebar(false);
      } else if (e.target.closest(".admin_sidebar ul li a")) {
        setSidebar(false);
      }
    });
  }, []);

  return (
    <PrivateRoute>
      <section className="flex">
        <aside className={`admin_sidebar ${sidebar && "admin_sidebar_show"}`}>
          <Sidebar />
        </aside>
        <div className="admin_content">
          <AdminHeader setSidebar={setSidebar} />
          <main className="py-3 sm:p-3">{children}</main>
        </div>
      </section>
    </PrivateRoute>
  );
}
