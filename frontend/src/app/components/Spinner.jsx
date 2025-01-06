import "@/app/styles/loading.css";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <span className="loader"></span>
    </div>
  );
}
