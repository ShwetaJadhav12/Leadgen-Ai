import DashboardLayout from "../layouts/DashboardLayout";

export default function Assistant() {
  return (
    <DashboardLayout>

      <h1 className="text-5xl font-bold mb-8">
        AI Assistant
      </h1>

      <div className="bg-white rounded-3xl p-6 h-[600px] flex flex-col">

        <div className="flex-1 overflow-auto">
          <div className="bg-gray-100 p-4 rounded-xl mb-4">
            Which leads should I contact first?
          </div>

          <div className="bg-violet-100 p-4 rounded-xl">
            Focus on CTOs and Founders with scores above 85.
          </div>
        </div>

        <input
          placeholder="Ask AI..."
          className="border p-3 rounded-xl mt-4"
        />

      </div>

    </DashboardLayout>
  );
}