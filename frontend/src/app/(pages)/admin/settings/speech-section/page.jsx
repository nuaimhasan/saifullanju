"use client";
import {
  useAddSpeechMutation,
  useGetSpeechQuery,
  useUpdateSpeechMutation,
} from "@/Redux/api/speechApi";
import toast from "react-hot-toast";

export default function Speech() {
  const { data } = useGetSpeechQuery();
  const speech = data?.data;
  const id = speech?._id;

  const [addSpeech, { isLoading }] = useAddSpeechMutation();
  const [updateSpeech, { isLoading: uLoading }] = useUpdateSpeechMutation();

  const hanldeSpeech = async (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    const data = {
      title,
      description,
    };

    if (id) {
      const res = await updateSpeech({ id, data });
      if (res?.data?.success) {
        toast.success("speech Update Success");
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = await addSpeech(data);
      if (res?.data?.success) {
        toast.success("speech Add Success");
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="border-b p-2">
        <h3 className="font-medium text-neutral">Speech Info</h3>
      </div>

      <form onSubmit={hanldeSpeech} className="p-2">
        <div className="flex flex-col gap-4">
          <div>
            <p className="mb-1">Title</p>
            <input type="text" name="title" defaultValue={speech?.title} />
          </div>

          <div>
            <p className="mb-1">Description</p>
            <textarea
              name="description"
              rows={8}
              defaultValue={speech?.description}
            ></textarea>
          </div>
        </div>

        <div className="mt-6">
          <button
            disabled={isLoading || uLoading}
            className="primary_btn text-sm"
          >
            {isLoading || uLoading ? "uLoading..." : "Save"}
          </button>
        </div>
      </form>
    </section>
  );
}
