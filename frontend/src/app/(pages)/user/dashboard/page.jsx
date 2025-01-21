import DashboardCard from "@/app/components/user/dashboard/Card";
import Greeting from "@/app/components/user/dashboard/Greeting";
import PageViewClient from "@/app/hooks/PageViewClient";

export default function UserDashboard() {
  return (
    <>
      <PageViewClient title="Dashboard" url={`/user/dashboard`} />
      <section>
        <Greeting />
        <DashboardCard />
      </section>
    </>
  );
}
