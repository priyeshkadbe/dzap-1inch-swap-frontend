import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen flex items-center justify-center mt-14">
      <div className="flex flex-col bg-[#191B1F] w-[30rem] rounded-2xl p-4">
        {children}
      </div>
    </div>
  );
}
