"use client";
import "@/app/styles/taining.css";
import { useGetAllTrainingOrdersQuery } from "@/Redux/api/training/trainingOrderApi";
import { AiOutlineClockCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function MyTraining() {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const { data: orders } = useGetAllTrainingOrdersQuery({ user: user?.email });
  const trainingOrders = orders?.data;

  return (
    <section>
      <div className="grid sm:grid-cols-2 gap-2 sm:gap-4">
        {trainingOrders?.map((order) => (
          <div
            key={order?._id}
            className="flex items-start gap-4 bg-base-100 border rounded p-4 shadow"
          >
            <div className="overflow-hidden">
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${order?.training?.image}`}
                alt="taining"
                className="w-full h-32 rounded"
                width={300}
                height={200}
              />
            </div>

            <div>
              <div className="text-[10px] flex items-center gap-1 bg-gray-100 text-neutral py-1 px-1.5 rounded w-max">
                <AiOutlineClockCircle />
                {moment(order?.training?.startDate)
                  .local()
                  .startOf("day")
                  .diff(moment().startOf("day"), "days")}{" "}
                days left
              </div>

              <h3 className="mt-2 text-lg font-semibold leading-6">
                {order?.training?.title}
              </h3>
              <p className="mt-2 text-sm">
                Date: {moment(order?.training?.startDate).format("DD MMM YYYY")}
              </p>
              <div className="mt-2">
                <Link
                  href={`/user/my-training/download/ticket/${order?._id}`}
                  className="bg_gradient px-4 py-1 rounded text-sm flex items-center justify-center gap-2 font-medium"
                >
                  Download ticket
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
