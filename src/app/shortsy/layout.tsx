import React from "react";

export default function ShortsyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden">
      {children}
    </div>
  );
} 