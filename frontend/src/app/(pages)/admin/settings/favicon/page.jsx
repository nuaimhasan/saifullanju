"use client";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import {
  useAddFaviconMutation,
  useGetFaviconQuery,
  useUpdateFaviconMutation,
} from "@/Redux/api/faviconApi";

export default function Favicon() {
  const [logos, setLogos] = useState([]);
  const { data } = useGetFaviconQuery();
  const icon = data?.data?.icon;
  const id = data?.data?._id;

  const [addFavicon, { isLoading }] = useAddFaviconMutation();
  const [updateFavicon, { isLoading: uLoading }] = useUpdateFaviconMutation();

  const handleLogo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("icon", logos[0]?.file);

    if (id) {
      const res = await updateFavicon({ id, formData });

      if (res?.data?.success) {
        toast.success("Logo updated successfully");
        setLogos([]);
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    } else {
      const res = await addFavicon(formData);

      if (res?.data?.success) {
        toast.success("Logo add successfully");
        setLogos([]);
      } else {
        toast.error(res?.data?.message || "Something went wrong");
        console.log(res);
      }
    }
  };

  return (
    <form onSubmit={handleLogo}>
      <div>
        <p className="border-b p-3 text-neutral-content">
          Favicon <small>(80px/8px)</small>
        </p>
        <div className="items-center gap-4 p-4 sm:flex">
          <ImageUploading
            value={logos}
            onChange={(file) => setLogos(file)}
            dataURLKey="data_url"
          >
            {({ onImageUpload, onImageRemove, dragProps }) => (
              <div
                className="w-max rounded border border-dashed p-4"
                {...dragProps}
              >
                <div className="flex items-center gap-2">
                  <span
                    onClick={onImageUpload}
                    className="cursor-pointer rounded-2xl bg-secondary px-4 py-1.5 text-sm text-base-100"
                  >
                    Choose Image
                  </span>

                  <p className="text-neutral-content">or Drop here</p>
                </div>

                <div className={`${logos?.length > 0 && "mt-4"} `}>
                  {logos?.map((img, index) => (
                    <div key={index} className="image-item relative">
                      <img src={img["data_url"]} alt="" className="w-40" />
                      <div
                        onClick={() => onImageRemove(index)}
                        className="absolute right-0 top-0 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-secondary text-base-100"
                      >
                        <AiFillDelete />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>

          {icon && logos?.length >= 0 && (
            <img
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${icon}`}
              alt="logo"
              className="mt-4 w-32"
              loading="lazy"
            />
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end border-t p-4">
        <button
          disabled={isLoading || uLoading}
          className="secondary_btn text-sm"
        >
          {isLoading || uLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
