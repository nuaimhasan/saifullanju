"use client";
import { useGetAllBookOrdersQuery } from "@/Redux/api/book/bookOrderApi";
import { useGetAllTrainingOrdersQuery } from "@/Redux/api/training/trainingOrderApi";
import Link from "next/link";
import { BiBookReader, BiVideo } from "react-icons/bi";
import { SiSkillshare } from "react-icons/si";
import { useSelector } from "react-redux";

export default function DashboardCard() {
  const { loggedUser } = useSelector((state) => state.user);
  const email = loggedUser?.data?.email;

  const { data: training } = useGetAllTrainingOrdersQuery({
    user: email,
    page: 1,
    limit: 1,
  });
  const { data: book } = useGetAllBookOrdersQuery({
    user: email,
    page: 1,
    limit: 1,
  });

  return (
    <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
      <Link
        href="/user/my-training"
        className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow"
      >
        <div>
          <p className="font-dinMedium text-neutral">My Training</p>
          <h3 className="font-bold text-primary">{training?.meta?.total}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
          <SiSkillshare className="text-xl" />
        </div>
      </Link>

      <Link
        href="/user/my-courses"
        className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow"
      >
        <div>
          <p className="font-dinMedium text-neutral">My Video Courses</p>
          <h3 className="font-bold text-primary">0</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
          <BiVideo className="text-xl" />
        </div>
      </Link>

      <Link
        href="/user/my-books"
        className="flex items-center justify-between rounded-lg bg-base-100 p-4 shadow"
      >
        <div>
          <p className="font-dinMedium text-neutral">My Books</p>
          <h3 className="font-bold text-primary">{book?.meta?.total}</h3>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-base-100">
          <BiBookReader className="text-xl" />
        </div>
      </Link>
    </div>
  );
}
