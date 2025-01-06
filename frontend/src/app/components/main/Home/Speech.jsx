import { useGetData } from "@/Hook/useGetData";
import Link from "next/link";

export default async function Speech() {
  const data = await useGetData("speech");
  const speech = data?.data;

  return (
    <section>
      <div className="container">
        <div className="bg_gradient flex items-center justify-center rounded-3xl p-10 text-center text-base-100">
          <div className="mx-auto lg:w-2/3">
            <h2 className="text-2xl font-bold sm:text-4xl">{speech?.title}</h2>
            <p className="mt-4 text-xs text-gray-300 sm:text-sm">
              {speech?.description}
            </p>
            <div className="mt-8 flex items-center justify-center gap-4 text-sm">
              <Link href="/contact" className="primary_btn">
                Contact Me
              </Link>
              <Link href="/about" className="secondary_btn">
                About Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
