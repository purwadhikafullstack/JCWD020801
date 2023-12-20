import avaDummy from "../../assets/userDashboard/ava-dummy.png";
import appLogoWhite from "../../assets/userDashboard/app-logo-white.svg"
import personIcon from "../../assets/userDashboard/person.svg";
import addressIcon from "../../assets/userDashboard/address.svg";
import passwordIcon from "../../assets/userDashboard/password.svg";
import orderIcon from "../../assets/userDashboard/order.svg";
import wishlistIcon from "../../assets/userDashboard/wishlist.svg";
import logoutIcon from "../../assets/userDashboard/logout.svg";
import toHomeIcon from "../../assets/userDashboard/toHome.svg";

import { useState } from "react";

import { PersonalInformation } from "./components/personalInfo";
import { UserAddress } from "./components/userAddress";
import { ResetPassword } from "./components/resetPassword";
import { AnimationWrapper } from "./components/animationWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const menuList = [
    { title: "Personal Information", icon: personIcon },
    { title: "User Address", icon: addressIcon },
    { title: "Reset Password", icon: passwordIcon },
    { title: "Order History", icon: orderIcon },
    { title: "Wishlist", icon: wishlistIcon },
];

export const UserDashboard = () => {
    const navigate = useNavigate()
    const customer = useSelector((state) => state.customer.value)
    // console.log(customer);
    const [selectedOption, setSelectedOption] = useState(0);

    const handleMenuClick = (index) => {
        setSelectedOption(index);
    };

    return (
        <section className="bg-[#FAFAFC]">
            <div className="bg-[#71C1AB] flex justify-between items-center px-[160px] py-2 mb-4 border-b border-[#E4E4E4]">
                <img src={appLogoWhite} alt="" className="h-[35px]"></img>
            </div>
            <div className="mx-[160px] pb-7 pt-1">
                {/* Navbar */}
                {/* Breadcrumb */}
                <div className="flex w-max justify-center gap-1.5 rounded-lg bg-none pl-1.5  text-[14px] font-medium text-gray-500">
                    <span className="">Home</span>
                    <div className="flex items-center pt-[0.2rem]">
                        <svg width="6" height="10" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 11.5L6.5 6.5L1.5 1.5" stroke="#6B7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <span>My Account</span>
                </div>
                {/*  */}
                <div className="mt-4 flex justify-start gap-[2rem]">
                    {/* Left Col: Menu */}
                    <div className="flex h-max flex-col gap-[0.2rem] rounded-2xl border border-[#E6E6E5] bg-white py-5">
                        <div className="flex items-center gap-2.5 border-b border-[#E6E6E5] px-5 pb-4">
                            <img src={customer.profile_picture ? customer.profile_picture : avaDummy} alt="" className="h-10 rounded-full"></img>
                            <div className="flex flex-col gap-[0.2rem]">
                                <span className="text-[15px] font-semibold text-gray-800">
                                    {customer.firstname} {customer?.lastname}
                                </span>
                                <span className="text-[13px] text-gray-600">
                                    {customer.email}
                                </span>
                            </div>
                        </div>
                        {menuList.map((item, index) => (
                            <div
                                // className="group flex gap-4 px-7 cursor-pointer hover:bg-[#F0FAF7] py-3 border-l-[2px] border-white hover:border-[#41907A]"
                                className={`${selectedOption === index
                                    ? "border-[#00A67C] bg-[#F0FAF7] text-[#00A67C]"
                                    : "text-gray-600 border-white"
                                    } group flex cursor-pointer gap-4 border-l-[2px] px-7 py-3 hover:bg-[#F0FAF7]`}
                                key={index}
                                id={item.id}
                                onClick={() => handleMenuClick(index)}
                            >
                                <img src={item.icon} alt=""></img>
                                <span className="text-[15px] font-medium">{item.title}</span>
                            </div>
                        ))}
                        <div className="flex flex-col px-7">
                            <div onClick={() => navigate('/home')} className="cursor-pointer flex gap-4 border-t border-[#E6E6E5] pt-4">
                                <img src={toHomeIcon} alt=""></img>
                                <span className="text-[15px] font-medium text-gray-600">
                                    Back to Home
                                </span>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <img src={logoutIcon} alt=""></img>
                                <span className="text-[15px] font-medium text-gray-600">
                                    Log Out
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Right Col */}
                    <div className="flex flex-1 flex-col">
                        <AnimationWrapper selectedOption={selectedOption} index={0} >
                            <PersonalInformation />
                        </AnimationWrapper>
                        <AnimationWrapper selectedOption={selectedOption} index={1}>
                            <UserAddress />
                        </AnimationWrapper>
                        <AnimationWrapper selectedOption={selectedOption} index={2}>
                            <ResetPassword />
                        </AnimationWrapper>
                    </div>
                </div>
            </div>
        </section>
    );
};
