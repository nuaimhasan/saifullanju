import "@/app/styles/book.css";
import { useGetData } from "@/Hook/useGetData";
import BookDetailsCom from "@/app/components/main/Book/BookDetails";
import PageViewClient from "@/app/hooks/PageViewClient";

export default async function BookDetails({ params }) {
  const { slug } = await params;
  const data = await useGetData(`/book/slug/${slug}`);
  const book = data?.data;

  return (
    <>
      <PageViewClient title={book?.title} url={`/books/${slug}`} />
      <BookDetailsCom book={book} />
    </>
  );
}
