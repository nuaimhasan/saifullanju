import { useGetData } from "@/Hook/useGetData";
import Link from "next/link";

export default async function Services() {
  const data = await useGetData("service/all");
  const services = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
          Our Services
        </h2>

        <div className="mt-4 grid gap-2 sm:mt-6 sm:grid-cols-2 sm:gap-5">
          {services?.map((service, index) => {
            const description = service?.description.replace(/<[^>]+>/g, "");

            return (
              <Link
                href={`/services/${service?._id}`}
                key={index}
                className="service_card grid items-start sm:grid-cols-3"
              >
                <div className="sm:col-span-2">
                  <h2 className="font-semibold text-secondary sm:text-2xl">
                    {service?.title}
                  </h2>
                  <p className="mt-3 text-sm text-neutral-content">
                    {description?.length > 200
                      ? description?.slice(0, 200) + "..."
                      : description}
                  </p>
                </div>

                <div className="flex items-center justify-center">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${service?.icon}`}
                    alt="service"
                    className="w-20 rounded sm:w-40"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
