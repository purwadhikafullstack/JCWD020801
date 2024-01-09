import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react"
import googlePin from "../../../assets/userDashboard/google-pin-2.svg"
import { FiCheck } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowForward, IoMdArrowBack } from "react-icons/io";
import { SlArrowRight } from "react-icons/sl";

const dummy = [
    { isDefault: false, isDeliveryAddress: true, title: "Home", customerAddressName: "Toby", phoneNumber: "09833893", address: "Jl. Taman Cibaduyut Indah No.3b, Cangkuang Wetan, Kec. Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40238, Indonesia" },
    { isDefault: true, isDeliveryAddress: false, title: "My Apartment", customerAddressName: "Marry", phoneNumber: "0862839", address: "Apartemen City Park - Rendy Rooms Tower H18, Ruko Citypark, RT.7/RW.14, East Cengkareng, West Jakarta City, Jakarta, Indonesia" },
    // { isDefault: false, isDeliveryAddress: false, title: "My Apartment", customerAddressName: "Marry", phoneNumber: "0862839", address: "Apartemen City Park - Rendy Rooms Tower H18, Ruko Citypark, RT.7/RW.14, East Cengkareng, West Jakarta City, Jakarta, Indonesia" },
    // { isDefault: false, isDeliveryAddress: false, title: "My Apartment", customerAddressName: "Marry", phoneNumber: "0862839", address: "Apartemen City Park - Rendy Rooms Tower H18, Ruko Citypark, RT.7/RW.14, East Cengkareng, West Jakarta City, Jakarta, Indonesia" },
]

export const ModalChangeAddress = ({ modalChangeAddressOpen, setModalChangeAddressOpen }) => {


    return (
        <Dialog
            Dialog
            size="md"
            open={modalChangeAddressOpen}
            handler={() => setModalChangeAddressOpen}
        >
            <DialogHeader className="font-bold flex w-full h-max">
                <div className="flex items-center justify-between w-full border-b border-gray-300 pb-[0.7rem]">
                    <div></div>
                    <div className="flex text-[#28302A] text-[20px] md:text-[21px] gap-3 items-center">
                        {/* <img
                            src={googlePin}
                            alt=""
                            className="h-[1.2rem] w-[1.2rem] mb-[0.1rem]"
                        /> */}
                        <span>Choose Delivery Address</span>
                    </div>
                    <div
                        onClick={() => setModalChangeAddressOpen(false)}
                        className="cursor-pointer rounded-md hover:bg-gray-100 p-[0.1rem]"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#657385"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </div>
                </div>
            </DialogHeader>
            <DialogBody className="flex flex-col pt-0">
                {/*  */}
                <div className="flex flex-col gap-2">
                    {dummy.map((item, index) => (
                        <>
                            <div
                                key={index}
                                className={`${item.isDeliveryAddress
                                    ? 'border border-[#209978] bg-[#f8fdfd]'
                                    : 'border border-gray-300 bg-transparent hover:border-[#71e1c3]'
                                    } flex flex-col gap-1 p-4 shadow-sm rounded-xl cursor-pointer transition ease-in-out delay-100`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-col gap-[0.15rem]">
                                        <div className="flex items-center gap-[0.6rem]">
                                            <h4 className="text-[16.5px] text-[#474747] font-medium">
                                                {item.title}
                                            </h4>
                                            {item.isDefault && (
                                                <div className="flex items-center py-[0.1rem] bg-[#DBEFDC] w-max rounded-md px-[0.5rem] mt-[0.1rem]">
                                                    <span className="text-[13px] font-medium text-[#1e6a24] tracking-tight">
                                                        default
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-1 text-[#989d9e] text-[15px] ">
                                            <span className="font-medium">
                                                {item.customerAddressName}
                                            </span>
                                            <span className=" font-medium text-[14px]">
                                                ({item.phoneNumber})
                                            </span>
                                        </div>
                                    </div>
                                    {item.isDeliveryAddress && (
                                        <FiCheck
                                            size={28}
                                            className="text-[#209978] mr-[0.3rem]"
                                        />
                                    )}
                                </div>
                                <div className="flex gap-1 rounded-xl bg-[#f5f6f6] p-3 mt-[0.3rem]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="21"
                                        height="21"
                                        viewBox="0 0 15 15"
                                    >
                                        <g
                                            fill="none"
                                            fillRule="evenodd"
                                            stroke="#696969"
                                            strokeLinecap="square"
                                            clipRule="evenodd"
                                        >
                                            <path d="M7.5 8.495a2 2 0 0 0 2-1.999a2 2 0 0 0-4 0a2 2 0 0 0 2 1.999Z" />
                                            <path d="M13.5 6.496c0 4.997-5 7.995-6 7.995s-6-2.998-6-7.995A5.999 5.999 0 0 1 7.5.5c3.313 0 6 2.685 6 5.996Z" />
                                        </g>
                                    </svg>
                                    <p className="text-[14px] font-medium text-[#696969] px-1">
                                        {item.address}
                                    </p>
                                </div>
                                {!item.isDeliveryAddress && (
                                    <button
                                        // onClick={() => setModalChangeAddressOpen(!modalChangeAddressOpen)}
                                        className="w-max mt-[0.35rem] px-4 py-[0.4rem] font-normal rounded-full bg-[#00A67C] text-white text-[14px] hover:bg-[#00916D] transition ease-in-out delay-100"
                                    >
                                        Select
                                    </button>
                                )}
                            </div>
                        </>
                    ))}
                </div>

                <div
                    // onClick={() => navigate('/store-management')}
                    id="underline-wrapper"
                    className="text-gray-500 w-max flex self-end w-full mt-[0.7rem] items-center gap-1 cursor-pointer hover:text-gray-700 relative"
                >
                    <span className="font-medium text-[15px] relative">
                        Go to your Address List
                        <span
                            id="underline"
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700 transition-all origin-left transform scale-x-0"
                        ></span>
                    </span>
                    <IoIosArrowForward size={15} className="mt-[0.8px]" />
                </div>
                <button
                    // onClick={() => setModalChangeAddressOpen(!modalChangeAddressOpen)}
                    className="flex items-center justify-center gap-2 w-full mt-[0.5rem] px-4 py-[0.5rem] font-medium rounded-full bg-[#00A67C] text-white text-[15px] hover:bg-[#00916D] transition ease-in-out delay-100"
                >
                    <span>Add New</span>
                    <FaPlus size={14} />
                </button>
                {/*  */}
            </DialogBody>
        </Dialog>
    );
}