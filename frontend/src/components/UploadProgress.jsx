import {
  Brain,
  FileSearch,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function UploadProgress() {
  return (
    <div className="bg-white rounded-[32px] p-8 shadow-xl">

      <div className="flex items-center gap-3 mb-8">

        <Brain
          size={40}
          className="text-violet-600"
        />

        <div>

          <h2 className="text-3xl font-bold">
            AI Processing
          </h2>

          <p className="text-gray-500">
            Please wait while we analyze the LinkedIn profile.
          </p>

        </div>

      </div>

      {/* Progress */}

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

        <div
          className="
          h-full
          bg-gradient-to-r
          from-violet-600
          to-indigo-600
          animate-pulse
        "
          style={{ width: "75%" }}
        />

      </div>

      <div className="mt-8 space-y-5">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-green-500" />

          Reading PDF

        </div>

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-green-500" />

          Extracting Experience

        </div>

        <div className="flex items-center gap-3">

          <FileSearch className="text-violet-600" />

          Finding Skills

        </div>

        <div className="flex items-center gap-3">

          <Sparkles className="text-violet-600" />

          Calculating AI Lead Score

        </div>

      </div>

    </div>
  );
}