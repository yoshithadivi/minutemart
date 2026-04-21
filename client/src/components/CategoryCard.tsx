import React from 'react';

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  color?: string;
}

export default function CategoryCard({ title, icon, color = 'bg-blue-100' }: CategoryCardProps) {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-brand-500 transition-all group">
      <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className="text-sm font-medium text-gray-700 text-center leading-tight">{title}</span>
    </div>
  );
}
