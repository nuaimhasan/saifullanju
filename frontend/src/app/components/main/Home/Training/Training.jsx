import TrainingCard from "../../Training/TrainingCard";

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
        <div>
          <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
            Upcoming Training
          </h2>
        </div>

        <div className="bg-base-100 shadow rounded sm:p-4 sm:border mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {AllTraining?.map((training) => (
            <TrainingCard key={training._id} training={training} />
          ))}
        </div>
      </div>
    </section>
  );
}
