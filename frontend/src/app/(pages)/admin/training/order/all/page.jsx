"use client";
import { BsFiletypeXlsx } from "react-icons/bs";
import moment from "moment";
import { useGetAllTrainingOrdersQuery } from "@/Redux/api/training/trainingOrderApi";
import Pagination from "@/app/components/Pagination/Pagination";
import { useState } from "react";
import * as XLSX from "xlsx";
import { useGetAllTrainingQuery } from "@/Redux/api/training/trainingApi";

export default function OrderTraining() {
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;
  const [training, setTraining] = useState("all");
  const [loading, setLoading] = useState(false);

  const { data } = useGetAllTrainingOrdersQuery({
    page: currentPage,
    limit,
    training,
  });
  const trainingOrders = data?.data;

  const { data: trainingData } = useGetAllTrainingQuery();
  const trainings = trainingData?.data;

  const handleDownloadExcel = async () => {
    setLoading(true);

    // getData
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/trainingOrder/all?training=${training}`
    );
    const data = await res.json();
    const orders = data?.data;

    const formattedOrders = orders?.map((order) => ({
      "Order ID": order._id,
      "Ticket Number": order.ticketNumber,
      "User Name": order.user.name,
      "User Email": order.user.email,
      "User Phone": order.user.phone,
      "Training Title": order.training.title,
      "Training Date": order.startDate, // Format date as needed
      Amount: order.paymentAmount,
      "Payment Method": order.paymentMethod,
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(formattedOrders);

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    // Trigger the download
    XLSX.writeFile(wb, "training-orders.xlsx");

    setLoading(false);
  };

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">Order Training</h1>

          <div className="flex items-center gap-2">
            <select
              onChange={(e) => setTraining(e.target.value)}
              value={training}
            >
              <option value="all">All</option>
              {trainings?.map((training) => (
                <option key={training?._id} value={training?._id}>
                  {training?.title}
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
              <th>Ticket Number</th>
              <th>User</th>
              <th>Training</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {trainingOrders?.map((order, i) => (
              <tr key={order?._id}>
                <td>
                  {
                    // Calculate the serial number
                    (currentPage - 1) * limit + i + 1
                  }
                </td>
                <td>{order?.ticketNumber}</td>
                <td>
                  <p>{order?.user?.name}</p>
                  <p>{order?.user?.email}</p>
                  <p>{order?.user?.phone}</p>
                </td>
                <td>
                  <p>{order?.training?.title}</p>
                  <p>{moment(order?.startDate).format("DD MMM YYYY")}</p>
                  <p>{moment(order?.time, "HH:mm").format("h:mm A")}</p>
                </td>
                <td>
                  <p>{order?.paymentMethod}</p>
                  <p>
                    ৳{" "}
                    {new Intl.NumberFormat("en-EN", {
                      minimumFractionDigits: 0,
                    }).format(order?.paymentAmount)}
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
