"use client";
import { useGetAllAdminsQuery } from "@/Redux/api/user/adminApi";

export default function AllAdmin() {
  const { data } = useGetAllAdminsQuery();
  const users = data?.data;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Admins</h1>
        </div>
      </div>

      <div className="relative mt-1 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
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
                </td>
                <td>{user?.email}</td>
                <td>{user?.role}</td>
                <td>{user?.isActive ? "Active" : "Pending"}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
