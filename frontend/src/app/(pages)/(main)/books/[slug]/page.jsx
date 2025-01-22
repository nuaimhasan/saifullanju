import "@/app/styles/book.css";
import { useGetData } from "@/Hook/useGetData";
import BookDetailsCom from "@/app/components/main/Book/BookDetails";
import PageViewClient from "@/app/hooks/PageViewClient";
import ViewBookItem from "@/app/hooks/ViewBookItem";

export default async function BookDetails({ params }) {
  const { slug } = await params;
  const data = await useGetData(`/book/slug/${slug}`);
  const book = data?.data;

  return (
    <>
      <BookDetailsCom book={book} />
      <PageViewClient title={book?.title} url={`/books/${slug}`} />
      <ViewBookItem book={book} />
    </>
  );
}
