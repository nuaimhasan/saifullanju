import Footer from "@/app/components/main/Footer/Footer";
import Header from "@/app/components/main/Header/Header";

export default function mainLayout({ children }) {
  return (
    <>
      <Header />
      <main className="min-h-[80vh]">{children}</main>
      <Footer />
    </>
  );
}
