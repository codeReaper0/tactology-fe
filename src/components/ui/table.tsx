import React from "react";

export const TableDataD = ({
  content,
}: {
  content: string | number | undefined;
}) => {
  return <td className="p-4 text-sm text-black/80 font-medium">{content}</td>;
};
