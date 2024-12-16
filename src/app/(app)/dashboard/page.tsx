import DepartmentList from "@/components/app/DepartmentList";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="overflow-hidden w-full h-full flex flex-col">
      <DepartmentList />
    </div>
  );
}
