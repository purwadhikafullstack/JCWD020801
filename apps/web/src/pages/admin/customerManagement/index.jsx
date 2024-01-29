import { useState } from "react";
import AdminSidebar from "../components/sidebarAdminDashboard";
import { TableHeader } from "../components/tableHeader";
import CustomerTable from "./components/customerTable";

export default function CustomerManagement() {
    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col  h-screen p-5 gap-3 items-center bg-[#edf7f4] w-full">
                <TableHeader
                title={'Customer Management'}
                description={'The current list of registered customers.'}
                showAddButton={false}
                searchValue={searchValue}
                setSearchValue={setSearchValue}/>
                <CustomerTable />
            </div>
        </div>
    )
}