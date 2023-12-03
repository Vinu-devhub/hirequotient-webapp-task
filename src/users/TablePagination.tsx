import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface TablePaginationProps<TData> {
  table: Table<TData>;
}

export function TablePagination<TData>({ table }: TablePaginationProps<TData>) {
  const pageCount = table.getPageCount();

  const pageNumbers = Array.from(
    { length: pageCount },
    (_, index) => index + 1,
  );

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex-1 text-base font-medium text-slate-700">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="first-page hidden h-8 w-8 p-0 lg:flex hover:border-slate-800 hover:border-2"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="previous-page h-8 w-8 p-0 hover:border-slate-800 hover:border-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          {table &&
            pageNumbers.map((item: number) => {
              return (
                <div
                  key={item}
                  className={`page-${item} cursor-pointer px-2 border-2  border-gray-300 hover:border-slate-800 hover:border-2 rounded ${
                    table.getState().pagination.pageIndex === item - 1
                      ? "border-slate-800 bg-slate-800 text-white "
                      : ""
                  } `}
                  onClick={() => {
                    table.setPageIndex(item - 1);
                  }}
                >
                  {item}
                </div>
              );
            })}
          <Button
            variant="outline"
            className="next-page h-8 w-8 p-0 hover:border-slate-800 hover:border-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="last-page hidden h-8 w-8 p-0 lg:flex hover:border-slate-800 hover:border-2"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
