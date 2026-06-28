import DashboardLayout from "../layouts/DashboardLayout";
import StatCard from "../components/StatsCard";

import {
  Users,
  MessageSquare,
  Send,
  Reply,
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      title: "Total Leads",
      value: "8",
      growth: "+12%",
      icon: Users,
    },
    {
      title: "Messages",
      value: "47",
      growth: "+28%",
      icon: MessageSquare,
    },
    {
      title: "Campaigns",
      value: "2",
      growth: "+8%",
      icon: Send,
    },
    {
      title: "Replies",
      value: "19",
      growth: "+31%",
      icon: Reply,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">

        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-3xl p-8 text-white shadow-xl">

          <h1 className="text-5xl font-extrabold">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-indigo-100 text-lg">
            Manage leads, outreach and AI-generated campaigns.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              {...stat}
            />
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
}