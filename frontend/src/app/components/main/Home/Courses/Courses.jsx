import { CiMonitor } from "react-icons/ci";
import "@/app/styles/taining.css";
import { CgArrowRight } from "react-icons/cg";
import Link from "next/link";

export default function Courses() {
  return (
    <section className="py-5">
      <div className="container">
        <div>
          <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
            Video Courses
          </h2>
        </div>

        <div className="bg-base-100 shadow rounded sm:p-4 sm:border mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          <Link href={``} className="taining_card">
            <div className="overflow-hidden rounded-t">
              <img src="/taining.jpg" alt="taining" className="w-full h-40" />
            </div>

            <div className="border-b p-1.5 text-[10px] font-medium bg-base-100">
              <div className="flex items-center gap-1 bg-gray-100 text-neutral py-1 px-1.5 rounded w-max">
                <CiMonitor className="text-[15px]" /> 100 Video
              </div>
            </div>

            <div className="p-2">
              <h3 className="text-lg font-semibold leading-6">
                Coding Interview Preparation (Local+Remote Job)
              </h3>

              <div className="mt-2">
                <button className="w-full bg_gradient py-1 rounded text-[15px] flex items-center justify-center gap-2 font-medium">
                  Enroll Now
                  <i>
                    <CgArrowRight className="text-xl" />
                  </i>
                </button>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
