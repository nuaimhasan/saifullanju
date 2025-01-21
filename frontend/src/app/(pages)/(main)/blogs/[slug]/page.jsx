import moment from "moment";
import parser from "html-react-parser";
import PageViewClient from "@/app/hooks/PageViewClient";

async function getData(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/slug/${slug}`
  );
  const data = await res.json();

  return { blog: data?.data };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { blog } = await getData(slug);

  return {
    title: blog?.title,
    description: blog?.description,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs`),
    metadataPath: blog?.slug,

    image: blog?.image,
    type: "article",

    twitter: {
      card: "summary_large_image",
      title: blog?.title,
      description: blog?.description,
      image: blog?.image,
    },

    openGraph: {
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog?.slug}`,
      title: blog?.title,
      description: blog?.description,
      images: [
        {
          url: blog?.image,
          alt: blog?.title,
        },
      ],
    },
  };
}

export default async function BlogDetails({ params }) {
  const { slug } = await params;
  const { blog } = await getData(slug);

  return (
    <>
      <PageViewClient title={slug} url={`/blogs/${slug}`} />
      <section className="py-4">
        <div className="container">
          <div className="grid gap-6 xl:grid-cols-4">
            <div className="xl:col-span-3">
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/blogs/${blog?.image}`}
                alt={blog?.title}
                className="h-48 w-full rounded-lg sm:h-96"
                loading="lazy"
              />
              <p className="mt-2 text-xs text-neutral-content">
                created: {moment(blog?.createdAt).format("MMM Do YYYY")}
              </p>

              <h2 className="mt-2 text-3xl font-semibold">{blog?.title}</h2>

              <div className="mt-4 text-sm text-neutral-content">
                {blog?.description && parser(blog?.description)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
