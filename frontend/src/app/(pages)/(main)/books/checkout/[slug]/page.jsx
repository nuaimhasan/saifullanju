"use client";
import BookCheckoutEvent from "@/app/hooks/BookCheckoutEvent";
import PageViewClient from "@/app/hooks/PageViewClient";
import { useGetBookBySlugQuery } from "@/Redux/api/book/bookApi";
import { useAddBookOrderOrderMutation } from "@/Redux/api/book/bookOrderApi";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { GrSecure } from "react-icons/gr";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Spinner from "@/app/components/Spinner";

export default function BookCheckout() {
  const { slug } = useParams();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [accountNb, setAccountNb] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [date, setDate] = useState("");

  const { data, isLoading } = useGetBookBySlugQuery(slug);
  const book = data?.data;

  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const searchParams = useSearchParams();
  const quantity = searchParams.get("quantity");

  const [shipping, setShipping] = useState(80);
  const [paymentMethod, setPaymentMethod] = useState("manualbKash");

  const totalPrice = parseInt(book?.price * quantity || 1);
  const totalAmount = totalPrice + parseInt(shipping); // Removed discount logic

  const [addBookOrderOrder, { isLoading: addIsLoading }] =
    useAddBookOrderOrderMutation();

  const handleSubmit = async () => {

    // const name = e.target.userName.value;
    // const email = e.target.email.value;
    // const phone = e.target.number.value;
    // const address = e.target.fullAdress.value;
    // const accountNb = accountNbs;
    // const transactionId = transactionIds;
    // const date = dates;
    // if (
    //   !name ||
    //   !email ||
    //   !phone ||
    //   !address ||
    //   !accountNb ||
    //   !transactionId ||
    //   !date
    // )
    //   return toast.error("Please fill all the fields");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+88)?01[3-9]\d{8}$/;

    if (!emailRegex.test(email)) return toast.error("Invalid email");
    if (!phoneRegex.test(phone)) return toast.error("Invalid phone number");

    const data = {
      book: book?._id,
      user: {
        name,
        email,
        phone,
        address,
      },
      totalAmount,
      accountNb,
      date,
      transactionId,
      paymentMethod,
      quantity,
      shipping,
    };


    // Call the mutation to add the book order
    const res = await addBookOrderOrder(data);
    if (res?.data?.success) {
      toast.success(res?.data?.message || "Order placed successfully");
      e.target.reset(); // Reset form after successful submission
      router.push(`/books/order/success/${res?.data?.data?._id}`);
    } else {
      toast.error(res?.data?.message || "Something went wrong");
      console.log(res);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="py-5 relative">
        <div className="container">
          <div className="bg-base-100 rounded shadow border p-4">
            <h2 className="text-neutral/90 text-lg font-bold border-b pb-3">
              Completed Payment
            </h2>

            <div className="mt-4 grid sm:grid-cols-2 items-start gap-6">
              {/* Book Information */}
              <div>
                <div className="border rounded p-4 shadow">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book?.image}`}
                    alt="book"
                    width={100}
                    height={100}
                    className="rounded w-36 h-20 object-cover"
                  />

                  <h3 className="text-xl font-medium mt-2 text-neutral">
                    {book?.title}
                  </h3>

                  <div className="p-2 mt-6">
                    <h3 className="text-sm font-medium">Payment Details</h3>

                    <div className="mt-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-neutral">Book Price</p>
                        <p className="text-sm text-neutral">
                          ৳{" "}
                          {new Intl.NumberFormat("en-EN", {
                            minimumFractionDigits: 0,
                          }).format(book?.price)}
                        </p>
                      </div>

                      <div className="mt-1 pt-1 border-t flex justify-between items-center font-semibold">
                        <p className="text-sm text-neutral">Total Payment:</p>
                        <p className="text-sm text-neutral">
                          ৳{" "}
                          {new Intl.NumberFormat("en-EN", {
                            minimumFractionDigits: 0,
                          }).format(totalAmount)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3 bg-base-100 shadow p-2 rounded">
                  <h2 className="font-semibold text-neutral">User Info</h2>
                  <form className="border mt-2 p-3 rounded">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div>
                        <p>Full Name *</p>
                        <input
                          type="text"
                          name="userName"
                          className="w-full rounded border-2 p-2 outline-none"
                          onChange={(e) => setName(e.target.value)}
                          required
                          defaultValue={user?.name}
                        />
                      </div>
                      <div>
                        <p>Email *</p>
                        <input
                          type="email"
                          name="email"
                          className="w-full rounded border-2 p-2 outline-none"
                          required
                          onChange={(e) => setEmail(e.target.value)}
                          defaultValue={user?.email}
                        />
                      </div>
                      <div>
                        <p>Phone Number *</p>
                        <input
                          type="text"
                          name="number"
                          className="w-full rounded border-2 p-2 outline-none"
                          required
                          onChange={(e) => setPhone(e.target.value)}
                          defaultValue={user?.phone}
                        />
                      </div>
                      <div>
                        <p>Address *</p>
                        <textarea
                          name="fullAdress"
                          rows="3"
                          placeholder="House number and full address"
                          className="w-full rounded border-2 p-2 outline-none"
                          required
                          onChange={(e) => setAddress(e.target.value)}
                          defaultValue={user?.address}
                        ></textarea>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="sticky top-12">
                <div className="mt-4 bg-base-100 shadow p-4 rounded">
                  <h2 className="font-semibold text-lg text-neutral">
                    Payment Method
                  </h2>

                  <div className="flex flex-col gap-2 mt-4">
                    <div className="flex items-center ps-4 border border-gray-200 rounded">
                      <input
                        id="manualbKash"
                        type="radio"
                        value="manualbKash"
                        name="bordered-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                        onChange={() => setPaymentMethod("manualbKash")}
                        checked={paymentMethod === "manualbKash"}
                      />
                      <label
                        htmlFor="manualbKash"
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 flex items-center justify-between gap-2"
                      >
                        <p>Manual bKash</p>
                        <img src="/Bkash.png" alt="bKash" className="w-14" />
                      </label>
                    </div>
                  </div>

                  <div className="mt-3 border rounded p-2 text-[13px]">
                    <div className="grid sm:grid-cols-2 gap-2">
                      <div>
                        <p className="mb-1">Account No. *</p>
                        <input
                          type="text"
                          name="accountNb"
                          onChange={(e) => setAccountNb(e.target.value)}
                          className="w-full rounded border-2 p-2 outline-none"
                        />
                      </div>
                      <div>
                        <p className="mb-1">Transaction ID *</p>
                        <input
                          type="text"
                          name="transactionId"
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="w-full rounded border-2 p-2 outline-none"
                        />
                      </div>
                      <div>
                        <p className="mb-1">Amount *</p>
                        <input
                          type="number"
                          name="amount"
                          value={totalAmount}
                          className="w-full rounded border-2 p-2 outline-none"
                          readOnly
                        />
                      </div>
                      <div>
                        <p className="mb-1">Date</p>
                        <input
                          type="date"
                          name="date"
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full rounded border-2 p-2 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t flex justify-between items-center font-semibold">
                    <p className="text-sm text-neutral">Total Payment:</p>
                    <p className="text-sm text-neutral">
                      ৳{" "}
                      {new Intl.NumberFormat("en-EN", {
                        minimumFractionDigits: 0,
                      }).format(totalAmount)}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      disabled={addIsLoading}
                      onClick={handleSubmit}
                      className="primary_btn w-full text-sm flex items-center justify-center gap-2"
                    >
                      {addIsLoading ? "Loading..." : <>Complete Order </>}
                    </button>
                  </div>

                  <p className="mt-3 flex items-center justify-center gap-2 text-xs text-neutral-content">
                    <GrSecure /> Secured payment
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-center text-primary italic font-semibold text-3xl">
              Manual payment instruction
            </h2>

            <div className="mt-5 text-[15px] text-neutral/80">
              <ul className="list-decimal list-inside space-y-2">
                <li>আপনার Bkash অ্যাপ খুলুন অথবা *247# ডায়াল করুন।</li>
                <li>"Send Money" অপশন নির্বাচন করুন।</li>
                <li>আমাদের Bkash নম্বরে টাকা পাঠান: 017XXXXXXXX।</li>
                <li>টাকা পাঠানোর সময় সঠিক পরিমাণ (Amount) নিশ্চিত করুন।</li>
                <li>পেমেন্ট সফলভাবে সম্পন্ন হলে একটি Transaction ID পাবেন।</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <PageViewClient title={book?.title} url={`/books/checkout/${slug}`} />
      <BookCheckoutEvent book={book} user={user} quantity={quantity} />
    </>
  );
}
