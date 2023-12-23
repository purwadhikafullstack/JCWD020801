import {
    Avatar,
    Button,
    Typography
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import { sidebarData } from "./sidebarData";
import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { IoMdLogOut } from "react-icons/io";
import axios from "../../../api/axios";
import React from "react";

export default function AdminSidebar() {
    const adminData = useSelector((state) => state.admin.value);
    const token = localStorage.getItem('admtoken');

    const handleLogout = async () => {
        try {
            await axios.post('admins/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            localStorage.removeItem("admtoken");
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 gap-5 h-screen bg-[#41907a]">
            <div className="flex flex-col items-center justify-center h-60 gap-2">
                <Avatar size="xxl" src="https://docs.material-tailwind.com/img/team-3.jpg" alt="avatar" />
                <div className="flex flex-col justify-center items-center">
                    <Typography variant="h5" color="white">{adminData?.name || 'undefined'}</Typography>
                    <Typography color="white" >{adminData?.isSuperAdmin ? <>Super Admin</> : <>Admin</>}</Typography>
                </div>
                <NavLink to={'/admin-profile'}>
                    <Button variant="filled" className=" flex items-center gap-3 bg-[#9dd5c6] text-[#2f6a59] rounded-lg">
                        <UserCircleIcon className="h-5 w-5" />Profile & Settings
                    </Button>
                </NavLink>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
                {sidebarData.map((item, index) => (
                    <React.Fragment key={index}>
                        {adminData?.isSuperAdmin === true ? (
                            <NavLink
                                to={item.path}
                                className={({ isActive, isPending }) =>
                                    `flex cursor-pointer w-full p-3 rounded-md ${isActive
                                        ? "bg-[#edf7f4] text-[#41907a]"
                                        : "text-[#edf7f4] hover:bg-[#edf7f4] hover:text-[#41907a]"
                                    }`
                                }
                            >
                                <div className="flex flex-row w-full gap-2 items-center">
                                    {item.icon}
                                    {item.title}
                                </div>
                            </NavLink>
                        ) : (
                            <>
                                {item.admin === true && (
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive, isPending }) =>
                                            `flex cursor-pointer w-full p-3 rounded-md ${isActive
                                                ? "bg-[#edf7f4] text-[#41907a]"
                                                : "text-[#edf7f4] hover:bg-[#edf7f4] hover:text-[#41907a]"
                                            }`
                                        }
                                    >
                                        <div className="flex flex-row w-full gap-2 items-center">
                                            {item.icon}
                                            {item.title}
                                        </div>
                                    </NavLink>
                                )}
                            </>
                        )}
                    </React.Fragment>
                ))}
                <div onClick={handleLogout} className="flex items-start cursor-pointer w-full p-3 rounded-lg text-white hover:bg-[#edf7f4] hover:text-[#41907a]">
                    <div className="flex flex-row w-full gap-2 items-center">
                        <IoMdLogOut className="h-5 w-5" />
                        Logout
                    </div>
                </div>
            </div>
        </div>
    )
}