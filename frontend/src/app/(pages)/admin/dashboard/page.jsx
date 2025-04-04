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
        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-primary text-base-100">
          <div>
            <p className="font-dinMedium">Total Service</p>
            <h3 className="font-bold">{service?.data?.length}</h3>
          </div>
          <div className="bg-base-100 text-primary w-11 h-11 rounded-lg flex justify-center items-center">
            <BsBoxes className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-secondary text-base-100">
          <div>
            <p className="font-dinMedium">Total Blog</p>
            <h3 className="font-bold">{blog?.meta?.total}</h3>
          </div>
          <div className="text-secondary bg-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBloggerB className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-primary text-base-100">
          <div>
            <p className="font-dinMedium">Total Course</p>
            <h3 className="font-bold">0</h3>
          </div>
          <div className="text-primary bg-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBloggerB className="text-xl" />
          </div>
        </div>

        <div className="flex justify-between items-center rounded-lg shadow p-4 bg-secondary text-base-100">
          <div>
            <p className="font-dinMedium">Total Books</p>
            <h3 className="font-bold">0</h3>
          </div>
          <div className="text-secondary bg-base-100 w-11 h-11 rounded-lg flex justify-center items-center">
            <FaBloggerB className="text-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
