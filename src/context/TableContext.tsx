import { User } from "@/users/columns";
import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from "react";

// interface DataRow {
//   id: string;
//   // Include other properties as needed
// }

interface TableState {
  data: User[];
  editing: boolean;
  editRowId: string;
  user: User;
  // Add more state properties as needed
}

interface SetDataAction {
  type: "SET_DATA";
  payload: User[];
}

interface DeleteRowAction {
  type: "DELETE_ROW";
  payload: string;
}

interface DeleteMultipleRowsAction {
  type: "DELETE_MULTIPLE_ROWS";
  payload: string[];
}

interface EditRowAction {
  type: "EDIT_ROW";
  payload: { editRowId: string; editing: boolean };
}

interface SaveEditRowAction {
  type: "SAVE_EDIT_ROW";
  payload: { rowId: string };
}
interface SaveName {
  type: "SAVE_NAME";
  payload: { rowId: string; name: string };
}
interface SaveEmail {
  type: "SAVE_EMAIL";
  payload: { rowId: string; email: string };
}
interface SaveRole {
  type: "SAVE_ROLE";
  payload: { rowId: string; role: string };
}

type TableAction =
  | SetDataAction
  | DeleteRowAction
  | DeleteMultipleRowsAction
  | EditRowAction
  | SaveEditRowAction
  | SaveName
  | SaveEmail
  | SaveRole;

const ActionTypes = {
  SET_DATA: "SET_DATA",
  DELETE_ROW: "DELETE_ROW",
  DELETE_MULTIPLE_ROWS: "DELETE_MULTIPLE_ROWS",
  EDIT_ROW: "EDIT_ROW",
  SAVE_EDIT_ROW: "SAVE_EDIT_ROW",
  SAVE_NAME: "SAVE_NAME",
  SAVE_EMAIL: "SAVE_EMAIL",
  SAVE_ROLE: "SAVE_ROLE",
} as const;

const TableContext = createContext<
  | {
      state: TableState;
      dispatch: Dispatch<TableAction>;
    }
  | undefined
>(undefined);

const initialState: TableState = {
  data: [],
  editing: false,
  editRowId: "",
  user: {
    id: "",
    name: "",
    email: "",
    role: "",
  },
  // Initialize other state properties as needed
};

const reducer = (state: TableState, action: TableAction): TableState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return {
        ...state,
        data: action.payload,
      };

    case ActionTypes.DELETE_ROW:
      return {
        ...state,
        data: state.data.filter((row) => row.id !== action.payload),
      };

    case ActionTypes.DELETE_MULTIPLE_ROWS:
      return {
        ...state,
        data: state.data.filter((row) => !action.payload.includes(row.id)),
      };

    case ActionTypes.EDIT_ROW:
      return {
        ...state,
        editing: action.payload.editing,
        editRowId: action.payload.editRowId,
      };

    case ActionTypes.SAVE_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload.name,
        },
      };
    case ActionTypes.SAVE_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.payload.email,
        },
      };
    case ActionTypes.SAVE_ROLE:
      console.log("action.payload.role", action.payload.role);

      return {
        ...state,
        user: {
          ...state.user,
          role: action.payload.role,
        },
      };
    case ActionTypes.SAVE_EDIT_ROW:
      return {
        ...state,
        data: state.data.map((row) => {
          state.user.id = action.payload.rowId;
          return row.id === action.payload.rowId
            ? { ...row, ...state.user }
            : row;
        }),
      };

    // Add more cases as needed

    default:
      return state;
  }
};

export const TableProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDataTable = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useDataTable must be used within a DataTableProvider");
  }
  return context;
};

export { ActionTypes }; // Export ActionTypes separately
