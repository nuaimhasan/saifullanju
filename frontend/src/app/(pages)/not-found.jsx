import Link from "next/link";
import { BsExclamationLg } from "react-icons/bs";

export default function NotFound() {
  return (
    <section>
      <div className="container">
        <div className="h-screen flex flex-col gap-4 justify-center items-center">
          <h2 className="ml-12 text-8xl text-primary flex items-center">
            Oops
            <span className="-ml-10 text-[7rem]">
              <BsExclamationLg />
            </span>
          </h2>
          <p className="uppercase text-xl">404-page not found</p>
          <p className="text-center -mt-2 text-accent">
            The page you are looking for might have been remove <br /> had its
            name change or temporarily unavailable
          </p>
          <Link href="/" className="bg-primary-g uppercase px-4 py-2.5">
            Go To HomePage
          </Link>
        </div>
      </div>
    </section>
  );
}
