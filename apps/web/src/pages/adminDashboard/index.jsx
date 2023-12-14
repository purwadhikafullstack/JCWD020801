import Overview from "./components/overview";
import { SidebarAdminDashboard } from "./components/sidebar";

export default function AdminDashboard() {
    return (
        <>
            {/* <SidebarAdminDashboard /> */}
            <div className="flex flex-col h-screen items-center justify-center bg-[#edf7f4]">
                <Overview />
            </div>
        </>
    )
}