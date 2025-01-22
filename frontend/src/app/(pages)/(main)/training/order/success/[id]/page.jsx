import { AiFillCheckCircle } from "react-icons/ai";
import { useGetData } from "@/Hook/useGetData";
import moment from "moment";
import Link from "next/link";
import TrainingPurchaseEvent from "@/app/hooks/TrainingPurchaseEvent";

export default async function SuccessTrainingOrder({ params }) {
  const { id } = await params;
  const data = await useGetData(`/trainingOrder/${id}`);
  const order = data?.data;

  return (
    <>
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
              <p>{order?.ticketNumber}</p>
            </div>
            <div className="border-r p-3">
              <h3 className="font-medium mb-1">Date</h3>
              <p>{moment(order?.createdAt).format("DD MMM YYYY")}</p>
            </div>
            <div className="p-3">
              <h3 className="font-medium mb-1">Payment</h3>
              <p>{order?.payment?.amount} BDT</p>
            </div>
          </div>

          <div className="mt-1 w-full bg-gray-100 text-neutral p-3 text-sm">
            <h3 className="font-medium  text-base">Order Details</h3>

            <div className="overflow-x-auto mt-3 border">
              <table className="table">
                <thead>
                  <tr>
                    <th>Training</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order?.training?.title}</td>
                    <td>{order?.training?.price} BDT</td>
                  </tr>
                  <tr className="text-primary font-semibold text-base">
                    <td>Total</td>
                    <td>{order?.training?.price} BDT</td>
                  </tr>
                  <tr>
                    <td>Recived</td>
                    <td>{order?.payment?.amount} BDT</td>
                  </tr>
                  <tr>
                    <td>Due</td>
                    <td>
                      {order?.training?.price - order?.payment?.amount} BDT
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-yellow-500 text-center mt-1">
            [Your payment information is currently under verification. We will
            update your payment status shortly and notify you with detailed
            information via email.]
          </p>

          <div className="flex justify-center items-center gap-3 text-[13px] mt-2">
            <Link href="/training" className="primary_btn">
              More Training
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
      <TrainingPurchaseEvent order={order} />
    </>
  );
}
