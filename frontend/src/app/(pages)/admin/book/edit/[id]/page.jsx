"use client";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  useGetBookByIdQuery,
  useUpdateBookMutation,
} from "@/Redux/api/book/bookApi";

export default function EditBook() {
  const { id } = useParams();
  const editor = useRef(null);
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");

  const { data } = useGetBookByIdQuery(id);
  const book = data?.data;

  useEffect(() => {
    if (book) setDescription(book?.description);
  }, [book]);

  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const handleEditBook = async (e) => {
    e.preventDefault();

    // check image size max 2mb
    if (image?.length && image[0].file.size > 2000000) {
      return toast.error("Image size should be less than 2mb");
    }

    if (description === "") return toast.error("Description is required");

    const title = e.target.bookTitle.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
    const discount = e.target.discount.value;

    const data = {
      title,
      description,
      price,
      quantity,
      discount,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    if (image?.length > 0) {
      formData.append("image", image[0]?.file);
    }

    const res = await updateBook({ id, formData });
    if (res?.data?.success) {
      toast.success("Book update successfully");
      e.target.reset();
      setImage([]);
      setDescription("");
      router.push("/admin/book/all");
    } else {
      toast.error(res?.data?.message || "Failed to update training");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <div className="p-3 border-b">
          <h2 className="font-semibold">Edit Book</h2>
        </div>

        <div className="p-3 text-neutral/90 text-sm">
          <form onSubmit={handleEditBook} className="flex flex-col gap-4">
            <div>
              <p>Title</p>
              <input
                type="text"
                name="bookTitle"
                required
                defaultValue={book?.title}
              />
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <p>Price</p>
                <input
                  type="number"
                  name="price"
                  required
                  defaultValue={book?.price}
                />
              </div>
              <div>
                <p>Quantity</p>
                <input
                  type="number"
                  name="quantity"
                  required
                  defaultValue={book?.quantity}
                />
              </div>
              <div>
                <p>
                  Discount <small>%</small>
                </p>
                <input
                  type="number"
                  name="discount"
                  required
                  defaultValue={book?.discount}
                />
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

                      <div>
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

                        {!image?.length && book?.image && (
                          <Image
                            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book?.image}`}
                            alt="img"
                            className="w-24"
                            width={100}
                            height={100}
                          />
                        )}
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
              {isLoading ? "Loading..." : "Edit Book"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
