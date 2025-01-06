import React from "react";
import * as FaIcons from "react-icons/fa";
import { useGetData } from "@/Hook/useGetData";
import Link from "next/link";

export default async function Contact() {
  const data = await useGetData("contact");
  const contact = data?.data;

  return (
    <section className="py-10 sm:py-20">
      <div className="container">
        <div className="grid items-start gap-6 sm:grid-cols-2">
          <div className="sm:w-2/3">
            <h2 className="text-3xl font-semibold sm:text-5xl">
              {contact?.title}
            </h2>

            <p className="mt-4 text-neutral-content">{contact?.description}</p>

            <div className="mt-4 text-lg">
              <div className="flex items-center gap-2">
                <p className="text-neutral-content">Phone:</p>
                <a
                  href={`tel:${contact?.phone}`}
                  className="font-semibold italic text-neutral"
                >
                  <p>{contact?.phone}</p>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-neutral-content">Email:</p>
                <a
                  href={`mailto:${contact?.email}`}
                  className="font-semibold italic text-neutral"
                >
                  <p>{contact?.email}</p>
                </a>
              </div>
            </div>

            <div className="about">
              <div className="social_list mt-6 flex w-max gap-3 text-sm">
                {contact?.socials?.map((social, i) => (
                  <Link
                    key={i}
                    href={social?.url}
                    target="_blank"
                    className="text-xl text-neutral duration-300 hover:text-primary"
                  >
                    {React.createElement(FaIcons[social?.icon])}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <form>
            <input
              type="text"
              placeholder="Name"
              name="name"
              className="w-full rounded-md border border-gray-300 p-3"
            />
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              className="mt-4 w-full rounded-md border border-gray-300 p-3"
            />
            <input
              type="date"
              placeholder="Date"
              className="mt-4 w-full rounded-md border border-gray-300 p-3"
            />
            <textarea
              placeholder="Message"
              name="message"
              className="mt-4 w-full rounded-md border border-gray-300 p-3"
              rows={5}
            ></textarea>
            <button className="bg_gradient mt-2 w-full rounded-md p-3 text-white">
              Booking Contact
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
