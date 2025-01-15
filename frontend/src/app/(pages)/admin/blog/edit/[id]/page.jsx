"use client";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleBlogQuery,
  useUpdateBlogMutation,
} from "@/Redux/api/blog/blogApi";
import { useGetAllCategoryQuery } from "@/Redux/api/blog/categoryApi";

export default function EditBlog() {
  const router = useRouter();
  const editor = useRef(null);
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { id } = useParams();
  const { data } = useGetSingleBlogQuery(id);
  const blog = data?.data;

  const { data: category } = useGetAllCategoryQuery();
  const categories = category?.data;

  useEffect(() => {
    if (blog) {
      setDescription(blog?.description);
      setSelectedCategory(blog?.category?._id);
    }
  }, [data, blog]);

  const [updateBlog, { isLoading }] = useUpdateBlogMutation();

  //------------Handle Edit Blog
  const handleEditBlog = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", selectedCategory);

    if (image?.length > 0) {
      formData.append("image", image[0].file);
    }

    const res = await updateBlog({ id, formData });

    if (res?.data?.success) {
      toast.success("Blog updated successfully");
      e.target.reset();
      router.push("/admin/blog/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit Blog</h3>
      </div>

      <form onSubmit={handleEditBlog} className="p-4">
        <div className="flex flex-col gap-4 text-neutral-content">
          <div>
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={blog?.title}
              />
            </div>
          </div>

          <div className="grid gap-3 rounded border border-dashed p-4 sm:grid-cols-2">
            <div>
              <div>
                <p className="mb-1">Image</p>
                <div>
                  <ImageUploading
                    defaultValue={image}
                    onChange={(icn) => setImage(icn)}
                    dataURLKey="data_url"
                  >
                    {({ onImageUpload, onImageRemove, dragProps }) => (
                      <div {...dragProps}>
                        <div className="flex items-center gap-2">
                          <span
                            onClick={onImageUpload}
                            className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                          >
                            Choose Image
                          </span>

                          <p className="text-neutral-content">or Drop here</p>
                        </div>

                        <div className={`${image?.length > 0 && "mt-4"} `}>
                          {image?.map((img, index) => (
                            <div key={index} className="image-item relative">
                              <img
                                src={img["data_url"]}
                                alt="blog"
                                className="w-24"
                              />
                              <div
                                onClick={() => onImageRemove(index)}
                                className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-primary text-base-100"
                              >
                                <AiFillDelete />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </ImageUploading>
                </div>
              </div>

              {blog?.image && (
                <div className="border-l">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog?.image}`}
                    alt="blog"
                    className="mx-auto w-28"
                  />
                </div>
              )}
            </div>

            <div>
              <p className="mb-1">Category</p>
              <select
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
                {categories?.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="h400">
            <p className="mb-1">Description</p>
            <JoditEditor
              ref={editor}
              value={description}
              tabIndex={1}
              onBlur={(newContent) => setDescription(newContent)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Blog"}
          </button>
        </div>
      </form>
    </section>
  );
}
