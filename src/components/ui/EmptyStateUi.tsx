import {EmptyState} from "icons/index";
import React from "react";

export default function EmptyStateUi() {
  return (
    <div className="flex flex-col items-center py-20 w-full">
      <EmptyState />
      <p className="text-sm font-medium mt-4">Nothing to show here</p>
    </div>
  );
}
