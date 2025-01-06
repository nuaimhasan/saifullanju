"use client";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/Redux/api/serviceApi";
import JoditEditor from "jodit-react";

export default function EditService() {
  const editor = useRef(null);
  const { id } = useParams();
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");

  const { data } = useGetSingleServiceQuery(id);
  const service = data?.data;

  useEffect(() => {
    if (data?.success) setDescription(service?.description);
  }, [data, service]);

  const [updateService, { isLoading }] = useUpdateServiceMutation();

  //------------Handle Edit Product
  const handleEditService = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (image?.length > 0) formData.append("icon", image[0].file);

    const res = await updateService({ id, formData });

    if (res?.data?.success) {
      toast.success("Service updated successfully");
      e.target.reset();
      router.push("/admin/services/all");
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="flex items-center justify-between border-b p-4 font-medium text-neutral">
        <h3>Edit Service</h3>
      </div>

      <form onSubmit={handleEditService} className="p-4">
        <div className="flex flex-col gap-4 text-neutral-content">
          <div>
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                required
                defaultValue={service?.title}
              />
            </div>
          </div>

          <div className="grid gap-3 rounded border border-dashed p-4 sm:grid-cols-2">
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

            {service?.icon && (
              <div className="border-l">
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${service?.icon}`}
                  alt="service"
                  className="mx-auto w-28"
                />
              </div>
            )}
          </div>

          <div className="h400">
            <p className="mb-1">Service Description</p>
            <JoditEditor
              ref={editor}
              value={description}
              tabIndex={1}
              onBlur={(newContent) => setDescription(newContent)}
            />
          </div>
        </div>

        <div className="mt-6">
          <button disabled={isLoading && "disabled"} className="primary_btn">
            {isLoading ? "Loading..." : "Edit Service"}
          </button>
        </div>
      </form>
    </section>
  );
}
