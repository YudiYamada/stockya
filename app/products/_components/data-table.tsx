"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface PlainProduct {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Column {
  header: string;
  accessor: keyof PlainProduct | ((item: PlainProduct) => React.ReactNode);
  className?: string;
}

interface DataTableProps {
  columns: Column[];
  data: PlainProduct[];
  className?: string;
}

export function DataTable({ columns, data, className }: DataTableProps) {
  return (
    <div
      className={cn(
        "w-full overflow-visible rounded-md border border-gray-200",
        className,
      )}
    >
      <table className="w-full caption-bottom border-collapse text-sm">
        {/* Cabeçalho */}
        <thead className="bg-table-header border-b border-gray-200">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn(
                  "text-foreground/80 h-12 px-4 text-left align-middle font-semibold",
                  column.className,
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Corpo */}
        <tbody className="bg-card-background divide-y divide-gray-200">
          {data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="transition-colors hover:bg-gray-50/50"
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn(
                      "text-foreground p-4 align-middle",
                      column.className,
                    )}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-gray-400"
              >
                Nenhum resultado encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
