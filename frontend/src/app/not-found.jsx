import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col gap-6 justify-center items-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <div>
        <Link href="/" className="primary_btn">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
