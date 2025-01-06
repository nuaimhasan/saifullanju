import TrainingCard from "@/app/components/main/Training/TrainingCard";

const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/training/all?upcoming=true&active=true`
  );
  const data = await res.json();
  return data;
};

export default async function Training() {
  const data = await getData();
  const AllTraining = data.data;

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {AllTraining?.map((training) => (
            <TrainingCard key={training._id} training={training} />
          ))}
        </div>
      </div>
    </section>
  );
}
