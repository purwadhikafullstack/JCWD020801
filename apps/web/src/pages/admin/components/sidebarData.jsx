import { PresentationChartBarIcon } from "@heroicons/react/24/solid";
import { FaPlateWheat } from "react-icons/fa6";
import { GoPeople } from "react-icons/go";
import { GrUserAdmin } from "react-icons/gr";


export const sidebarData = [
    {
        title: "Overview",
        path: "/admin-overview",
        icon: <PresentationChartBarIcon className="h-5 w-5"/>,
        admin: true
    },
    {
        title: "Admin Management",
        path: "/admin-management",
        icon: <GrUserAdmin className="h-5 w-5"/>
    },
    {
        title: "Customer Management",
        path: "/customer-management",
        icon: <GoPeople className="h-5 w-5"/>
    },
    {
        title: "Product Management",
        path: "/product-management",
        icon: <FaPlateWheat className="h-5 w-5"/>,
    },
    // {
    //     title: "Stock Management",
    //     path: "/admin-management",
    //     admin: true
    // },
    // {
    //     title: "Discount Management",
    //     path: "/admin-management",
    //     admin: true
    // },
    // {
    //     title: "Reports",
    //     path: "/admin-management",
    // },   
]