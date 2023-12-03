import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDataTable } from "@/context/TableContext";
import { TablePagination } from "./TablePagination";
import { UserSearch } from "./UserSearch";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DataTable<TData extends Record<string, any>, TValue>({
  columns,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { state, dispatch } = useDataTable();

  const table = useReactTable({
    data: state.data as unknown as TData[],
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const handleDeleteMultipleRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedRowIds = selectedRows.map((row) => row.original?.id);
    dispatch({ type: "DELETE_MULTIPLE_ROWS", payload: selectedRowIds });
    setRowSelection({});
  };

  return (
    <div className="space-y-4">
      <div className=" flex justify-between" onClick={handleDeleteMultipleRows}>
        <UserSearch table={table} />
        <div
          className={` p-2 mr-4 bg-slate-300 rounded-md cursor-pointer ${
            table.getIsSomePageRowsSelected() ||
            table.getIsAllPageRowsSelected()
              ? "bg-red-300"
              : ""
          }`}
        >
          <Trash2
            className={`h-6 w-6  ${
              table.getIsSomePageRowsSelected() ||
              table.getIsAllPageRowsSelected()
                ? "text-red-500"
                : "text-black"
            } `}
          />
        </div>
      </div>
      <div className="rounded-lg border-2 border-slate-900">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className=" border-b-2 border-slate-800"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className=" text-base font-bold uppercase text-secondColor py-6"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={` data-[state=selected]:bg-slate-300`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TablePagination table={table} />
    </div>
  );
}
