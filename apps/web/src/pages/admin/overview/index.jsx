
import AdminSidebar from "../components/sidebarAdminDashboard";
import { getCardData } from "./components/cardData";
import { useEffect, useState } from "react";
import CardOverview from "./components/cardOverview";
import { useSelector } from "react-redux";

export default function Overview() {
  const [cards, setCards] = useState([]);
  const adminDataRedux = useSelector((state) => state.admin.value);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCardData();
        setCards(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <AdminSidebar />
      <div className="flex flex-col p-1 md:p-9 w-full bg-[#edf7f4]">
        <p className="font-bold text-lg">Overview</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-9 items-center text-center text-white">
          {cards.map((item, index) => (
            <>
              {adminDataRedux.isSuperAdmin === true ?
                <CardOverview
                  key={index}
                  title={item.title}
                  desc={item.desc}
                  path={item.path}
                  icon={item.icon}
                  data={item.data}
                />
                :
                <>
                  {item.admin == true && <CardOverview
                    key={index}
                    title={item.title}
                    desc={item.desc}
                    path={item.path}
                    icon={item.icon}
                    data={item.data}
                  />}
                </>
              }
            </>
          ))}
        </div>
      </div>
    </div>
  )
}