import Dashboard from "./components/views/Dashboard";
import { TableProvider } from "./context/TableContext";

function App() {
  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-500 text-center">
        HireQuotient Wen APP Assignment
      </h1>
      <TableProvider>
        <Dashboard />
      </TableProvider>
    </>
  );
}

export default App;
