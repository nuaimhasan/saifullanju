"use client";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAddBookMutation } from "@/Redux/api/book/bookApi";

export default function AddTraining() {
  const editor = useRef(null);
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");

  const [addBook, { isLoading }] = useAddBookMutation();

  const handleAddTraining = async (e) => {
    e.preventDefault();

    if (image?.length <= 0) return toast.error("Image is required");

    // check image size max 2mb
    if (image[0].file.size > 2000000) {
      return toast.error("Image size should be less than 2mb");
    }

    if (description === "") return toast.error("Description is required");

    const title = e.target.trainingTitle.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const discount = e.target.discount.value;

    const data = {
      title,
      price,
      quantity,
      discount,
      description,
    };

    const formData = new FormData();
    formData.append("image", image[0]?.file);
    formData.append("data", JSON.stringify(data));

    const res = await addBook(formData);
    if (res?.data?.success) {
      toast.success("Book added successfully");
      e.target.reset();
      setImage([]);
      setDescription("");
      router.push("/admin/book/all");
    } else {
      toast.error(res?.data?.message || "Failed to add training");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <div className="p-3 border-b">
          <h2 className="font-semibold">Add Book</h2>
        </div>

        <div className="p-3 text-neutral/90 text-sm">
          <form onSubmit={handleAddTraining} className="flex flex-col gap-4">
            <div>
              <p>Title</p>
              <input type="text" name="trainingTitle" required />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p>Price</p>
                <input type="number" name="price" required />
              </div>
              <div>
                <p>Quantity</p>
                <input type="number" name="quantity" required />
              </div>
              <div>
                <p>
                  Discount <small>%</small>
                </p>
                <input type="number" name="discount" required />
              </div>
            </div>

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
                          or Drop here <small>(max size 2mb)</small>
                        </p>
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

            <div className="h400">
              <p className="mb-1">Description</p>
              <JoditEditor
                ref={editor}
                value={description}
                tabIndex={1}
                onBlur={(newContent) => setDescription(newContent)}
              />
            </div>

            <button disabled={isLoading} className="primary_btn w-max">
              {isLoading ? "Loading..." : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
