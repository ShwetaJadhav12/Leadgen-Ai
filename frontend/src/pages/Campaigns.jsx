import DashboardLayout from "../layouts/DashboardLayout";
import {
  Plus,
  Send,
  TrendingUp,
  Users,
  MessageSquare,
} from "lucide-react";

export default function Campaigns() {
  const campaigns = [
    {
      id: 1,
      name: "AI Startup Outreach",
      leads: 120,
      replies: 18,
      openRate: 74,
      progress: 82,
      status: "Active",
    },
    {
      id: 2,
      name: "Recruiter Connections",
      leads: 80,
      replies: 11,
      openRate: 63,
      progress: 100,
      status: "Completed",
    },
    {
      id: 3,
      name: "SaaS Founder Outreach",
      leads: 210,
      replies: 34,
      openRate: 81,
      progress: 56,
      status: "Running",
    },
  ];

  const statusColors = {
    Active: "bg-green-100 text-green-700",
    Running: "bg-blue-100 text-blue-700",
    Completed: "bg-purple-100 text-purple-700",
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Hero */}

        <div className="
          relative
          overflow-hidden
          rounded-[32px]
          bg-gradient-to-r
          from-violet-600
          via-indigo-600
          to-blue-600
          p-8
          text-white
          shadow-2xl
        ">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

          <div className="relative z-10 flex justify-between items-center">

            <div>
              <h1 className="text-5xl font-black">
                Campaigns
              </h1>

              <p className="mt-3 text-violet-100 text-lg">
                Launch, track and optimize outreach campaigns.
              </p>
            </div>

            <button className="
              bg-white
              text-indigo-700
              px-6
              py-3
              rounded-2xl
              font-semibold
              hover:scale-105
              transition
            ">
              <div className="flex items-center gap-2">
                <Plus size={18} />
                New Campaign
              </div>
            </button>

          </div>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">
                  Active Campaigns
                </p>
                <h2 className="text-4xl font-bold mt-2">
                  12
                </h2>
              </div>

              <Send className="text-indigo-600" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">
                  Leads Reached
                </p>
                <h2 className="text-4xl font-bold mt-2">
                  2.4K
                </h2>
              </div>

              <Users className="text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">
                  Replies
                </p>
                <h2 className="text-4xl font-bold mt-2">
                  196
                </h2>
              </div>

              <MessageSquare className="text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">
                  Avg Reply Rate
                </p>
                <h2 className="text-4xl font-bold mt-2">
                  24%
                </h2>
              </div>

              <TrendingUp className="text-orange-600" />
            </div>
          </div>

        </div>

        {/* Campaign Cards */}

        <div className="grid lg:grid-cols-2 gap-6">

          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="
                bg-white
                rounded-3xl
                p-6
                border
                border-gray-100
                shadow-sm
                hover:shadow-2xl
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-2xl font-bold">
                    {campaign.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    AI-powered outreach campaign
                  </p>

                </div>

                <span
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${statusColors[campaign.status]}
                  `}
                >
                  {campaign.status}
                </span>

              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">

                <div>
                  <p className="text-gray-500 text-sm">
                    Leads
                  </p>

                  <p className="text-2xl font-bold">
                    {campaign.leads}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Replies
                  </p>

                  <p className="text-2xl font-bold">
                    {campaign.replies}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500 text-sm">
                    Open Rate
                  </p>

                  <p className="text-2xl font-bold">
                    {campaign.openRate}%
                  </p>
                </div>

              </div>

              {/* Progress */}

              <div className="mt-6">

                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    Campaign Progress
                  </span>

                  <span className="font-semibold">
                    {campaign.progress}%
                  </span>
                </div>

                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">

                  <div
                    className="
                      h-full
                      bg-gradient-to-r
                      from-violet-500
                      via-indigo-500
                      to-cyan-500
                      rounded-full
                    "
                    style={{
                      width: `${campaign.progress}%`,
                    }}
                  />

                </div>

              </div>

              {/* Actions */}

              <div className="flex gap-3 mt-6">

                <button className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-gray-100
                  hover:bg-gray-200
                  transition
                ">
                  Analytics
                </button>

                <button className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-indigo-600
                  text-white
                  hover:opacity-90
                  transition
                ">
                  Manage
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </DashboardLayout>
  );
}