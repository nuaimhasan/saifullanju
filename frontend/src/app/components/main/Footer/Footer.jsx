import "@/app/styles/footer.css";
import React from "react";
import * as FaIcons from "react-icons/fa";
import Link from "next/link";
import { useGetData } from "@/Hook/useGetData";
import Logo from "../../Logo/Logo";

export default async function Footer() {
  const data = await useGetData("service/all");
  const services = data?.data;

  const contactInfo = await useGetData("contact");
  const contact = contactInfo?.data;

  return (
    <footer className="footer_wrap bg_gradient">
      <div className="container">
        <div className="grid gap-12 sm:grid-cols-4">
          <div>
            <Logo />
          </div>

          <div>
            <h2 className="text-lg font-medium">Services</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
              {services?.map((service) => (
                <li key={service?._id}>
                  <p className="duration-300 hover:text-base-100 hover:underline">
                    {service?.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium">Quick Link</h2>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-gray-300">
              <li>
                <Link
                  href="/"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/books"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  Training
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/courses"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  Courses
                </Link>
              </li> */}
              <li>
                <Link
                  href="/blogs"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="duration-300 hover:text-base-100 hover:underline"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-medium">follow us</h2>
            <ul className="mt-3 flex gap-3">
              {contact?.socials?.map((social, i) => (
                <Link
                  key={i}
                  href={social?.url}
                  target="_blank"
                  className="social_icons"
                >
                  {React.createElement(FaIcons[social?.icon])}
                </Link>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-4">
          <h2 className="text-center">© Saiful Lanju 2025</h2>
        </div>
      </div>
    </footer>
  );
}
