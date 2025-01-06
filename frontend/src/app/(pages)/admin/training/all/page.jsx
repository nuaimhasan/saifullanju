"use client";
import { ImBin2 } from "react-icons/im";
import {
  useGetAllTrainingQuery,
  useSoftDeleteTrainingMutation,
} from "@/Redux/api/training/trainingApi";
import Link from "next/link";
import { AiOutlineEdit } from "react-icons/ai";
import moment from "moment";
import Image from "next/image";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AllTraining() {
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;

  const { data } = useGetAllTrainingQuery({
    page: currentPage,
    limit,
  });
  const trainings = data?.data;

  const [softDeleteTraining] = useSoftDeleteTrainingMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm(
      "The record will not be deleted from the database, only the status will be changed."
    );
    if (isConfirm) {
      const res = await softDeleteTraining(id);
      if (res?.data?.success) {
        toast.success("Training Status Update success");
      } else {
        toast.error(res.data.message || "Failed to delete Training");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Training</h1>
          <Link href="/admin/training/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>
      </div>

      <div className="relative mt-1 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Title</th>
              <th>Training Fee</th>
              <th>Start Date</th>
              <th>Start Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trainings?.map((training, i) => (
              <tr key={training?._id}>
                <td>{i + 1}</td>
                <td>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${training?.image}`}
                    alt="img"
                    className="h-8 w-14 rounded"
                    width={100}
                    height={100}
                  />
                </td>
                <td>{training?.title}</td>
                <td>{training?.price} BDT</td>
                <td>{moment(training?.startDate).format("DD MMM YYYY")}</td>
                <td>{moment(training?.time, "HH:mm").format("h:mm A")}</td>
                <td>
                  <p
                    className={`text-center rounded py-1 text-xs ${
                      training?.isActive
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {training?.isActive ? "Active" : "Close"}
                  </p>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/training/edit/${training?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(training?._id)}>
                      <ImBin2 className="hover:text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
