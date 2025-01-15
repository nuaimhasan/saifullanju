import Image from "next/image";
import Link from "next/link";

export default function VideoCourses() {
  return (
    <section className="py-5">
      <div className="container">
        <div className="h-[83vh] flex flex-col items-center justify-center">
          <Image
            src="/roket.png"
            alt="roekt"
            className="w-20"
            width={100}
            height={100}
          />

          <div className="mt-2 text-center">
            <h2 className="text-4xl font-extrabold text-secondary">
              Upcoming Video Course
            </h2>

            <p className="mt-2 text-neutral-content tetx-sm">
              We are going to launch our video courses very soon.
            </p>

            <div className="mt-3 flex justify-center">
              <Link
                href="/training"
                className="bg_gradient px-4 py-2 text-sm rounded"
              >
                Visit Training
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
