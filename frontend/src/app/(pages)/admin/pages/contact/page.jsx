"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MultiSocial from "./MultiSocial";
import {
  useAddContactMutation,
  useGetContactQuery,
  useUpdateContactMutation,
} from "@/Redux/api/contactApi";

export default function ContactUs() {
  const [social, setSocial] = useState([]);

  const { data } = useGetContactQuery();
  const contact = data?.data;
  const id = contact?._id;

  useEffect(() => {
    if (contact?.socials) {
      setSocial(contact?.socials);
    }
  }, [contact]);

  const [addContact, { isLoading }] = useAddContactMutation();
  const [updateContact, { isLoading: uLoading }] = useUpdateContactMutation();

  const hanldeContact = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const phone = e.target.phone.value;
    const title = e.target.title.value;
    const description = e.target.description.value;

    const data = {
      email,
      phone,
      title,
      description,
      socials: social,
    };

    if (id) {
      const res = await updateContact({ id, data });
      if (res?.data?.success) {
        toast.success("Contact Update Success");
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    } else {
      const res = await addContact(data);
      if (res?.data?.success) {
        toast.success("Contact Add Success");
      } else {
        toast.error(res?.data?.message || "something went wrong!");
        console.log(res);
      }
    }
  };

  return (
    <section className="rounded bg-base-100 shadow">
      <div className="border-b p-4">
        <h3 className="font-medium text-neutral">Contact Us</h3>
      </div>

      <form className="p-4" onSubmit={hanldeContact}>
        <div className="grid items-start gap-4 text-neutral-content sm:grid-cols-2 md:grid-cols-3">
          <div className="sm:col-span-3">
            <p className="mb-1">Section Title</p>
            <input
              type="text"
              name="title"
              defaultValue={contact?.title}
              required
            />
          </div>

          <div className="sm:col-span-3">
            <p className="mb-1">Section Description</p>
            <textarea
              name="description"
              required
              defaultValue={contact?.description}
            ></textarea>
          </div>

          <div>
            <p className="mb-1">Email</p>
            <input
              type="email"
              name="email"
              required
              defaultValue={contact?.email}
            />
          </div>

          <div>
            <p className="mb-1">Number</p>
            <input
              type="tel"
              name="phone"
              required
              defaultValue={contact?.phone}
            />
          </div>
        </div>

        <div className="mt-4 grid">
          <MultiSocial social={social} setSocial={setSocial} />
        </div>

        <div className="mt-5">
          <div className="flex gap-2">
            <button disabled={isLoading || uLoading} className="primary_btn">
              {isLoading || uLoading ? "uLoading..." : "Save"}{" "}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
