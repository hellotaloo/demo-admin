import { LayoutGrid } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Overview of your recruitment automation platform
        </p>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <LayoutGrid className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-lg font-medium text-gray-900 mb-1">
          Dashboard coming soon
        </h2>
        <p className="text-sm text-gray-500 text-center max-w-sm">
          This dashboard will show an overview of your recruitment automation platform.
        </p>
      </div>
    </div>
  );
}
