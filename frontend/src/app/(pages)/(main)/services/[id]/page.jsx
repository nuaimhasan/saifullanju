import { useGetData } from "@/Hook/useGetData";
import Image from "next/image";
import parser from "html-react-parser";

export default async function ServiceDetails({ params }) {
  const { id } = await params;
  const data = await useGetData(`service/${id}`);
  const service = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${service?.icon}`}
            alt="service"
            className="w-20 rounded sm:w-32"
            width={100}
            height={100}
          />
        </div>

        <h2 className="mt-3 text-3xl font-bold text-primary sm:text-4xl">
          {service?.title}
        </h2>

        <p className="mt-3 text-sm text-neutral-content">
          {service?.description && parser(service?.description)}
        </p>
      </div>
    </section>
  );
}
