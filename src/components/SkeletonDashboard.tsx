import React from 'react';

export const SkeletonDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-8">
        <div className="h-8 w-48 bg-slate-700 rounded"></div>
        <div className="flex gap-4">
          <div className="h-10 w-24 bg-slate-700 rounded"></div>
          <div className="h-10 w-32 bg-slate-700 rounded"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 bg-slate-800 rounded-lg p-4 border border-slate-700/50"></div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 h-96 bg-slate-800 rounded-lg border border-slate-700/50"></div>
        <div className="h-96 bg-slate-800 rounded-lg border border-slate-700/50"></div>
      </div>
    </div>
  );
};