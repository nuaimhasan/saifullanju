"use client";
import { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { useGetAllBookOrdersQuery } from "@/Redux/api/book/bookOrderApi";

export default function MyBooks() {
  const { loggedUser } = useSelector((state) => state.user);
  const user = loggedUser?.data;

  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;

  const { data } = useGetAllBookOrdersQuery({
    user: user?.email,
    page: currentPage,
    limit,
  });
  const bookOrders = data?.data;

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">My Books</h1>
        </div>
      </div>

      <div className="relative mt-1 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Invoice Number</th>
              <th>Book</th>
              <th>Payment</th>
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
