import { useGetData } from "@/Hook/useGetData";
import BookCard from "../../Book/BookCard";

export default async function Books() {
  const data = await useGetData("/book/all?status=true");
  const books = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <div>
          <h2 className="text-center text-3xl font-bold text-primary sm:text-4xl">
            Books
          </h2>
        </div>

        <div className="bg-base-100 shadow rounded sm:p-4 sm:border mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {books?.map((book) => (
            <BookCard key={book?._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
