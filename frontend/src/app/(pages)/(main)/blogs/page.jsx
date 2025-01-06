"use client";
import dynamic from "next/dynamic";
const AllBlogs = dynamic(() => import("@/app/components/main/blog/AllBlogs"), {
  ssr: false,
});
import AllCategories from "@/app/components/main/blog/AllCategories";
import SearchBlog from "@/app/components/main/blog/SearchBlog";

export default function Blogs() {
  return (
    <section className="py-2 sm:py-5">
      <div className="container">
        <div className="grid gap-8 xl:grid-cols-4">
          <div className="xl:col-span-3">
            <div className="items-center justify-between sm:flex">
              <h2 className="mb-3 text-xl sm:text-2xl font-semibold">
                📰 All Blogs
              </h2>
              <div>
                <SearchBlog />
              </div>
            </div>

            <AllBlogs />
          </div>

          <div>
            <div>
              <h2 className="text-2xl font-semibold">Categories</h2>
              <AllCategories />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
