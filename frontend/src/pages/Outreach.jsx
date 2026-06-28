import DashboardLayout from "../layouts/DashboardLayout";
const messages = {
  linkedin: `
Hi John,

I came across your profile and was impressed by your leadership at OpenAI.

I'd love to connect and learn more about your experience building AI products.

Best Regards,
Shweta
`,

  email: `
Subject: Exploring AI Opportunities

Hi John,

I noticed your work at OpenAI and wanted to reach out.

I'm currently building AI-powered applications and would love to connect regarding your experience and insights.

Looking forward to hearing from you.

Regards,
Shweta
`,

  followup1: `
Hi John,

Just following up on my previous message.

I'd still love to connect and learn from your experience in the AI space.

Looking forward to hearing from you.

Regards,
Shweta
`,

  followup2: `
Hi John,

I wanted to reach out one final time.

I recently completed an AI outreach platform and thought it might be relevant to your interests.

Happy to share more details.

Best Regards,
Shweta
`
};
import {
  Sparkles,
  User,
  Building2,
  Briefcase,
  Copy,
  Save,
  Wand2,
} from "lucide-react";
import {
  Mail,
  Send,
  MessageSquare,
  ArrowRight
} from "lucide-react";
import { useState } from "react";

export default function Outreach() {

  const [messageType, setMessageType] = useState("linkedin");

  return (

    <DashboardLayout>
      {/* Hero Section */}

      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white mb-8">
        <div className="flex items-center gap-3">
          <Sparkles size={32} />
          <h1 className="text-4xl font-bold">
            AI Outreach Generator
          </h1>
        </div>

        <p className="mt-3 text-violet-100 text-lg">
          Generate highly personalized outreach messages using AI,
          lead intelligence and resume context.
        </p>
      </div>

      {/* Main Grid */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* Left Column */}

        <div className="space-y-6">

          {/* Lead Information */}

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <h2 className="font-bold text-xl mb-5">
              Lead Information
            </h2>

            <div className="space-y-4">

              <div>
                <label className="text-sm text-gray-500">
                  Lead Name
                </label>

                <div className="relative mt-1">
                  <User
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />

                  <input
                    placeholder="John Smith"
                    className="w-full border rounded-xl pl-10 p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Role
                </label>

                <div className="relative mt-1">
                  <Briefcase
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />

                  <input
                    placeholder="CTO"
                    className="w-full border rounded-xl pl-10 p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-500">
                  Company
                </label>

                <div className="relative mt-1">
                  <Building2
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />

                  <input
                    placeholder="OpenAI"
                    className="w-full border rounded-xl pl-10 p-3 outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              <textarea
                rows={5}
                placeholder="Additional Context..."
                className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-violet-500"
              />
              <div className="bg-white rounded-3xl p-6 shadow-sm">

  <h2 className="text-2xl font-bold mb-5">
    Outreach Type
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <button
      onClick={() => setMessageType("linkedin")}
      className={`p-4 rounded-2xl border transition-all ${
        messageType === "linkedin"
          ? "bg-violet-600 text-white border-violet-600"
          : "hover:border-violet-400"
      }`}
    >
      <Send className="mx-auto mb-2" />
      LinkedIn
    </button>

    <button
      onClick={() => setMessageType("email")}
      className={`p-4 rounded-2xl border transition-all ${
        messageType === "email"
          ? "bg-violet-600 text-white border-violet-600"
          : "hover:border-violet-400"
      }`}
    >
      <Mail className="mx-auto mb-2" />
      Email
    </button>

    <button
      onClick={() => setMessageType("followup1")}
      className={`p-4 rounded-2xl border transition-all ${
        messageType === "followup1"
          ? "bg-violet-600 text-white border-violet-600"
          : "hover:border-violet-400"
      }`}
    >
      <MessageSquare className="mx-auto mb-2" />
      Follow Up #1
    </button>

    <button
      onClick={() => setMessageType("followup2")}
      className={`p-4 rounded-2xl border transition-all ${
        messageType === "followup2"
          ? "bg-violet-600 text-white border-violet-600"
          : "hover:border-violet-400"
      }`}
    >
      <ArrowRight className="mx-auto mb-2" />
      Follow Up #2
    </button>

  </div>

</div>

              <button
                className="
                w-full
                bg-gradient-to-r
                from-violet-600
                to-indigo-600
                text-white
                py-3
                rounded-xl
                hover:scale-[1.02]
                transition-all
                flex
                items-center
                justify-center
                gap-2
              "
              >
                <Wand2 size={18} />
                Generate Outreach
              </button>

            </div>
          </div>

          {/* Lead Intelligence */}

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

            <h2 className="font-bold text-xl mb-5">
              Lead Intelligence
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Lead Score</span>
                <span className="text-green-600 font-bold">
                  92 / 100
                </span>
              </div>

              <div className="flex justify-between">
                <span>Industry</span>
                <span>Artificial Intelligence</span>
              </div>

              <div className="flex justify-between">
                <span>Decision Maker</span>
                <span className="text-green-600">
                  Yes
                </span>
              </div>

              <div className="flex justify-between">
                <span>Growth Stage</span>
                <span>Series B</span>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column */}

        <div className="lg:col-span-2 space-y-6">

          {/* Generated Message */}

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all">

            <div className="flex justify-between items-center mb-6">

              <h2 className="text-2xl font-bold">
                Generated Outreach
              </h2>

             <div
  className="
  bg-slate-50
  rounded-2xl
  p-6
  border
  min-h-[350px]
  whitespace-pre-wrap
"
>
  {messages[messageType]}
</div>

            </div>

            <div
              className="
              bg-slate-50
              rounded-2xl
              p-6
              border
              min-h-[350px]
            "
            >
              <p className="mb-4">
                Hi John,
              </p>

              <p className="mb-4">
                I came across your profile and was impressed by your
                leadership as CTO at OpenAI.
              </p>

              <p className="mb-4">
                I am currently working on AI-powered applications and
                would love to connect and learn more about your
                experience building scalable AI systems.
              </p>

              <p className="mb-4">
                Looking forward to connecting.
              </p>

              <p>
                Best Regards,
                <br />
                Shweta
              </p>
            </div>

          </div>

          {/* AI Insights */}

          <div className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all">

            <h2 className="text-2xl font-bold mb-5">
              AI Insights
            </h2>

            <div className="space-y-4">

              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
                ✓ Mentioned leadership experience to increase relevance.
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
                ✓ Referenced AI industry background for personalization.
              </div>

              <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4">
                ✓ Optimized for higher LinkedIn response rates.
              </div>

            </div>

          </div>

        </div>

      </div>
    </DashboardLayout>
  );
}