import Image from "next/image";
import Link from "next/link";
import { BsCalendarDate } from "react-icons/bs";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import parser from "html-react-parser";
import moment from "moment";
import Faq from "./Faq";
import { useGetData } from "@/Hook/useGetData";
import PageViewClient from "@/app/hooks/PageViewClient";
import ViewTrainingItem from "@/app/hooks/ViewTrainingItem";

export default async function TrainingDetails({ params }) {
  const { slug } = params;

  const data = await useGetData(`training/slug/${slug}`);
  const training = data?.data;

  return (
    <>
      <section className="pt-8">
        <div className="container">
          <div className="grid sm:grid-cols-2 gap-6 items-start">
            <div>
              <h1 className="text-2xl font-semibold text-neutral">
                {training?.title}
              </h1>

              <div className="text-neutral-content mt-4 text-sm">
                <div>
                  {training?.description && parser(training?.description)}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4">
                <Link
                  href={`/training/checkout/${training?.slug}`}
                  className="bg_gradient flex items-center gap-2 px-4 py-2 rounded text-sm"
                >
                  Enroll Now <MdKeyboardArrowRight className="text-base" />
                </Link>

                <h4 className="font-semibold text-neutral text-2xl">
                  {training?.discountPrice && training?.discountPrice > 0 ? (
                    <>
                      <del className="text-base text-red-500 pr-2">
                        ৳{" "}
                        {new Intl.NumberFormat("en-EN", {
                          minimumFractionDigits: 0,
                        }).format(training?.price)}
                      </del>
                      {training?.discountPrice}
                    </>
                  ) : (
                    <>
                      ৳{" "}
                      {new Intl.NumberFormat("en-EN", {
                        minimumFractionDigits: 0,
                      }).format(training?.price)}
                    </>
                  )}
                </h4>
              </div>

              <div className="mt-3">
                <div className="flex items-center gap-1 bg-gray-100 text-neutral py-1 px-1.5 rounded w-max text-xs">
                  <AiOutlineClockCircle />
                  {moment(training?.startDate).diff(moment(), "days")} days left
                </div>
              </div>
            </div>
            <div>
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${training?.image}`}
                alt={training?.title || ""}
                width={500}
                height={300}
                className="rounded"
              />
            </div>
          </div>

          <div className="mt-10 bg-gray-800 text-base-100 rounded-xl p-6 flex flex-col gap-4 items-center justify-center">
            <h2 className="text-3xl font-semibold">{training?.title}</h2>
            <div className="w-max px-3 py-1.5 rounded-lg bg-base-100 text-primary font-medium flex items-center gap-4 text-[13px]">
              <p className="flex items-center gap-1.5">
                <BsCalendarDate className="-mt-px" />{" "}
                {moment(training?.startDate).format("DD MMM YYYY")}
              </p>
              <p className="flex items-center gap-1.5">
                <AiOutlineClockCircle className="-mt-px" />{" "}
                {moment(training?.time, "HH:mm").format("h:mm A")}
              </p>
            </div>

            <Link
              href={`/training/checkout/${training?.slug}`}
              className="bg_gradient flex items-center gap-2 px-4 py-2 rounded text-sm"
            >
              Enroll Now <MdKeyboardArrowRight className="text-base" />
            </Link>
          </div>

          {/* Features */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center">
              Training Features
            </h2>

            <div className="mt-6 grid sm:grid-cols-2 gap-3 text-neutral/90 text-[15px]">
              {training?.features?.map((feature, i) => (
                <div
                  key={feature?._id}
                  className="bg-base-100 shadow rounded p-4 border"
                >
                  {feature?.title}
                </div>
              ))}
            </div>
          </div>

          {/* Why you should join here */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center capitalize">
              Why you should join here
            </h2>

            <div className="mt-6 lg:mx-40">
              {training?.faqs?.map((faq, i) => (
                <Faq key={faq?._id} faq={faq} i={i} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 bg_gradient text-base-100 py-2 sticky bottom-0 z-10">
          <div className="container">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-2xl">
                  {training?.discountPrice && training?.discountPrice > 0 ? (
                    <>
                      <del className="text-base text-red-500 pr-2">
                        ৳{" "}
                        {new Intl.NumberFormat("en-EN", {
                          minimumFractionDigits: 0,
                        }).format(training?.price)}
                      </del>
                      ৳ {training?.discountPrice}
                    </>
                  ) : (
                    <>
                      ৳{" "}
                      {new Intl.NumberFormat("en-EN", {
                        minimumFractionDigits: 0,
                      }).format(training?.price)}
                    </>
                  )}
                </h4>
                <div className="mt-1">
                  <div className="flex items-center gap-1 bg-gray-100 text-neutral py-1 px-1.5 rounded w-max text-[10px]">
                    <AiOutlineClockCircle />{" "}
                    {moment(training?.startDate).diff(moment(), "days")} days
                    left
                  </div>
                </div>
              </div>

              <Link
                href={`/training/checkout/${training?.slug}`}
                className="bg-base-100 text-primary font-semibold flex items-center gap-2 px-4 py-2 rounded text-sm"
              >
                Enroll Now <MdKeyboardArrowRight className="text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <PageViewClient title={slug} url={`/training/${slug}`} />
      <ViewTrainingItem training={training} />
    </>
  );
}
