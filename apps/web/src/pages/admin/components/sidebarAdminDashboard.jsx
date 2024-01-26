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
import { BsChevronDown } from 'react-icons/bs';
import axios from "../../../api/axios";
import React, { useState } from "react";

export default function AdminSidebar({subMenuStatus = false}) {
    const adminData = useSelector((state) => state.admin.value);
    const token = localStorage.getItem('admtoken');
    const [subMenuOpen, setSubMenuOpen] = useState(subMenuStatus);

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
        <div className="w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 gap-5 bg-[#4eaf94]">
            <div className="flex flex-col items-center justify-center h-60 gap-2">
                <Avatar size="xxl" src="https://docs.material-tailwind.com/img/team-3.jpg" alt="avatar" />
                <div className="flex flex-col justify-center items-center">
                    <Typography variant="h5" color="white">{adminData?.name || 'undefined'}</Typography>
                    <Typography color="white" >{adminData?.isSuperAdmin ? <>Super Admin</> : <>Admin</>}</Typography>
                </div>
                <NavLink to={'/admin-profile'}>
                    <Button variant="filled" className=" flex items-center gap-3 bg-[#9dd5c6] text-[#2f6a59] rounded-2xl">
                        <UserCircleIcon className="h-5 w-5" />Profile & Settings
                    </Button>
                </NavLink>
            </div>
            <div className="flex flex-col items-center gap-3 p-4">
                {sidebarData.map((item, index) => (
                    <React.Fragment key={index}>
                        {adminData?.isSuperAdmin === true ? (
                            <>
                                {!item.subMenus ?
                                    <NavLink
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex cursor-pointer w-full p-3 rounded-2xl ${isActive
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
                                    :
                                    <>
                                        <div onClick={() => setSubMenuOpen(!subMenuOpen)} className={'flex flex-col cursor-pointer w-full p-3 rounded-md text-[#edf7f4]'}>
                                            <div className="flex flex-row w-full gap-2 items-center">
                                                {item.icon}
                                                {item.title}
                                                <BsChevronDown
                                                    className={`${subMenuOpen && 'rotate-180'}`}
                                                />
                                            </div>
                                        </div>
                                        {subMenuOpen &&
                                            <div className="flex flex-col w-full pl-8 pr-8">
                                                {item.subMenus.map((subMenuItem, index) => (
                                                    <NavLink to={subMenuItem.path} key={index}
                                                        className={({ isActive }) =>
                                                            `flex cursor-pointer w-full p-3 rounded-2xl mb-2 ${isActive
                                                                ? "bg-[#edf7f4] text-[#41907a]"
                                                                : "text-[#edf7f4] hover:bg-[#edf7f4] hover:text-[#41907a]"
                                                            }`
                                                        }>
                                                        {subMenuItem.title}
                                                    </NavLink>
                                                ))}
                                            </div>
                                        }
                                    </>
                                }
                            </>
                        ) : (
                            <>
                                {item.admin === true && (
                                    <>
                                    {!item.subMenus ?
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `flex cursor-pointer w-full p-3 rounded-2xl ${isActive
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
                                        :
                                        <>
                                            <div onClick={() => setSubMenuOpen(!subMenuOpen)} className={'flex flex-col cursor-pointer w-full p-3 rounded-md text-[#edf7f4]'}>
                                                <div className="flex flex-row w-full gap-2 items-center">
                                                    {item.icon}
                                                    {item.title}
                                                    <BsChevronDown
                                                        className={`${subMenuOpen && 'rotate-180'}`}
                                                    />
                                                </div>
                                            </div>
                                            {subMenuOpen &&
                                                <div className="flex flex-col w-full pl-8 pr-8">
                                                    {item.subMenus.map((subMenuItem, index) => (
                                                        <NavLink to={subMenuItem.path} key={index}
                                                            className={({ isActive }) =>
                                                                `flex cursor-pointer w-full p-3 rounded-2xl mb-2 ${isActive
                                                                    ? "bg-[#edf7f4] text-[#41907a]"
                                                                    : "text-[#edf7f4] hover:bg-[#edf7f4] hover:text-[#41907a]"
                                                                }`
                                                            }>
                                                            {subMenuItem.title}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            }
                                        </>
                                    }
                                </>
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