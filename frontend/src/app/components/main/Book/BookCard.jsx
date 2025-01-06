import Link from "next/link";
import "@/app/styles/book.css";
import { CgArrowRight } from "react-icons/cg";
import Image from "next/image";

export default function BookCard({ book }) {
  return (
    <div className="bg_gradient book_card">
      <Link href={`/books/${book?.slug}`}>
        <div className="relative overflow-hidden w-full h-52 sm:h-72 rounded">
          <Image
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book?.image}`}
            alt="book"
            className="rounded w-full h-full object-cover"
            loading="lazy"
            width={300}
            height={300}
          />

          {book?.discount && (
            <p className="absolute top-0 right-0 w-8 h-8 flex justify-center items-center bg-red-500 text-base-100 rounded-full text-sm">
              {book?.discount}
            </p>
          )}
        </div>
      </Link>

      <div className="mt-2">
        <Link href={`/books/${book?.slug}`}>
          <h3 className="text-lg font-semibold">{book?.title}</h3>
        </Link>

        <p className="text-lg">
          <span className="text-base">Price</span>{" "}
          <span>
            {book?.discount > 0
              ? parseInt(book?.price - (book?.price * book?.discount) / 100)
              : book?.price}
          </span>
          {book?.discount > 0 && (
            <del className="text-red-500 text-sm ml-2">{book?.price}</del>
          )}
        </p>
        <div className="mt-2">
          <Link
            href={`/books/checkout/${book?.slug}?quantity=1`}
            className="w-full bg-base-100 text-primary py-1 rounded text-[15px] flex items-center justify-center gap-2 font-medium"
          >
            Order Now
            <i>
              <CgArrowRight className="text-xl" />
            </i>
          </Link>
        </div>
      </div>
    </div>
  );
}
