import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { Search } from "lucide-react";

interface UserSearchProps<TData> {
  table: Table<TData>;
}

export function UserSearch<TData>({ table }: UserSearchProps<TData>) {
  return (
    <div className=" flex items-center justify-between">
      <div className="relative flex flex-1 items-center space-x-2">
        <Search className="search-icon absolute right-4 " />
        <Input
          placeholder="Search users..."
          value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("role")?.setFilterValue(event.target.value)
          }
          className="search h-8 w-[150px] lg:w-[250px] outline"
        />
      </div>
    </div>
  );
}
