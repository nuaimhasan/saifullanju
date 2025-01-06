import TicketCard from "@/app/components/main/Training/TicketCard";
import { useGetData } from "@/Hook/useGetData";

export default async function page({ params }) {
  const { id } = await params;
  const data = await useGetData(`/trainingOrder/${id}`);
  const trainingOrder = data?.data;

  return <TicketCard trainingOrder={trainingOrder} />;
}
