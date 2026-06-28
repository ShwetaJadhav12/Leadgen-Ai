import {
  User,
  Building2,
  Briefcase,
  MapPin,
  Brain,
  GraduationCap,
  Star,
  CheckCircle2,
  Save,
  Pencil,
  Sparkles,
} from "lucide-react";

export default function LeadPreview({
  lead,
  onSave,
  onEdit,
}) {
  if (!lead) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50 p-6">

      <div className="bg-white rounded-[32px] w-full max-w-6xl max-h-[92vh] overflow-y-auto shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white rounded-t-[32px]">

          <div className="flex justify-between items-center">

            <div>

              <div className="flex items-center gap-3">

                <Sparkles />

                <h1 className="text-4xl font-bold">
                  AI Lead Analysis
                </h1>

              </div>

              <p className="mt-3 text-violet-100">
                Review the extracted information before saving.
              </p>

            </div>

            <div className="bg-white/20 px-6 py-4 rounded-2xl">

              <p className="text-sm">
                AI Confidence
              </p>

              <h2 className="text-3xl font-bold">
                98%
              </h2>

            </div>

          </div>

        </div>

        {/* Body */}

        <div className="p-8 grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="space-y-6">

            <div className="bg-gray-50 rounded-3xl p-6">

              <div className="flex items-center gap-4">

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold">

                  {lead.name?.charAt(0)}

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    {lead.name}
                  </h2>

                  <p className="text-gray-500">
                    {lead.role}
                  </p>

                  <p className="text-gray-400">
                    {lead.company}
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white border rounded-3xl p-6">

              <h3 className="font-bold text-xl mb-5">
                Basic Information
              </h3>

              <div className="space-y-4">

                <div className="flex gap-3">

                  <Building2 />

                  <span>{lead.company}</span>

                </div>

                <div className="flex gap-3">

                  <Briefcase />

                  <span>{lead.role}</span>

                </div>

                <div className="flex gap-3">

                  <MapPin />

                  <span>{lead.location}</span>

                </div>

                <div className="flex gap-3">

                  <GraduationCap />

                  <span>{lead.education}</span>

                </div>

              </div>

            </div>

          </div>

          {/* CENTER */}

          <div className="space-y-6">

            <div className="bg-white border rounded-3xl p-6">

              <h3 className="text-xl font-bold mb-5">

                About

              </h3>

              <p className="text-gray-600 leading-7">

                {lead.summary}

              </p>

            </div>

            <div className="bg-white border rounded-3xl p-6">

              <h3 className="text-xl font-bold mb-5">

                Skills

              </h3>

              <div className="flex flex-wrap gap-3">

                {lead.skills?.map((skill) => (

                  <span
                    key={skill}
                    className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full"
                  >
                    {skill}
                  </span>

                ))}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-3xl p-6 text-white">

              <div className="flex items-center gap-3">

                <Brain />

                <h2 className="text-xl font-bold">

                  AI Lead Score

                </h2>

              </div>

              <div className="mt-6 text-center">

                <h1 className="text-7xl font-black">

                  {lead.score}

                </h1>

                <p className="text-violet-100">

                  out of 100

                </p>

              </div>

            </div>

            <div className="bg-white border rounded-3xl p-6">

              <h3 className="font-bold text-xl mb-5">

                AI Insights

              </h3>

              <div className="space-y-4">

                <div className="flex gap-3">

                  <CheckCircle2 className="text-green-500" />

                  Decision Maker

                </div>

                <div className="flex gap-3">

                  <CheckCircle2 className="text-green-500" />

                  High Response Probability

                </div>

                <div className="flex gap-3">

                  <CheckCircle2 className="text-green-500" />

                  Strong Technical Background

                </div>

                <div className="flex gap-3">

                  <Star className="text-yellow-500" />

                  Recommended for Outreach

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t p-6 flex justify-end gap-4">

          <button
            onClick={onEdit}
            className="px-6 py-3 rounded-2xl border flex items-center gap-2"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={onSave}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white flex items-center gap-2"
          >
            <Save size={18} />
            Save Lead
          </button>

        </div>

      </div>

    </div>
  );
}