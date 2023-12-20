import { useState } from "react";
import eyeIcon from "../../../assets/userDashboard/eye.svg"
import eyeOffIcon from "../../../assets/userDashboard/eye-off.svg"

export const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <div className="flex h-max flex-1 flex-col gap-[1.6rem] rounded-2xl border border-[#E6E6E5] bg-white px-[2.6rem] py-[2rem]">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="mb-2 text-[26px] font-bold">Reset Password</h3>
                        <p className="text-[15px] text-gray-500 ">
                            You need to enter your current password before resetting
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-[1.2rem]">
                    <div className="w-[20rem]">
                        <label className="mb-2 block text-sm font-medium text-gray-900 ">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 sm:text-sm focus:outline-[#4ECCA3]"
                                placeholder="your password"
                                id=""
                                type={showPassword ? 'text' : 'password'}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none"
                            >
                                {showPassword ? (
                                    <img src={eyeIcon} className="h-5" />
                                ) : (
                                    <img src={eyeOffIcon} className="h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button className="w-max rounded-full bg-[#00a67c] px-4 py-2.5 text-[15px] font-semibold text-white transition delay-100 ease-in-out hover:bg-[#00916D]">
                        Confirm
                    </button>
                </div>
            </div>
        </>
    );
};
