import { useGetData } from "@/Hook/useGetData";
import { BsBoxes } from "react-icons/bs";
import { FaBloggerB } from "react-icons/fa";

export default async function Dashboard() {
  const service = await useGetData("service/all");
  const blog = await useGetData("blog/all");

  return (
    <div>
      {/* card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Service</p>
            <h3 className="text-primary font-bold">{service?.data?.length}</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <BsBoxes className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Blog</p>
            <h3 className="text-primary font-bold">{blog?.meta?.total}</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBloggerB className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Course</p>
            <h3 className="text-primary font-bold">0</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBloggerB className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-base-100">
          <div>
            <p className="text-neutral font-dinMedium">Total Books</p>
            <h3 className="text-primary font-bold">0</h3>
          </div>
          <div className="bg-primary text-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBloggerB className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
