import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import EmailCell from "./EmailCell";
import NameCell from "./NameCell";
import RoleCell from "./RoleCell";
import TableActions from "./TableActions";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "member" | string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return <NameCell row={row} />;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <EmailCell row={row} />;
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      return <RoleCell row={row} />;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className=" text-center">Actions</div>,
    cell: ({ row }) => (
      <TableActions rowId={row.original.id} editRowId={row.id} />
    ),
  },
];
