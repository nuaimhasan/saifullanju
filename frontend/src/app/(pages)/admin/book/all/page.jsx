"use client";
import Link from "next/link";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Image from "next/image";
import toast from "react-hot-toast";
import {
  useDeleteBookMutation,
  useGetAllBookQuery,
  useUpdateBookStatusMutation,
} from "@/Redux/api/book/bookApi";
import { useState } from "react";
import Pagination from "@/app/components/Pagination/Pagination";

export default function AllBooks() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;

  const { data } = useGetAllBookQuery({
    page: currentPage,
    limit,
  });
  const books = data?.data;

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (isConfirm) {
      const res = await deleteBook(id);
      if (res?.data?.success) {
        toast.success("Book Delete success");
      } else {
        toast.error(res.data.message || "Failed to delete Book");
        console.log(res);
      }
    }
  };

  const [updateBookStatus, { isLoading }] = useUpdateBookStatusMutation();
  const handleStatus = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to update this book status?"
    );

    if (isConfirm) {
      const res = await updateBookStatus(id);
      if (res?.data?.success) {
        toast.success("Book Status Update success");
      } else {
        toast.error(res.data.message || "Failed to update Book Status");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Books</h1>
          <Link href="/admin/book/add" className="primary_btn text-sm">
            Add New
          </Link>
        </div>
      </div>

      <div className="relative mt-1 overflow-x-auto">
        <table className="border_table">
          <thead>
            <tr>
              <th>SL</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books?.map((book, i) => (
              <tr key={book?._id}>
                <td>{i + 1}</td>
                <td>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${book?.image}`}
                    alt="img"
                    className="h-8 w-14 rounded object-cover"
                    width={100}
                    height={100}
                  />
                </td>
                <td>{book?.title}</td>
                <td>{book?.price} BDT</td>
                <td>{book?.quantity}</td>
                <td>{book?.discount}%</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedBook(book?._id);
                      handleStatus(book?._id);
                    }}
                    className={`text-center rounded px-2 py-1 text-xs ${
                      book?.status
                        ? "bg-green-100 text-green-500"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {isLoading && selectedBook === book?._id
                      ? "Loading..."
                      : book?.status
                      ? "Active"
                      : "Close"}
                  </button>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/book/edit/${book?._id}`}>
                      <AiOutlineEdit className="text-lg hover:text-red-500" />
                    </Link>
                    <button onClick={() => handleDelete(book?._id)}>
                      <AiOutlineDelete className="text-lg hover:text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data?.meta?.pages > 1 && (
        <Pagination
          pages={data?.meta?.pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
}
