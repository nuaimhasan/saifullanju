"use client";
import moment from "moment";
import { FaPrint } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { useParams } from "next/navigation";
import {
  useGetBookOrderByIdQuery,
  useUpdateBookOrderStatusMutation,
} from "@/Redux/api/book/bookOrderApi";
import Link from "next/link";
import toast from "react-hot-toast";
import Spinner from "@/app/components/Spinner";

export default function OrderDetails() {
  const { id } = useParams();

  const { data, isLoading } = useGetBookOrderByIdQuery(id);
  const order = data?.data;

  const [updateBookOrderStatus] = useUpdateBookOrderStatusMutation();
  const handleUpdateStatus = async (id, status) => {
    const isConfirm = confirm(`Are you sure to update status to ${status}?`);
    if (!isConfirm) return;
    const res = await updateBookOrderStatus({ id, status });
    if (res?.data?.success) {
      toast.success("Status update successfully");
    } else {
      toast.error(res?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <secction>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/admin/book/order/all"
            className="primary_btn flex w-max items-center gap-2 text-xs"
          >
            <IoMdArrowBack /> Go Back
          </Link>

          <div>
            <h1 className="text-xs text-primary">order/order-details</h1>
            <p>Order: #{order?._id}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border bg-base-100 p-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <div>
            <h2 className="text-xl">Invoice INV-{order?.invoiceNumber}</h2>
            <p className="mt-1 w-max rounded bg-green-100 px-2 py-1 text-[11px] text-primary">
              {order?.status}
            </p>
            <div className="gap-2 sm:flex">
              <p className="mt-1 w-max rounded bg-primary/10 px-2 py-1 text-[11px] text-primary">
                Placed On:{" "}
                {moment(order?.createdAt).format("Do MMMM YYYY hh:mm a")}
              </p>
              <p className="mt-1 w-max rounded bg-primary/10 px-2 py-1 text-[11px] text-primary">
                Updated:{" "}
                {moment(order?.updatedAt).format("Do MMMM YYYY hh:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => handleUpdateStatus(order?._id, e.target.value)}
              className={`text-xs w-max ${
                order?.status == "pending"
                  ? "text-yellow-500"
                  : order?.status == "shipped"
                  ? "text-blue-500"
                  : order?.status == "delivered"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
              defaultValue={order?.status}
            >
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <Link
              href={`/admin/book/order/print/${order?._id}`}
              target="_blank"
              className="flex items-center gap-2 rounded border border-gray-400 px-2 py-1 text-sm text-neutral-content duration-200 hover:text-neutral"
            >
              <FaPrint className="text-neutral" /> Print
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Customer Info</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>Name: {order?.user?.name}</p>
            <p>Email: {order?.userId?.email}</p>
            <p>Phone: {order?.user?.phone}</p>
            <p>Payment: {order?.paymentMethod}</p>
          </div>
        </div>

        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Shipping Address</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>{order?.user?.address}</p>
          </div>
        </div>

        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Shipping Note</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>{order?.note}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border bg-base-100 p-4">
        <h2 className="text-lg">Ordered Items</h2>

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
    </secction>
  );
}
