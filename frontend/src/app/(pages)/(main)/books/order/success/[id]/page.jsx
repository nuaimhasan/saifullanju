import { AiFillCheckCircle } from "react-icons/ai";
import { useGetData } from "@/Hook/useGetData";
import moment from "moment";
import Link from "next/link";

export default async function page({ params }) {
  const { id } = await params;
  const data = await useGetData(`/bookOrder/${id}`);
  const order = data?.data;
  console.log(order);

  return (
    <section className="flex justify-center items-center min-h-[80vh] py-5">
      <div className="w-[95%] sm:w-[600px] flex flex-col gap-2 justify-center items-center">
        <div className="text-center">
          <p className="flex justify-center items-center mb-2">
            <AiFillCheckCircle className="text-6xl text-primary" />
          </p>
          <h2 className="text-primary text-xl font-semibold">
            Thank you. Your order has been received.
          </h2>
        </div>

        <div className="mt-4 w-full bg-gray-100 text-neutral grid grid-cols-3 text-sm">
          <div className="border-r p-3">
            <h3 className="font-medium mb-1">Order Number</h3>
            <p>INV-{order?.invoiceNumber}</p>
          </div>
          <div className="border-r p-3">
            <h3 className="font-medium mb-1">Date</h3>
            <p>{moment(order?.createdAt).format("DD MMM YYYY")}</p>
          </div>
          <div className="p-3">
            <h3 className="font-medium mb-1">Payment</h3>
            <p>{order?.totalAmount} BDT</p>
          </div>
        </div>

        <div className="mt-1 w-full bg-gray-100 text-neutral p-3 text-sm">
          <h3 className="font-medium  text-base">Order Details</h3>

          <div className="overflow-x-auto mt-3 border">
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {order?.book?.title} * {order?.quantity}
                  </td>
                  <td>{order?.book?.price * order?.quantity} BDT</td>
                </tr>
                <tr>
                  <td>Shipping Charge</td>
                  <td>{order?.shipping} BDT</td>
                </tr>
                <tr className="text-red-500">
                  <td>Discount</td>
                  <td>{order?.discount} BDT</td>
                </tr>
                <tr className="text-primary font-semibold text-base">
                  <td>Total</td>
                  <td>{order?.totalAmount} BDT</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-1 w-full bg-gray-100 text-neutral p-3 text-sm">
          <h3 className="font-medium text-base">Billing Address</h3>

          <div className="mt-3">
            <p>{order?.user?.name}</p>
            <p>{order?.user?.email}</p>
            <p>{order?.user?.phone}</p>
            <p>{order?.user?.address}</p>
            <p>{order?.user?.note}</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-3 text-[13px] mt-2">
          <Link href="/books" className="primary_btn">
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="bg-gray-500 text-base-100 rounded px-4 py-2"
          >
            Go To Home
          </Link>
        </div>
      </div>
    </section>
  );
}
