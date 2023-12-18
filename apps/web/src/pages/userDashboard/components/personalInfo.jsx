import { useSelector } from 'react-redux';
import avaDummy from '../../../assets/userDashboard/ava-dummy.png';
import { toast } from 'react-toastify';

export const PersonalInformation = () => {
    const customer = useSelector((state) => state.customer.value)

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Referral code copied!', {
            position: "top-center",
        })
    };

    return (
        <>
            <div className="flex h-max flex-1 flex-col gap-6 rounded-2xl border border-[#E6E6E5] bg-white px-[2.6rem] py-[2rem]">
                <div className="mb-2 flex flex-col">
                    <h3 className="mb-2 text-[26px] font-bold">
                        Welcome to Your Account,
                        <span className="text-[#00A67C]"> {customer.firstname}!</span>
                    </h3>
                    <p className="text-[15px] text-gray-500">
                        Update your personal details
                    </p>
                </div>
                {/* Edit Image */}
                <div className="flex w-full justify-between border-b border-gray-300 pb-5">
                    <div className="flex items-center gap-4">
                        <img src={avaDummy} alt="" className="h-[5rem] rounded-full"></img>
                        <div className="flex flex-col gap-[0.2rem]">
                            <span className="text-[16px] font-semibold text-gray-800">
                                Edit Your <br></br> Profile Picture
                            </span>
                            <span className="cursor-pointer text-[15px] text-gray-600 underline decoration-1">
                                Choose a file
                            </span>
                        </div>
                    </div>
                    {/* Referral code */}
                    <div
                        className="flex flex-col items-center rounded-lg border-[2px] border-dashed border-[#00A67C] bg-[#F0FAF7] px-5 py-2 cursor-pointer hover:scale-105 transition delay-100 ease-in-out hover:bg-[#ddf4ed]"
                        onClick={() => copyToClipboard(customer.referral_code)}
                    >
                        <span className="text-[15px] font-medium text-green-500">
                            Your referral code
                        </span>
                        <span className="text-[18px] font-bold text-[#00916D]">
                            {customer.referral_code}
                        </span>
                        <span className="text-[14px] text-green-500">tap to copy</span>
                    </div>
                </div>
                {/* Form */}
                <form>
                    <div className="flex flex-1 flex-col gap-[1.8rem]">
                        {/* Firstname & Lastname */}
                        <div className="flex w-full justify-between gap-[4rem]">
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    First name
                                </label>
                                <input
                                    className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                    placeholder={customer.firstname}
                                    id=""
                                    type="text"
                                />
                            </div>
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Last name
                                </label>
                                <input
                                    className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                    placeholder={customer.lastname}
                                    id=""
                                    type="text"
                                />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="flex w-full justify-between gap-[4rem]">
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Email
                                </label>
                                <input
                                    className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                    placeholder={customer.email}
                                    id=""
                                    type="text"
                                />
                            </div>
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Date of Birth
                                </label>
                                <input
                                    className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                    placeholder="Jordan"
                                    id=""
                                    type="date"
                                />
                            </div>
                        </div>
                    </div>
                </form>
                {/* Button Group */}
                <div className="mt-4 flex justify-end gap-3">
                    <button className="shadow-sm rounded-full px-5 py-2 border border-[#E5E7EB] text-[15px] font-medium text-gray-600 transition delay-100 ease-in-out hover:bg-gray-100">
                        Cancel
                    </button>
                    <button className="rounded-full bg-[#00a67c] px-4 py-2.5 text-[15px] font-semibold text-white transition delay-100 ease-in-out hover:bg-[#00916D] ">
                        Save changes
                    </button>
                </div>
            </div>
        </>
    );
};
