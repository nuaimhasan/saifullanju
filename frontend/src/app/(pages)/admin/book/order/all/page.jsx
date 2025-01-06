"use client";
import { useState } from "react";
import { BsPrinterFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import moment from "moment";
import Pagination from "@/app/components/Pagination/Pagination";
import {
  useGetAllBookOrdersQuery,
  useUpdateBookOrderStatusMutation,
} from "@/Redux/api/book/bookOrderApi";
import { BsFiletypeXlsx } from "react-icons/bs";
import { useGetAllBookQuery } from "@/Redux/api/book/bookApi";
import * as XLSX from "xlsx";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OrderTraining() {
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;
  const [book, setBook] = useState("all");
  const [loading, setLoading] = useState(false);

  const { data } = useGetAllBookOrdersQuery({
    page: currentPage,
    limit,
    book,
  });
  const bookOrders = data?.data;

  const { data: bookData } = useGetAllBookQuery();
  const books = bookData?.data;

  const handleDownloadExcel = async () => {
    setLoading(true);

    // getData
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookOrder/all?book=${book}`
    );
    const data = await res.json();
    const orders = data?.data;

    const formattedOrders = orders?.map((order) => ({
      "Order ID": order?._id,
      "Invoice Number": order?.invoiceNumber,
      "User Name": order?.user?.name,
      "User Email": order?.user?.email,
      "User Phone": order?.user?.phone,
      "Book Title": order?.book?.title,
      Quantity: order?.quantity,
      Amount: order?.totalAmount,
      "Payment Method": order?.paymentMethod,
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedOrders);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    // Trigger the download
    XLSX.writeFile(wb, "book-orders.xlsx");

    setLoading(false);
  };

  const [updateBookOrderStatus, { isLoading }] =
    useUpdateBookOrderStatusMutation();

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

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">Book Orders</h1>

          <div className="flex items-center gap-2">
            <select onChange={(e) => setBook(e.target.value)} value={book}>
              <option value="all">All</option>
              {books?.map((book) => (
                <option key={book?._id} value={book?._id}>
                  {book?.title}
                </option>
              ))}
            </select>
            <button
              onClick={handleDownloadExcel}
              className="primary_btn text-xs flex items-center gap-2"
            >
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <BsFiletypeXlsx /> Download
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-1 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Invoice Number</th>
              <th>User</th>
              <th>Book</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookOrders?.map((order, i) => (
              <tr key={order?._id}>
                <td>{(currentPage - 1) * limit + i + 1}</td>
                <td>
                  <p>INV-{order?.invoiceNumber}</p>
                  <p>{moment(order?.createdAt).format("DD MMM YYYY")}</p>
                </td>
                <td>
                  <p>{order?.user?.name}</p>
                  <p>{order?.user?.email}</p>
                  <p>{order?.user?.phone}</p>
                </td>
                <td>
                  <p className="font-medium">{order?.book?.title}</p>
                  <p>{order?.quantity} piece</p>
                </td>
                <td>
                  <p>{order?.paymentMethod}</p>
                  <p>
                    ৳{" "}
                    {new Intl.NumberFormat("en-EN", {
                      minimumFractionDigits: 0,
                    }).format(order?.totalAmount)}
                  </p>
                </td>
                <td>
                  <select
                    onChange={(e) =>
                      handleUpdateStatus(order?._id, e.target.value)
                    }
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
                </td>
                <td>
                  <div className="flex items-center gap-3 text-lg">
                    <Link
                      href={`/admin/book/order/view/${order?._id}`}
                      className="hover:text-green-500 duration-300"
                    >
                      <AiFillEye className="text-xl" />
                    </Link>

                    <Link
                      href={`/admin/book/order/print/${order?._id}`}
                      target="_blank"
                      className="hover:text-green-500 duration-300"
                    >
                      <BsPrinterFill />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
