import Services from "@/app/components/main/Home/Services/Services";
import PageViewClient from "@/app/hooks/PageViewClient";

export default async function ServicePage() {
  return (
    <>
      <PageViewClient title="Services" url="/services" />
      <Services />
    </>
  );
}
