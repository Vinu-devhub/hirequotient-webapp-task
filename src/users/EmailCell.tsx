import { Input } from "@/components/ui/input";
import { useDataTable } from "@/context/TableContext";
import { Row } from "@tanstack/react-table";
import { useState } from "react";
import { User } from "./columns";

interface EmailColumnProps {
  row: Row<User>;
}

const EmailCell = ({ row }: EmailColumnProps) => {
  const { dispatch, state } = useDataTable();
  const [editedEmail, setEditedEmail] = useState(row.original.email);

  const handleBlur = () => {
    if (state.editing) {
      dispatch({
        type: "SAVE_EMAIL",
        payload: { rowId: row.original.id, email: editedEmail },
      });
    }
  };

  return state.editing && state.editRowId === row.id ? (
    <>
      <Input
        value={editedEmail}
        onChange={(e) => setEditedEmail(e.target.value)}
        onBlur={handleBlur}
        autoFocus
        className=" border border-slate-800 outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </>
  ) : (
    <div>{row.original.email}</div>
  );
};

export default EmailCell;
