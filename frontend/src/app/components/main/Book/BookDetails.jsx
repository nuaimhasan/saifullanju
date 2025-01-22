"use client";
import Image from "next/image";
import { CgArrowRight } from "react-icons/cg";
import Link from "next/link";
import parser from "html-react-parser";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BookDetailsCom({ book }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid sm:grid-cols-2 gap-6 items-start">
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book?.image}`}
              alt="book"
              width={500}
              height={500}
              className="w-full rounded-lg max-h-[550px] object-cover"
              loading="lazy"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold">{book?.title}</h2>
            <p className="mt-3 text-xl font-semibold">
              Price{" "}
              <span>
                {book?.discount > 0
                  ? parseInt(book?.price - (book?.price * book?.discount) / 100)
                  : book?.price}
              </span>
              {book?.discount > 0 && (
                <del className="text-red-500 text-sm ml-2">{book?.price}</del>
              )}{" "}
              BDT
            </p>

            <div className="mt-6 text-neutral/80 text-lg font-medium">
              <p>Inside Dhaka : 50.00 BDT</p>
              <p>Outside Dhaka : 90.00 BDT</p>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity(quantity - 1);
                  } else {
                    toast.error("You can't order less than 1 quantity");
                  }
                }}
                className="w-10 h-10 border rounded"
              >
                -
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => {
                  if (book?.quantity > quantity) {
                    setQuantity(quantity + 1);
                  } else {
                    toast.error("You can't order more than available quantity");
                  }
                }}
                className="w-10 h-10 border rounded"
              >
                +
              </button>
            </div>

            <div className="mt-6">
              <Link
                href={`/books/checkout/${book?.slug}?quantity=${quantity}`}
                className="book_details_btn w-max"
              >
                Order Now
                <i>
                  <CgArrowRight className="text-xl" />
                </i>
              </Link>
            </div>

            {/* <div className="mt-6">
              <p className="text-neutral-content">Share With Your Friends</p>
            </div> */}
          </div>
        </div>

        <div className="mt-3">
          <h3 className="text-2xl font-medium text-neutral/80">Description</h3>
          <div className="mt-3 font-medium text-neutral-content">
            {book?.description && parser(book?.description)}
          </div>
        </div>
      </div>
    </section>
  );
}
