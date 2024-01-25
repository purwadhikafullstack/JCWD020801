import { useSelector } from "react-redux"
import AdminSidebar from "../components/sidebarAdminDashboard";
import { StoreOverview } from "./components/storeOverview";

export const StoreManagement = () => {
    const adminDataRedux = useSelector((state) => state.admin.value);

    return (
        <>
            {adminDataRedux?.isSuperAdmin === true ?
                (<>
                    <div className="flex flex-row">
                        <AdminSidebar />
                        <div className="flex flex-col p-5 gap-3 bg-[#edf7f4] w-full">
                            <StoreOverview />
                        </div>
                    </div>
                </>) : ("")
            }
        </>
    )
}