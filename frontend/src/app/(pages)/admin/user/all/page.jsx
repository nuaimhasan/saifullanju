"use client";
import Pagination from "@/app/components/Pagination/Pagination";
import { useGetAllUsersQuery } from "@/Redux/api/user/studentApi";
import { useState } from "react";
import { BsFiletypeXlsx } from "react-icons/bs";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";

export default function AllUser() {
  const { token } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;

  const { data } = useGetAllUsersQuery({ page: currentPage, limit });
  const users = data?.data;

  const handleDownloadExcel = async () => {
    setLoading(true);

    // getData
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    const users = data?.data;

    const formattedUsers = users?.map((user) => ({
      name: user?.name,
      phone: user?.phone,
      whatsapp: user?.whatsapp,
      email: user.email,
      gender: user?.gender,
      age: user?.age,
      address: user?.address,
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedUsers);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "users");

    // Trigger the download
    XLSX.writeFile(wb, "users.xlsx");

    setLoading(false);
  };

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Users</h1>

          <button
            onClick={handleDownloadExcel}
            className="primary_btn text-xs flex items-center gap-2"
          >
            {loading ? (
              "Loading..."
            ) : (
              <>
                <BsFiletypeXlsx /> Download
              </>
            )}
          </button>
        </div>
      </div>

      <div className="relative mt-1 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>User</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, i) => (
              <tr key={user?._id}>
                <td>{i + 1}</td>
                <td>
                  <p>{user?.name}</p>
                  <p>{user?.phone}</p>
                  <p>{user?.email}</p>
                  <p>{user?.whatsapp}</p>
                </td>
                <td>{user?.gender}</td>
                <td>{user?.age}</td>
                <td>{user?.role}</td>
                <td>{user?.isActive ? "Active" : "Pending"}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
