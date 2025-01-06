"use client";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/Redux/api/blog/categoryApi";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function EditCategory() {
  const router = useRouter();
  const { id } = useParams();

  const { data } = useGetSingleCategoryQuery(id);
  const category = data?.data;

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  //------------Handle Add Product
  const handleEdit = async (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
    };

    const res = await updateCategory({ id, data });

    if (res?.data?.success) {
      toast.success("Updated Successfully");
      e.target.reset();
      router.push("/admin/blog/category/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit Category</h3>
      </div>

      <form onSubmit={handleEdit} className="p-4">
        <div className="flex flex-col gap-4 text-neutral-content">
          <div>
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={category?.title}
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Category"}
          </button>
        </div>
      </form>
    </section>
  );
}
