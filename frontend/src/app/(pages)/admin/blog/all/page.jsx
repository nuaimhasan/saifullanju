"use client";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-hot-toast";
import {
  useDeleteBlogMutation,
  useGetAllBlogQuery,
} from "@/Redux/api/blog/blogApi";
import Link from "next/link";

export default function AllBlogs() {
  const { data, isLoading } = useGetAllBlogQuery();
  const blogs = data?.data;

  const [deleteBlog] = useDeleteBlogMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm("Are you sure to delete this blog?");
    if (isConfirm) {
      const res = await deleteBlog(id);
      if (res?.data?.success) {
        toast.success(res.data.message || "Blog deleted successfully");
      } else {
        toast.error(res.data.message || "Failed to delete blog");
        console.log(res);
      }
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Blogs</h1>
          <Link href="/admin/blog/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>
      </div>

      <div className="relative mt-2 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs?.map((blog, i) => (
              <tr key={blog?._id}>
                <td>{i + 1}</td>
                <td>
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog?.image}`}
                    alt="blog icon"
                    className="h-8 w-14 rounded"
                  />
                </td>
                <td>{blog?.title}</td>
                <td>{blog?.category?.title}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/blog/edit/${blog?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(blog?._id)}>
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
