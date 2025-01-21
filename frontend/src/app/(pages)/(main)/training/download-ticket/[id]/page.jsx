import TicketCard from "@/app/components/main/Training/TicketCard";
import PageViewClient from "@/app/hooks/PageViewClient";
import { useGetData } from "@/Hook/useGetData";

export default async function DownloadTicket({ params }) {
  const { id } = await params;
  const data = await useGetData(`/trainingOrder/${id}`);
  const trainingOrder = data?.data;

  return (
    <>
      <PageViewClient title="Ticket Download" url="/training/download-ticket" />
      <section className="py-5">
        <div className="container">
          <h1 className="text-xl sm:text-3xl font-medium">
            Congratulations your order has been placed successfully
          </h1>

          <div className="mt-4">
            <TicketCard trainingOrder={trainingOrder} />
          </div>
        </div>
      </section>
    </>
  );
}
