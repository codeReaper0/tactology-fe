import DepartmentForm from "@/components/app/DepartmentForm";
import DepartmentList from "@/components/app/DepartmentList";
import React from "react";

export default function DashboardPage() {
  return (
    <div className="overflow-hidden w-full h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h1 className="lg:text-lg font-medium">Departments</h1>
        <DepartmentForm />
      </div>
      <DepartmentList />
    </div>
  );
}
