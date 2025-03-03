"use client";
import { useGetAllGalleryQuery } from "@/Redux/api/galleryApi";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export default function GalleryPage() {
  const { data } = useGetAllGalleryQuery();
  const galleries = data?.data;

  return (
    <section className="py-5">
      <div className="container">
        {galleries?.length > 0 ? (
          <PhotoProvider>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
              gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
            >
              <Masonry>
                {galleries?.map((gallery, i) => (
                  <PhotoView
                    key={gallery?._id}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${gallery?.image}`}
                  >
                    <img
                      src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${gallery?.image}`}
                      alt={`gallery-${i + 1}`}
                      className="block w-full rounded"
                    />
                  </PhotoView>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </PhotoProvider>
        ) : (
          <p className="flex justify-center items-center w-full h-[80vh] text-primary">
            Gallery Image no available
          </p>
        )}
      </div>
    </section>
  );
}
