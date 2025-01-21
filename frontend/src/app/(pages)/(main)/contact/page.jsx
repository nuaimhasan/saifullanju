import Contact from "@/app/components/main/Home/Contact";
import PageViewClient from "@/app/hooks/PageViewClient";

export default function ContactPage() {
  return (
    <>
      <PageViewClient title="Contact" url="/contact" />
      <Contact />
    </>
  );
}
