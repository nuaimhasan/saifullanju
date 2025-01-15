"use client";
import { useGetAllUsersQuery } from "@/Redux/api/user/studentApi";

export default function AllUser() {
  const { data } = useGetAllUsersQuery();
  const users = data?.data;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Users</h1>
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
    </section>
  );
}
