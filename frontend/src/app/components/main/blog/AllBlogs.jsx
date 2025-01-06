"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import moment from "moment";
import { useGetAllBlogQuery } from "@/Redux/api/blog/blogApi";
import Pagination from "../../Pagination/Pagination";

export default function AllBlogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const search = searchParams.get("search");

  let query = {};
  if (category) query.category = category;
  if (search) query.search = search;
  query.page = currentPage;
  query.limit = 12;

  const { data } = useGetAllBlogQuery(query);
  const blogs = data?.data;

  return (
    <>
      <div className="mt-4 grid sm:grid-cols-2 gap-2 md:grid-cols-3">
        {blogs?.map((blog) => (
          <Link
            key={blog?._id}
            href={`/blogs/${blog?.slug}`}
            className="rounded-md bg-white shadow transition delay-75 duration-300 ease-in-out hover:scale-105"
          >
            <div className="relative h-[105px] w-full sm:h-40">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog?.image}`}
                alt="blog"
                className="h-full w-full rounded-t-md"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 flex items-center gap-x-2">
                <span className="rounded-md bg-secondary p-1 text-[8px] text-white">
                  {blog?.category?.title}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-y-1 p-3">
              <h2 className="text-lg font-medium leading-5">{blog?.title}</h2>
              <p className="mt-2 text-xs text-neutral-content">
                {moment(blog?.createdAt).startOf("hour").fromNow()}
              </p>
              <div className="bg_gradient mt-2 w-max rounded px-2 py-1 text-[13px] text-base-100">
                Read More
              </div>
            </div>
          </Link>
        ))}
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}
