import { useSelector } from "react-redux"
import AdminSidebar from "../components/sidebarAdminDashboard";
import { StoreOverview } from "./components/storeOverview";

export const StoreManagement = () => {
    const adminDataRedux = useSelector((state) => state.admin.value);

    return (
        <>
            {adminDataRedux?.isSuperAdmin === true ?
                (<>
                    <div className="flex flex-col lg:flex-row">
                        <AdminSidebar />
                        <div className="flex flex-col px-[10px] lg:p-5 gap-3 bg-[#edf7f4] w-full h-full">
                            <StoreOverview />
                        </div>
                    </div>
                </>) : ("")
            }
        </>
    )
}