"use client";
import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useRouter } from "next/navigation";
import { useGetAllCategoryQuery } from "@/Redux/api/blog/categoryApi";
import { useAddBlogMutation } from "@/Redux/api/blog/blogApi";

export default function AddBlog() {
  const router = useRouter();
  const editor = useRef(null);
  const [description, setDiscription] = useState("");
  const [image, setImage] = useState([]);

  const { data } = useGetAllCategoryQuery();
  const categories = data?.data;

  const [addBlog, { isLoading }] = useAddBlogMutation();

  //------------Handle Add Product
  const handleAddBlog = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const category = e.target.category.value;

    if (image?.length <= 0) {
      return toast.error("Image is required");
    }

    if (description === "") {
      return toast.error("Description is required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image[0].file);
    formData.append("category", category);

    const res = await addBlog(formData);

    if (res?.data?.success) {
      toast.success("Blog added successfully");
      e.target.reset();
      setImage([]);
      router.push("/admin/blog/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Add Blog</h3>
      </div>

      <form className="p-4" onSubmit={handleAddBlog}>
        <div className="flex flex-col gap-4 text-neutral-content">
          <div>
            <p className="mb-1">Title</p>
            <input type="text" name="title" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="mb-1">Image</p>
              <div>
                <ImageUploading
                  defaultValue={image}
                  onChange={(icn) => setImage(icn)}
                  dataURLKey="data_url"
                >
                  {({ onImageUpload, onImageRemove, dragProps }) => (
                    <div
                      className="rounded border border-dashed p-4"
                      {...dragProps}
                    >
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
                              alt=""
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

            <div>
              <p className="mb-1">Category</p>
              <select name="category">
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
              onBlur={(newContent) => setDiscription(newContent)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading} className="primary_btn">
            {isLoading ? "Loading..." : "Add Blog"}
          </button>
        </div>
      </form>
    </section>
  );
}
