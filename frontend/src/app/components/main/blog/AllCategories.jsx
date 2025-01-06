"use client";
import Link from "next/link";
import { useGetAllCategoryQuery } from "@/Redux/api/blog/categoryApi";

export default function AllCategories() {
  const { data: category } = useGetAllCategoryQuery();
  const categories = category?.data;

  return (
    <ul className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
      {categories?.map((category) => (
        <li key={category?._id}>
          <Link
            href={`/blogs?category=${category?.slug}`}
            className="duration-200 hover:text-secondary"
          >
            {category?.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
