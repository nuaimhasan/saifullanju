import Blogs from "@/app/components/main/Home/Blogs/Blogs";
import Books from "@/app/components/main/Home/Books/Books";
// import Courses from "@/app/components/main/Home/Courses/Courses";
import Hero from "@/app/components/main/Home/Hero/Hero";
import Services from "@/app/components/main/Home/Services/Services";
import Speech from "@/app/components/main/Home/Speech";
import Training from "@/app/components/main/Home/Training/Training";
import PageViewClient from "@/app/hooks/PageViewClient";

export default function Home() {
  return (
    <>
      <PageViewClient title="Home" url="/" />
      <Hero />
      <Services />
      <Books />
      <Training />
      {/* <Courses /> */}
      <Speech />
      <Blogs />
    </>
  );
}
