import { Button } from "@/components/ui/button";
import { useDataTable } from "@/context/TableContext";
import { PenSquare, Save, Trash } from "lucide-react";
import React from "react";

interface TableActionsProps {
  rowId: string;
  editRowId: string;
}

const TableActions: React.FC<TableActionsProps> = ({ rowId, editRowId }) => {
  const { dispatch, state } = useDataTable();

  const handleEditRow = () => {
    console.log("editRowId", editRowId);

    dispatch({ type: "EDIT_ROW", payload: { editRowId, editing: true } });
  };

  const handleSaveRowData = () => {
    dispatch({ type: "EDIT_ROW", payload: { editRowId: "", editing: false } });
    dispatch({ type: "SAVE_EDIT_ROW", payload: { rowId } });
  };

  const handleDeleteRow = () => {
    dispatch({ type: "DELETE_ROW", payload: rowId });
  };

  return (
    <div className=" flex gap-4 justify-center">
      {state.editing && state.editRowId === editRowId ? (
        <Button
          variant="ghost"
          size="icon"
          className="save"
          onClick={handleSaveRowData}
        >
          <Save className=" h-4 w-4 text-green-500" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="edit"
          onClick={handleEditRow}
        >
          <PenSquare className=" h-4 w-4 text-green-500" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="delete"
        onClick={handleDeleteRow}
      >
        <Trash className=" h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
};

export default TableActions;
