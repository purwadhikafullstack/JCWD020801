
import AdminSidebar from "../components/sidebarAdminDashboard";

import { cardData } from "./components/cardData";
import { useEffect, useState } from "react";
import CardOverview from "./components/cardOverview";

export default function Overview() {
  const [totalAdmin, setTotalAdmin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await cardData();
        setTotalAdmin(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-row">
      <AdminSidebar />
      <div className="flex flex-col p-1 md:p-9 w-full bg-[#edf7f4]">
        <p className="font-bold text-lg">Overview</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-9 items-center text-center text-white">
          <CardOverview totalAdmin={totalAdmin} />
        </div>
      </div>
    </div>
  )
}