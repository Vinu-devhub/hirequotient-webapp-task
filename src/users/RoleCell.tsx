import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDataTable } from "@/context/TableContext";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { User } from "./columns";

interface RoleColumnProps {
  row: Row<User>;
}

const RoleCell = ({ row }: RoleColumnProps) => {
  const { dispatch, state } = useDataTable();
  const [editedRole, setEditedRole] = useState(row.original.role);

  const handleSelect = (selectvalue: string) => {
    if (state.editing) {
      setEditedRole(selectvalue);
      dispatch({
        type: "SAVE_ROLE",
        payload: { rowId: row.original.id, role: selectvalue },
      });
    }
  };

  return state.editing && state.editRowId === row.id ? (
    <>
      <Select value={editedRole} onValueChange={(e: string) => handleSelect(e)}>
        <SelectTrigger className=" border border-slate-800 outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          <SelectValue placeholder="admin" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">admin</SelectItem>
          <SelectItem value="member">member</SelectItem>
        </SelectContent>
      </Select>
    </>
  ) : (
    <div>{row.original.role}</div>
  );
};

export default RoleCell;
