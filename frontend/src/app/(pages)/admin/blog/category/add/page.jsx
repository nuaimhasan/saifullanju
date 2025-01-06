"use client";
import { toast } from "react-hot-toast";
import { useAddCategoryMutation } from "@/Redux/api/blog/categoryApi";
import { useRouter } from "next/navigation";

export default function AddCategory() {
  const router = useRouter();
  const [addCategory, { isLoading }] = useAddCategoryMutation();

  const handleAdd = async (e) => {
    e.preventDefault();

    const data = {
      title: e.target.title.value,
    };

    try {
      const res = await addCategory(data);
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        router.push("/admin/blog/category/all");
      } else {
        toast.error(res?.data?.message || "Failed to add service");
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add Category</h3>
      </div>

      <form onSubmit={handleAdd} className="p-4">
        <div className="flex flex-col gap-4 text-neutral-content">
          <div>
            <p className="mb-1">Title</p>
            <input type="text" name="title" required />
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Add Category"}
          </button>
        </div>
      </form>
    </section>
  );
}
