import { baseApi } from "./baseApi";

export const galleryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllGallery: builder.query({
      query: (query) => ({
        url: "/api/gallery/all",
        params: query,
      }),
      providesTags: ["gallery"],
    }),
    getGalleryById: builder.query({
      query: () => ({
        url: `/api/gallery/${id}`,
      }),
      providesTags: ["gallery"],
    }),
    addGallery: builder.mutation({
      query: (formData) => ({
        url: `/api/gallery/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["gallery"],
    }),
    deleteGallery: builder.mutation({
      query: (id) => ({
        url: `/api/gallery/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["gallery"],
    }),
  }),
});

export const {
  useGetAllGalleryQuery,
  useGetGalleryByIdQuery,
  useAddGalleryMutation,
  useDeleteGalleryMutation,
} = galleryApi;
