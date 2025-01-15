import "@/app/styles/taining.css";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { CgArrowRight } from "react-icons/cg";
import moment from "moment";

export default function TrainingCard({ training }) {
  return (
    <div className="taining_card">
      <div>
        <Link
          href={`/training/${training?.slug}`}
          className="overflow-hidden rounded-t"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${training?.image}`}
            alt="taining"
            className="w-full h-48 sm:h-40"
            width={300}
            height={200}
          />
        </Link>

        <div className="border-b p-1.5 text-[10px] font-medium bg-base-100">
          <div className="flex items-center gap-1 bg-gray-100 text-neutral py-1 px-1.5 rounded w-max">
            <AiOutlineClockCircle />
            {moment(training?.startDate)
              .local()
              .startOf("day")
              .diff(moment().startOf("day"), "days")}{" "}
            days left
          </div>
        </div>

        <div className="p-2">
          <Link href={`/training/${training?.slug}`}>
            <h3 className="title text-lg font-semibold leading-6">
              {training?.title}
            </h3>
          </Link>
          <p className="mt-2 text-sm text-neutral/80">
            Date: {moment(training?.startDate).format("DD MMM YYYY")}
          </p>
        </div>
      </div>

      <div className="p-2">
        <Link
          href={`/training/checkout/${training?.slug}`}
          className="w-full bg_gradient py-1 rounded text-[15px] flex items-center justify-center gap-2 font-medium enroll_btn"
        >
          Enroll Now
          <i>
            <CgArrowRight className="text-xl" />
          </i>
        </Link>
      </div>
    </div>
  );
}
