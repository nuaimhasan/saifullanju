"use client";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ImageUploading from "react-images-uploading";
import { toast } from "react-hot-toast";
import { useAddTrainingMutation } from "@/Redux/api/training/trainingApi";
import { useRouter } from "next/navigation";
import Features from "@/app/components/admin/training/Features";
import FAQs from "@/app/components/admin/training/FAQs";

export default function AddTraining() {
  const editor = useRef(null);
  const router = useRouter();
  const [image, setImage] = useState([]);
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const [addTraining, { isLoading }] = useAddTrainingMutation();

  const handleAddTraining = async (e) => {
    e.preventDefault();

    if (image?.length <= 0) return toast.error("Image is required");

    // check image size max 2mb
    if (image[0].file.size > 2000000) {
      return toast.error("Image size should be less than 2mb");
    }

    if (description === "") return toast.error("Description is required");

    const title = e.target.trainingTitle.value;
    const startDate = e.target.startDate.value;
    const endDate = e.target.endDate.value;
    const time = e.target.time.value;
    const price = e.target.price.value;
    const sl = e.target.sl.value;
    const address = e.target.address.value;

    const data = {
      title,
      startDate,
      endDate,
      time,
      description,
      price,
      features,
      faqs,
      sl,
      address,
    };

    const formData = new FormData();
    formData.append("image", image[0]?.file);
    formData.append("data", JSON.stringify(data));

    const res = await addTraining(formData);
    if (res?.data?.success) {
      toast.success("Training added successfully");
      e.target.reset();
      setImage([]);
      setDescription("");
      setFeatures([]);
      setFaqs([]);
      router.push("/admin/training/all");
    } else {
      toast.error(res?.data?.message || "Failed to add training");
      console.log(res);
    }
  };

  return (
    <section>
      <div className="bg-base-100 rounded shadow">
        <div className="p-3 border-b">
          <h2 className="font-semibold">Add Training</h2>
        </div>

        <div className="p-3 text-neutral/90 text-sm">
          <form onSubmit={handleAddTraining} className="flex flex-col gap-4">
            <div>
              <p>Title</p>
              <input type="text" name="trainingTitle" required />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p>Training Fee</p>
                <input type="number" name="price" required />
              </div>
              <div>
                <p>SL</p>
                <input type="text" name="sl" required />
              </div>
              <div>
                <p>Start Date</p>
                <input type="date" name="startDate" required />
              </div>
              <div>
                <p>End Date</p>
                <input type="date" name="endDate" />
              </div>
              <div>
                <p>Start Time</p>
                <input type="time" name="time" required />
              </div>
              <div className="col-span-2 md:col-span-3">
                <p>Address</p>
                <input type="text" name="address" required />
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

            <Features features={features} setFeatures={setFeatures} />
            <FAQs faqs={faqs} setFaqs={setFaqs} />

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
              {isLoading ? "Loading..." : "Add Training"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
