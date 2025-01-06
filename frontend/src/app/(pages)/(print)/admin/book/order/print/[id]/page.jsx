"use client";
import Spinner from "@/app/components/Spinner";
import { useGetBookOrderByIdQuery } from "@/Redux/api/book/bookOrderApi";
import moment from "moment";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function BookInvoice() {
  const { id } = useParams();
  const currentTime = useMemo(() => Date.now(), []);

  const { data, isLoading } = useGetBookOrderByIdQuery(id);
  const order = data?.data;

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        window.print();
      }, 1000);
    }
  }, [isLoading]);

  if (isLoading) return <Spinner />;

  return (
    <section
      id="invoice"
      className="mx-auto flex h-screen w-[1000px] flex-col justify-between px-6"
    >
      <div>
        {/* <!-- header --> */}
        <div>
          <div className="border-title flex justify-between gap-10 border-b-2 px-2 pb-3">
            <div className="flex gap-3">
              <div>
                <h2 className="text-3xl font-semibold">Saiful Lanju</h2>
                <div className="text-base">
                  <p>Cell: 0000000000</p>
                  <p>Email: email</p>
                  <p>address</p>
                </div>
              </div>
            </div>

            <div className="text-title w-[30%]">
              <h2 className="title text-end text-3xl font-extrabold italic">
                INVOICE
              </h2>
              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">Invoice Number</p>
                <p className="w-max font-bold">{order?.invoiceNumber}</p>
              </div>

              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">Order Date</p>

                <p className="w-max font-bold">
                  {moment(order?.createdAt).format("DD-MM-YYYY")}
                </p>
              </div>

              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">PAYMENT Type</p>
                <p className="w-max font-bold">{order?.paymentMethod}</p>
              </div>

              <div className="grid grid-cols-2 items-center border-t border-dashed border-gray-400 py-px">
                <p className="text-title/70">DATE</p>
                <p className="w-max font-bold">
                  {moment(currentTime).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <!--Customer Info --> */}
        <div className="text-title p-4 pt-1">
          <h2 className="mb-1 text-xl font-medium">Bill to</h2>

          <div>
            <div>
              <h3>{order?.user?.name}</h3>
              <p>{order?.user?.phone}</p>
              <p>{order?.user?.email}</p>
              <p>{order?.user?.address}</p>
              <p className="text-blue-400">{order?.note}</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative mt-2 overflow-x-auto rounded-md border">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-2">
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${order?.book?.image}`}
                      alt="book"
                      className="h-9 w-9 rounded-full"
                      loading="lazy"
                    />

                    <p>{order?.book?.title}</p>
                  </div>
                </td>
                <td>{order?.quantity}</td>
                <td>{order?.book?.price}</td>
                <td>{order?.book?.discount}%</td>
                <td>{order?.book?.price * order?.quantity} BDT</td>
              </tr>
            </tbody>
            <tfoot className="text-[13.5px]">
              <tr>
                <td colSpan={4} className="text-end">
                  SubTotal
                </td>
                <td>{order?.book?.price * order?.quantity} BDT</td>
              </tr>

              <tr className="font-normal">
                <td colSpan={4} className="text-end">
                  Shipping Charge
                </td>
                <td>{order?.shipping} BDT</td>
              </tr>

              <tr className="text-red-500 font-normal">
                <td colSpan={4} className="text-end">
                  Discount
                </td>
                <td>{order?.discount} BDT</td>
              </tr>

              <tr>
                <th colSpan={4} className="text-end">
                  Total
                </th>
                <th>{order?.totalAmount} BDT</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div className="footer mt-28">
        <p className="flex justify-center items-center w-full">
          Thank you for your order
        </p>
      </div>
    </section>
  );
}
