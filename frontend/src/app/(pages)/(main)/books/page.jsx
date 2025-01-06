import BookCard from "@/app/components/main/Book/BookCard";
import { useGetData } from "@/Hook/useGetData";

export default async function Books() {
  const data = await useGetData("/book/all?status=true");
  const books = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {books?.map((book) => (
            <BookCard key={book?._id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
