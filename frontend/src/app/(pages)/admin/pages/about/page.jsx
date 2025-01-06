"use client";
import { useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";
import {
  useAddAboutMutation,
  useGetAboutQuery,
  useUpdateAboutMutation,
} from "@/Redux/api/aboutApi";

export default function About() {
  const [file, setFile] = useState(null);

  const { data } = useGetAboutQuery();
  const about = data?.data;
  const id = about?._id;

  const [updateAbout, { isLoading: updateLoading }] = useUpdateAboutMutation();
  const [addAboutUs, { isLoading: createLoading }] = useAddAboutMutation();

  const handleAbout = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const subTitle = e.target.subTitle.value;
    const description = e.target.description.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    if (file) formData.append("image", file);

    if (id) {
      try {
        const res = await updateAbout({ id, formData });
        if (res?.data?.success) {
          toast.success("About update success");
          setFile(null);
        } else {
          toast.error(res?.data?.message || "something went wrong!");
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      }
    } else {
      try {
        const res = await addAboutUs(formData);
        if (res?.data?.success) {
          setFile(null);
          toast.success("About create success");
        } else {
          toast.error(res?.data?.message || "something went wrong!");
          console.log(res);
        }
      } catch (error) {
        toast.error(error?.message);
        console.log(error);
      }
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">About Info</h3>
      </div>

      <form onSubmit={handleAbout} className="p-4">
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col gap-3">
            <div>
              <p className="mb-1">Title</p>
              <input
                type="text"
                name="title"
                className="border"
                defaultValue={about?.title}
              />
            </div>

            <div>
              <p className="mb-1">SubTitle</p>
              <input
                type="text"
                name="subTitle"
                className="border"
                defaultValue={about?.subTitle}
              />
            </div>

            <div>
              <p className="mb-1">Image</p>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {file && (
                <div className="relative w-max">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Image Preview"
                    style={{
                      width: "200px",
                      height: "auto",
                      marginTop: "10px",
                    }}
                  />

                  <button
                    onClick={() => {
                      document.getElementById("fileInput").value = "";
                      setFile(null);
                    }}
                    className="absolute right-0 top-0 text-xl text-red-500"
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              )}

              {about && (
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${about?.image}`}
                  alt="about"
                  className="mt-4 w-32"
                />
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-1">Description</p>
            <textarea
              name="description"
              rows={15}
              defaultValue={about?.description}
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={updateLoading || createLoading}
            className="primary_btn"
          >
            {updateLoading || createLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
