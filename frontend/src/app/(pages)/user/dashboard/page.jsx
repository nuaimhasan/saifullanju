import DashboardCard from "@/app/components/user/dashboard/Card";
import Greeting from "@/app/components/user/dashboard/Greeting";

export default function UserDashboard() {
  return (
    <section>
      <Greeting />
      <DashboardCard />
    </section>
  );
}
