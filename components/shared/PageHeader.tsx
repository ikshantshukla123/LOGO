// components/shared/PageHeader.tsx
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: {
    text: string;
    animated?: boolean;
  };
  children?: ReactNode;
}

export default function PageHeader({ title, description, badge, children }: PageHeaderProps) {
  return (
    <div className="text-center mb-12">
      {badge && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 border border-gray-700 mb-4">
          {badge.animated && (
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          )}
          <span className="text-sm font-medium text-gray-300">{badge.text}</span>
        </div>
      )}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h1>
      {description && <p className="text-gray-400">{description}</p>}
      {children}
    </div>
  );
}
