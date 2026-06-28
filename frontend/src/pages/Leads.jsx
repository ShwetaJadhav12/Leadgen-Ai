import DashboardLayout from "../layouts/DashboardLayout";
import AddLeadModal from "../components/AddLeadModel";
import { useEffect, useState } from "react";
import { getLeads } from "../services/leadService";
import {
  Search,
  Plus,
  Users,
  Target,
  MessageSquare,
  TrendingUp,
} from "lucide-react";


export default function Leads() {
      const [showAddLeadModal, setShowAddLeadModal] = useState(false);
      const [leads, setLeads] = useState([]);
const [loading, setLoading] = useState(true);
const [open, setOpen] = useState(false);

  const stats = [
    {
      title: "Total Leads",
      value: "248",
      icon: Users,
    },
    {
      title: "Qualified",
      value: "86",
      icon: Target,
    },
    {
      title: "Messages Sent",
      value: "120",
      icon: MessageSquare,
    },
    {
      title: "Replies",
      value: "42",
      icon: TrendingUp,
    },
  ];

  const statusColors = {
    New: "bg-blue-100 text-blue-700",
    Contacted: "bg-yellow-100 text-yellow-700",
    Replied: "bg-green-100 text-green-700",
    Closed: "bg-purple-100 text-purple-700",
  };
  useEffect(() => {
  fetchLeads();
}, []);

const fetchLeads = async () => {
  try {
    const response = await getLeads();

    setLeads(response.leads);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
if (loading) {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-center h-[70vh]">
        <h2 className="text-2xl font-semibold">
          Loading Leads...
        </h2>
      </div>
    </DashboardLayout>
  );
}



  return (
    
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white shadow-2xl">

          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">

            <div>
              <h1 className="text-5xl font-black tracking-tight">
                Lead Intelligence
              </h1>

              <p className="mt-3 text-lg text-violet-100">
                Discover, score and convert high-quality prospects.
              </p>
            </div>

            <button
  onClick={() => setShowAddLeadModal(true)}
  className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all"
>
              <div className="flex items-center gap-2">
                <Plus size={18} />
                Add Lead
              </div>
            </button>

          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="
                  bg-white/80
                  backdrop-blur-xl
                  border
                  border-white
                  rounded-3xl
                  p-6
                  shadow-lg
                  hover:shadow-2xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                "
              >
                <div className="flex justify-between items-center">

                  <div>
                    <p className="text-gray-500 text-sm">
                      {stat.title}
                    </p>

                    <h2 className="text-4xl font-bold mt-2">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white">
                    <Icon size={22} />
                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* Search */}
        <div className="
          bg-white/80
          backdrop-blur-xl
          rounded-3xl
          p-4
          shadow-lg
          border
          border-white
        ">
          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search leads, companies or job titles..."
              className="
                w-full
                pl-12
                pr-4
                py-3
                bg-transparent
                outline-none
              "
            />

          </div>
        </div>

        {/* Leads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {leads.map((lead) => (
            <div
              key={lead.id}
              className="
                bg-white
                rounded-3xl
                p-6
                border
                border-gray-100
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-300
                cursor-pointer
              "
            >

              <div className="flex justify-between items-start">

                <div className="flex gap-4">

                  <div className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-violet-500
                    to-indigo-600
                    flex
                    items-center
                    justify-center
                    text-white
                    font-bold
                    text-lg
                    shadow-lg
                  ">
                    {lead.name?.charAt(0)}
                  </div>

                  <div>

                    <h3 className="font-bold text-lg text-gray-900">
                      {lead.name}
                    </h3>

                    <p className="text-gray-500">
                      {lead.role}
                    </p>

                    <p className="text-sm text-gray-400 mt-1">
                      {lead.company}
                    </p>

                  </div>

                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-semibold
                    ${
                      statusColors[lead.status] ||
                      "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {lead.status}
                </span>

              </div>

              <div className="mt-6">

                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    AI Match Score
                  </span>

                  <span className="font-semibold">
                    {lead.score}%
                  </span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-violet-500
                      via-indigo-500
                      to-cyan-500
                    "
                    style={{
                      width: `${lead.score}%`,
                    }}
                  />

                </div>

              </div>

              <div className="mt-6 flex gap-3">

                <button className="
                  flex-1
                  py-2.5
                  rounded-xl
                  bg-gray-100
                  hover:bg-gray-200
                  transition
                ">
                  View
                </button>

                <button className="
                  flex-1
                  py-2.5
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-indigo-600
                  text-white
                  hover:opacity-90
                  transition
                ">
                  Outreach
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
   <AddLeadModal
  open={showAddLeadModal}
  onClose={() => setShowAddLeadModal(false)}
  onLeadSaved={fetchLeads}
/>
    </DashboardLayout>
  );
}