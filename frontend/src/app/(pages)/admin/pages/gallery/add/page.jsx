"use client";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAddGalleryMutation } from "@/Redux/api/galleryApi";

export default function AddGallery() {
  const router = useRouter();
  const [image, setImage] = useState([]);

  const [addGallery, { isLoading }] = useAddGalleryMutation();

  const handleAddGallery = async (e) => {
    e.preventDefault();

    if (image?.length <= 0) return toast.error("Image is required");

    // check image size max 1mb
    if (image[0]?.file.size > 1000000) {
      return toast.error("Image size must be less than 1mb");
    }

    const formData = new FormData();
    formData.append("image", image[0]?.file);

    const res = await addGallery(formData);
    if (res?.data?.success) {
      toast.success("Gallery image added successfully");
      e.target.reset();
      setImage([]);
      router.push("/admin/pages/gallery/all");
    } else {
      toast.error(res?.data?.message || "Failed to add training");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <div className="p-3 border-b">
          <h2 className="font-semibold">Add Gallery</h2>
        </div>

        <div className="p-3 text-neutral/90 text-sm">
          <form onSubmit={handleAddGallery} className="flex flex-col gap-4">
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
                      className="rounded border border-dashed p-4 flex items-center gap-4 sm:gap-10"
                      {...dragProps}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          onClick={onImageUpload}
                          className="w-max cursor-pointer rounded-2xl bg-primary px-4 py-1.5 text-sm text-base-100"
                        >
                          Choose Image
                        </span>

                        <p className="text-neutral-content">
                          or Drop here <small>(max size 1mb)</small>
                        </p>
                      </div>

                      <div className={`${image?.length > 0 && "mt-4"} `}>
                        {image?.map((img, index) => (
                          <div key={index} className="image-item relative">
                            <img
                              src={img["data_url"]}
                              alt="training"
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

            <button disabled={isLoading} className="primary_btn w-max">
              {isLoading ? "Loading..." : "Add Gallery"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
