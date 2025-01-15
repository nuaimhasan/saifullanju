"use client";
import { useGetAllBlogQuery } from "@/Redux/api/blog/blogApi";
import Link from "next/link";

export default function Blogs() {
  const { data } = useGetAllBlogQuery({
    limit: 4,
  });
  const blogs = data?.data;
  const plainText = blogs?.[0]?.description?.replace(/<[^>]+>/g, "");
  const blog3 = blogs?.slice(1, 4);

  return (
    <section className="mt-10 overflow-hidden bg-base-100/80 pb-10">
      <div className="container">
        <h2 className="mx-auto w-max rounded-xl bg-secondary/10 px-3 py-1 text-xs text-secondary">
          📰 Blogs
        </h2>
        <div className="mt-2 text-center text-3xl font-bold text-primary sm:text-4xl">
          <h2>See Our Latest Blog</h2>
        </div>

        <div className="mt-5 grid items-start gap-3 sm:mt-8 sm:grid-cols-2">
          <div data-aos="fade-right" className="rounded bg-base-100 shadow">
            <Link href={`/blogs/${blogs?.[0]?.slug}`}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blogs?.[0]?.image}`}
                alt="blog"
                className="h-44 w-full rounded-t sm:h-[315px]"
                loading="lazy"
              />
            </Link>

            <div className="p-2">
              <Link
                href={`/blogs/${blogs?.[0]?.slug}`}
                className="duration-200 hover:text-primary"
              >
                <h2 className="font-semibold sm:text-xl">
                  {blogs?.[0]?.title}
                </h2>
              </Link>

              <p className="mt-2 text-xs text-neutral-content sm:text-sm">
                {plainText?.length > 100
                  ? plainText?.slice(0, 100) + "..."
                  : plainText}
              </p>

              <div className="mt-3">
                <Link
                  href={`/blogs/${blogs?.[0]?.slug}`}
                  className="primary_btn text-sm w-max"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {blog3?.map((blog) => {
              const plainText = blog?.description?.replace(/<[^>]+>/g, "");
              return (
                <div
                  key={blog?._id}
                  data-aos="fade-down-left"
                  className="grid grid-cols-5 gap-2 rounded bg-base-100 shadow sm:gap-4"
                >
                  <Link href={`/blogs/${blog?.slug}`} className="col-span-2">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog?.image}`}
                      alt="blog"
                      className="col-span-2 h-20 w-full rounded-l sm:h-32 object-cover"
                      loading="lazy"
                    />
                  </Link>

                  <div className="col-span-3">
                    <Link
                      href={`/blogs/${blog?.slug}`}
                      className="duration-200 hover:text-primary"
                    >
                      <h2 className="font-semibold sm:text-lg">
                        {blog?.title?.length > 50
                          ? blog?.title?.slice(0, 50) + "..."
                          : blog?.title}
                      </h2>
                    </Link>
                    <p className="mt-2 text-sm text-neutral-content">
                      {plainText?.length > 100
                        ? plainText?.slice(0, 100) + "..."
                        : plainText}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
