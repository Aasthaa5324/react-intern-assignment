import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

type Row = {
  job: string;
  submitted: string;
  status: string;
  submitter: string;
  url: string;
  assigned: string;
  priority: string;
  due: string;
  value: string;
};

const data: Row[] = [
  {
    job: "Launch social media campaign for product",
    submitted: "15-11-2024",
    status: "In-process",
    submitter: "Aisha Patel",
    url: "www.aishapatel.com",
    assigned: "Sophie Choudhury",
    priority: "Medium",
    due: "20-11-2024",
    value: "6,200,000 ₹",
  },
  {
    job: "Update press kit for company redesign",
    submitted: "28-10-2024",
    status: "Need to start",
    submitter: "Irfan Khan",
    url: "www.irfankhanpro.com",
    assigned: "Tejas Pandey",
    priority: "High",
    due: "30-10-2024",
    value: "3,500,000 ₹",
  },
  {
    job: "Finalize user testing feedback for app",
    submitted: "05-12-2024",
    status: "In-process",
    submitter: "Mark Johnson",
    url: "www.markjohnson.io",
    assigned: "Rachel Lee",
    priority: "Medium",
    due: "10-12-2024",
    value: "4,750,000 ₹",
  },
  {
    job: "Design new features for the website",
    submitted: "10-01-2025",
    status: "Complete",
    submitter: "Emily Green",
    url: "www.emilygreen.dev",
    assigned: "Tom Wright",
    priority: "Low",
    due: "15-01-2025",
    value: "5,900,000 ₹",
  },
  {
    job: "Prepare financial report for Q4",
    submitted: "25-01-2025",
    status: "Blocked",
    submitter: "Jessica Brown",
    url: "www.jessicabrown.net",
    assigned: "Kevin Smith",
    priority: "Low",
    due: "30-01-2025",
    value: "2,800,000 ₹",
  },
];

const columns: ColumnDef<Row>[] = [
  { accessorKey: "job", header: "Job Request" },
  { accessorKey: "submitted", header: "Submitted" },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const value = info.getValue() as string;
      const color =
        value === "Complete"
          ? "bg-green-600"
          : value === "In-process"
          ? "bg-yellow-500"
          : value === "Need to start"
          ? "bg-blue-500"
          : value === "Blocked"
          ? "bg-red-600"
          : "bg-gray-500";
      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${color}`}
        >
          {value}
        </span>
      );
    },
  },
  { accessorKey: "submitter", header: "Submitter" },
  {
    accessorKey: "url",
    header: "URL",
    cell: (info) => (
      <a
        href={`https://${info.getValue()}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {info.getValue() as string}
      </a>
    ),
  },
  { accessorKey: "assigned", header: "Assigned" },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (info) => {
      const value = info.getValue() as string;
      const color =
        value === "High"
          ? "text-red-600"
          : value === "Medium"
          ? "text-yellow-700"
          : "text-blue-600";
      return <span className={`font-semibold ${color}`}>{value}</span>;
    },
  },
  { accessorKey: "due", header: "Due Date" },
  { accessorKey: "value", header: "Est. Value" },
];

export default function Spreadsheet() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [activeTab, setActiveTab] = useState("All Orders");
  const tabs = ["All Orders", "Pending", "Reviewed", "Arrived"];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          📊 Q3 Financial Overview
        </h2>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
            Import
          </button>
          <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
            Export
          </button>
          <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">
            Share
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm border rounded bg-white">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-gray-100 text-gray-700 text-xs uppercase font-semibold">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-3 py-2 border-b">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-t pt-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-sm px-3 py-1 rounded-t border-b-2 transition-all font-medium ${
              activeTab === tab
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
        <button className="ml-auto text-gray-500 text-xl">＋</button>
      </div>
    </div>
  );
}
