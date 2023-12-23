import AdminSidebar from "../components/sidebarAdminDashboard";
import CustomerTable from "./components/customerTable";

export default function CustomerManagement() {
    return (
        <div className="flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col  h-screen p-5 gap-3 bg-[#edf7f4] w-full">
                <CustomerTable />
            </div>
        </div>
    )
}