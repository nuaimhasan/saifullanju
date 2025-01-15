"use client";
import "@/app/styles/header.css";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineMenu } from "react-icons/ai";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/Redux/api/user/userSlice";
import Logo from "../../Logo/Logo";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isbg, setIsbg] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const dispatch = useDispatch();

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  useEffect(() => {
    if (pathname !== "/") {
      setIsbg(true);
    } else {
      setIsbg(false);
    }

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsbg(true);
      } else {
        setIsbg(false);
      }
    };

    if (pathname == "/") {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", (e) => {
        if (e.target.closest(".menu_wrap ul a")) {
          setIsOpen(false);
        }
      });
    }
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full py-4 text-base-100 ${
        isbg && "bg_gradient"
      } duration-300`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <Logo />

          <div>
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
              <AiOutlineMenu className="text-2xl" />
            </button>

            <button
              onClick={() => setIsOpen(false)}
              className={`${isOpen && "menu_overlay"} lg:hidden`}
            ></button>

            <nav className={`menu_wrap ${isOpen && "menu_open"}`}>
              <button
                onClick={() => setIsOpen(false)}
                className="mb-4 mt-2 flex w-full justify-end lg:hidden"
              >
                <AiOutlineCloseCircle className="text-2xl" />
              </button>

              <ul className="flex flex-col gap-6 text-sm lg:flex-row lg:items-center">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/training">Training</Link>
                </li>
                <li>
                  <Link href="/video-courses">Video Courses</Link>
                </li>
                <li>
                  <Link href="/books">Books</Link>
                </li>
                <li>
                  <Link href="/services">Services</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  {loggedUser?.success ? (
                    <div className="relative">
                      <button
                        onClick={() => setProfileDropdown(!profileDropdown)}
                        className="w-7 h-7 rounded-full flex justify-center items-center border border-base-100"
                      >
                        <FaUserAlt />
                      </button>

                      {profileDropdown && (
                        <div className="absolute top-8 right-0 bg-base-100 border rounded shadow min-w-56 text-neutral">
                          <div className="px-4 py-3 text-sm">
                            <div>{user?.name}</div>
                            <div className="font-medium truncate">
                              {user?.email}
                            </div>
                          </div>
                          <ul className="py-2 text-sm border-y">
                            <li>
                              <Link
                                href="/user/dashboard"
                                className="block px-4 py-2 hover:bg-gray-100"
                              >
                                Dashboard
                              </Link>
                            </li>
                          </ul>
                          <div className="py-1">
                            <button
                              onClick={() => dispatch(userLogout())}
                              className="px-4 py-2 text-sm text-red-500"
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href="/login">Login</Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
