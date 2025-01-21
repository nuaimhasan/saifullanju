import TicketCard from "@/app/components/main/Training/TicketCard";
import PageViewClient from "@/app/hooks/PageViewClient";
import { useGetData } from "@/Hook/useGetData";

export default async function page({ params }) {
  const { id } = await params;
  const data = await useGetData(`/trainingOrder/${id}`);
  const trainingOrder = data?.data;

  return (
    <>
      <PageViewClient
        title="My Training Download"
        url={`/user/my-training/download/ticket/${id}`}
      />
      <TicketCard trainingOrder={trainingOrder} />
    </>
  );
}
