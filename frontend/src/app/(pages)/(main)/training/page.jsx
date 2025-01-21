import TrainingCard from "@/app/components/main/Training/TrainingCard";
import PageViewClient from "@/app/hooks/PageViewClient";

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
    <>
      <PageViewClient title="Training" url="/training" />
      <section className="py-5">
        <div className="container">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {AllTraining?.map((training) => (
              <TrainingCard key={training._id} training={training} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
