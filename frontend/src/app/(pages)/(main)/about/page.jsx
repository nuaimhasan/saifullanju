import PageViewClient from "@/app/hooks/PageViewClient";
import { useGetData } from "@/Hook/useGetData";
import Link from "next/link";
import React from "react";
import * as FaIcons from "react-icons/fa";

export default async function About() {
  const data = await useGetData("about");
  const about = data?.data;

  const contactInfo = await useGetData("contact");
  const contact = contactInfo?.data;

  return (
    <>
      <PageViewClient title="About" url="/about" />
      <section className="about py-10">
        <div className="container">
          <div className="grid items-start gap-10 sm:grid-cols-2 sm:gap-0">
            <div className="fade_up relative">
              <h3 className="w-max rounded-xl bg-secondary px-3 py-1 text-sm text-base-100">
                {about?.subTitle}
              </h3>

              <h2 className="my-4 text-2xl font-bold sm:text-5xl">
                {about?.title}
              </h2>

              <p className="hidden text-sm text-neutral-content sm:block">
                {about?.description}
              </p>

              <div className="social_list mt-6 flex w-max gap-3 text-sm">
                {contact?.socials?.map((social, i) => (
                  <Link
                    key={i}
                    href={social?.url}
                    target="_blank"
                    className="text-2xl text-primary"
                  >
                    {React.createElement(FaIcons[social?.icon])}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${about?.image}`}
                alt="about"
                className="hero_img h-72 w-72 sm:w-1/2 md:h-[23rem] md:w-full lg:h-[26rem] lg:w-[26rem] ml-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
