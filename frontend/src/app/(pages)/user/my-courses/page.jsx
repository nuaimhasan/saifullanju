import PageViewClient from "@/app/hooks/PageViewClient";
import Link from "next/link";

export default function MyCourses() {
  return (
    <>
      <PageViewClient title="My Courses" url={`/user/my-courses`} />
      <div>
        <h1 className="text-red-500 text-sm">
          No courses purchased.{" "}
          <Link href="/video-courses" className="underline text-primary">
            purchase now
          </Link>
        </h1>
      </div>
    </>
  );
}
