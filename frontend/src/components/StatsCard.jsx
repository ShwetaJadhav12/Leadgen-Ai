export default function StatCard({
  title,
  value,
  icon: Icon,
  growth,
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-2 text-gray-900">
            {value}
          </h2>
        </div>

        <div className="bg-indigo-100 p-3 rounded-2xl">
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>

      </div>

      <div className="mt-4">
        <span className="text-green-600 font-medium">
          {growth}
        </span>

        <span className="text-gray-400 text-sm ml-2">
          vs last month
        </span>
      </div>
    </div>
  );
}