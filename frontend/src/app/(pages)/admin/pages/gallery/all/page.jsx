"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ImBin2 } from "react-icons/im";
import toast from "react-hot-toast";
import {
  useDeleteGalleryMutation,
  useGetAllGalleryQuery,
} from "@/Redux/api/galleryApi";
import Pagination from "@/app/components/Pagination/Pagination";

export default function AllGallery() {
  const [currentPage, setCurrentPage] = useState(1);
  let limit = 10;

  const { data } = useGetAllGalleryQuery({
    page: currentPage,
    limit,
  });
  const galleries = data?.data;

  const [deleteGallery] = useDeleteGalleryMutation();

  const handleDelete = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this Image?"
    );
    if (isConfirm) {
      const res = await deleteGallery(id);
      if (res?.data?.success) {
        toast.success("Gallery image delete success");
      } else {
        toast.error(res.data.message || "Failed to delete Training");
        console.log(res);
      }
    }
  };

  return (
    <section>
      <div className="rounded border-b bg-base-100 p-4">
        <div className="flex items-center justify-between">
          <h1 className="font-medium text-neutral">All Gallery</h1>
          <Link href="/admin/pages/gallery/add" className="primary_btn text-sm">
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {galleries?.map((gallery, i) => (
              <tr key={gallery?._id}>
                <td>{i + 1}</td>
                <td>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${gallery?.image}`}
                    alt={`gallery-${i + 1}`}
                    className="h-8 w-14 rounded"
                    width={100}
                    height={100}
                  />
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleDelete(gallery?._id)}>
                      <ImBin2 className="hover:text-red-500" />
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
