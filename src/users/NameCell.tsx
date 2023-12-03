import { Input } from "@/components/ui/input";
import { useDataTable } from "@/context/TableContext";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { User } from "./columns";

interface NameColumnProps {
  row: Row<User>;
}

const NameCell = ({ row }: NameColumnProps) => {
  const { dispatch, state } = useDataTable();
  const [editedName, setEditedName] = useState(row.original.name);

  const handleBlur = () => {
    if (state.editing) {
      dispatch({
        type: "SAVE_NAME",
        payload: { rowId: row.original.id, name: editedName },
      });
    }
  };

  return state.editing && state.editRowId === row.id ? (
    <>
      <Input
        value={editedName}
        onChange={(e) => setEditedName(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className=" border border-slate-800 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </>
  ) : (
    <div>{row.original.name}</div>
  );
};

export default NameCell;
