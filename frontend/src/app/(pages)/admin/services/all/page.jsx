"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/Redux/api/serviceApi";
import Link from "next/link";

export default function AllServices() {
  const { data, isLoading } = useGetServicesQuery();
  const services = data?.data;

  const [deleteService] = useDeleteServiceMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure to delete this service?");
    if (isConfirm) {
      const res = await deleteService(id);
      if (res?.data?.success) {
        toast.success(res.data.message || "Service deleted successfully");
      } else {
        toast.error(res.data.message || "Failed to delete service");
        console.log(res);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">Services</h1>
          <Link href="/admin/services/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Title</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {services?.map((service, i) => (
              <tr key={service?._id}>
                <td>{i + 1}</td>
                <td>{service?.title}</td>
                <td>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${service?.icon}`}
                    alt="service icon"
                    className="h-8 w-14 rounded"
                  />
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/services/edit/${service?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(service?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
