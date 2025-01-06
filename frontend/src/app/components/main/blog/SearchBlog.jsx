"use client";
import { BiSearchAlt2 } from "react-icons/bi";
import { useRouter } from "next/navigation";

export default function SearchBlog() {
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    const search = e.target[0].value;
    if (search) {
      router.push(`/blogs?search=${search}`);
    } else {
      router.push(`/blogs`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative w-max">
      <input type="text" className="pr-7" placeholder="search blogs..." />
      <BiSearchAlt2 className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-content" />
    </form>
  );
}
