import { useDataTable } from "@/context/TableContext";
import { DataTable } from "@/users/DataTable";
import { User, columns } from "@/users/columns";

import { useEffect } from "react";

const Dashboard = () => {
  const { dispatch } = useDataTable();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json",
      );
      const data = await response.json();
      dispatch({ type: "SET_DATA", payload: data });
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="hidden h-full container mx-auto flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">Here&apos;s a list of users!</p>
        </div>
      </div>
      <div>
        <DataTable<User, keyof User> columns={columns} />
      </div>
    </div>
  );
};

export default Dashboard;
