"use client";
import { useGetBookBySlugQuery } from "@/Redux/api/book/bookApi";
import { useAddBookOrderOrderMutation } from "@/Redux/api/book/bookOrderApi";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

export default function BookCheckout() {
  const { slug } = useParams();
  const router = useRouter();

  const { data } = useGetBookBySlugQuery(slug);
  const book = data?.data;

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const searchParams = useSearchParams();
  const quantity = searchParams.get("quantity");
  const [shipping, setShipping] = useState(80);
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("ssl");

  useEffect(() => {
    if (book?.discount) {
      const discount = parseInt(book?.price * book?.discount) / 100;
      const totalDiscount = parseInt(discount * quantity);
      setDiscount(totalDiscount);
    }
  }, [book]);

  const totalPrice = parseInt(book?.price * quantity || 1);
  const total = totalPrice + parseInt(shipping) - parseInt(discount);

  const [addBookOrderOrder, { isLoading }] = useAddBookOrderOrderMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("number");
    const address = formData.get("fullAdress");
    const note = formData.get("note");

    const data = {
      book: book?._id,
      user: {
        name,
        email,
        phone,
        address,
      },
      note,
      totalAmount: total,
      quantity,
      shipping,
      discount,
      paymentMethod,
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;

    if (!emailRegex.test(email)) return toast.error("Invalid email");
    if (!phoneRegex.test(phone)) return toast.error("Invalid phone number");

    const res = await addBookOrderOrder(data);
    if (res?.data?.success) {
      toast.success(res?.data?.message || "Order placed successfully");
      e.target.reset();
      router.push(`/books/order/success/${res?.data?.data?._id}`);
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  return (
    <div className="pt-5">
      <div className="container">
        <form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-3">
          {/* Shipping Details */}
          <div className="rounded bg-base-100 lg:p-6 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold uppercase">
                Shipping Details
              </h3>

              <div className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <h3>Full name</h3>
                  <input
                    type="text"
                    name="name"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                    defaultValue={user?.name}
                  />
                </div>
                <div>
                  <h3>Phone</h3>
                  <input
                    type="text"
                    name="number"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                    defaultValue={user?.phone}
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <div>
                  <h3>Email address</h3>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                    defaultValue={user?.email}
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <h3>Full Adress</h3>
                <textarea
                  name="fullAdress"
                  rows="3"
                  placeholder="House number and fullAdress name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                  required
                  defaultValue={user?.address}
                ></textarea>
              </div>

              <div className="mt-2 text-sm">
                <h3>Order Note</h3>
                <textarea
                  name="note"
                  rows="4"
                  placeholder="House number and fullAdress name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Order details */}
          <div className="checkout-output relative rounded bg-base-100 p-6">
            <div className="mb-4 border-b pb-4">
              <h3 className="text-[17px] font-medium text-neutral">
                Discounts
              </h3>
              <div>
                <small className="text-xs text-neutral-content">
                  REFERRAL OR PROMO CODE
                </small>
                <div className="flex items-center gap-px">
                  <input
                    type="text"
                    className="w-full rounded border px-3 py-[7px] text-sm outline-none"
                    placeholder="Enter Code"
                  />
                  <div
                    className="primary_btn cursor-pointer"
                    style={{ fontSize: "13px" }}
                  >
                    Apply
                  </div>
                </div>
                {/* <p className="text-xs text-red-500">{couponError}</p> */}
              </div>
            </div>

            <div className="mb-4 border-b pb-4">
              <h3 className="font-medium text-neutral">Payment Method</h3>

              <ul className="mt-2 flex flex-col gap-1 pl-2 text-sm text-neutral-content">
                <li className="flex items-center justify-between">
                  <div className="flex items-start">
                    <input
                      id="ssl"
                      type="radio"
                      name="payment_method"
                      className="h-3 w-3 cursor-pointer"
                      onChange={() => setPaymentMethod("ssl")}
                      checked={paymentMethod === "ssl" && true}
                    />
                    <label htmlFor="cod" className="ms-2 -mt-1 cursor-pointer">
                      SSLCommerz - Nagad, Rocket, Upay & BD Cards
                    </label>
                  </div>

                  <div>
                    <img src="/images/cod.png" alt="cod" className="h-6" />
                  </div>
                </li>

                {/* <li className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="ssl"
                        type="radio"
                        name="payment_method"
                        className="w-3 h-3 cursor-pointer"
                        checked={paymentMethod === "ssl" && true}
                        onClick={() => setPaymentMethod("ssl")}
                      />
                      <label htmlFor="ssl" className="ms-2 cursor-pointer">
                        SSL
                      </label>
                    </div>

                    <div>
                      <img src="/images/ssl.png" alt="ssl" className="h-4" />
                    </div>
                  </li> */}
              </ul>
            </div>
            <div>
              <h3 className="tetx-xl font-medium text-neutral">
                Order Summary
              </h3>

              <div className="flex justify-between border-b py-1.5 text-sm">
                <h3>
                  {book?.title} * {quantity}
                </h3>
                <p>
                  ৳<span>{totalPrice}</span>
                </p>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm">
                <h3>Shipping Area</h3>
                <div className="text-end">
                  <select
                    onChange={(e) => setShipping(e.target.value)}
                    className="rounded border p-1 outline-none"
                    required
                    value={shipping}
                  >
                    <option value="80">Inside Dhaka</option>
                    <option value="130">Outside Dhaka</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm">
                <h3>Shipping Charge</h3>
                <div className="text-end">
                  ৳<span>{shipping}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm text-red-500">
                <h3>Discount</h3>
                <div className="text-end">
                  - ৳<span>{discount}</span>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className="flex justify-between border-b py-2 text-lg font-medium">
                <h3 className="text-title">Total</h3>
                <p className="text-primary">
                  ৳ <span>{total}</span>
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded bg-primary py-2 text-base-100 shadow"
            >
              {isLoading ? "Loading..." : "Payment Now"}
            </button>
          </div>
        </form>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
}
