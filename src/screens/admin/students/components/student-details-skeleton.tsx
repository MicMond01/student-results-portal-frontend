const StudentDetailsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex justify-between">
      <div className="h-8 w-32 bg-gray-200 rounded" />
      <div className="flex gap-2">
        <div className="h-10 w-24 bg-gray-200 rounded" />
        <div className="h-10 w-24 bg-gray-200 rounded" />
      </div>
    </div>

    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <div className="h-32 bg-gray-200" />
      <div className="px-8 pb-8">
        <div className="relative flex flex-col md:flex-row items-end -mt-12 mb-4 gap-6">
          <div className="h-32 w-32 rounded-full bg-gray-300 border-4 border-white" />
          <div className="flex-1 space-y-3 mb-2 w-full">
            <div className="h-8 w-1/3 bg-gray-200 rounded" />
            <div className="h-5 w-1/4 bg-gray-200 rounded" />
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
        <div className="flex gap-6 mt-6 border-b pb-4">
          <div className="h-8 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
          <div className="h-8 w-24 bg-gray-200 rounded" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="h-48 bg-white rounded-xl shadow-sm p-6 space-y-4"
          >
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
            <div className="space-y-3">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="h-32 bg-white rounded-xl shadow-sm p-6" />
          <div className="h-32 bg-white rounded-xl shadow-sm p-6" />
        </div>
        <div className="h-64 bg-white rounded-xl shadow-sm p-6" />
        <div className="h-64 bg-white rounded-xl shadow-sm p-6" />
      </div>
    </div>
  </div>
);

export default StudentDetailsSkeleton;
