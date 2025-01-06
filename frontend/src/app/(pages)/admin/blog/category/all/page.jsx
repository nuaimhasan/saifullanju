"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "@/Redux/api/blog/categoryApi";
import Link from "next/link";

export default function AllCategories() {
  const { data, isLoading } = useGetAllCategoryQuery();
  const categories = data?.data;

  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure you want to delete?");

    if (!isConfirm) return;

    try {
      const res = await deleteCategory(id);
      if (res?.data?.success) {
        toast.success(res?.data?.message || "Deleted successfully");
      } else {
        toast.error(res?.data?.message || "Failed to delete");
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Blog Categories</h1>
          <Link href="/admin/blog/category/add" className="primary_btn text-sm">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, i) => (
              <tr key={category?._id}>
                <td>{i + 1}</td>
                <td>{category?.title}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/blog/category/edit/${category?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(category?._id)}>
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
