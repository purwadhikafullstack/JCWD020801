import { FaLongArrowAltRight } from "react-icons/fa";
import { FaStoreAlt } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { VscGraphLine } from "react-icons/vsc";
import { MdOutlineDiscount } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { FaPlateWheat } from "react-icons/fa6";

export default function Overview() {
    return(
        <>
        <div className="flex flex-col md:ml-60 md:mr-40 p-1 md:p-9">
            <p className="font-bold text-lg">Overview</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-9 items-center text-center text-white">
                <button>
                <div className="p-5 bg-[#41907a] rounded-lg">
                    <div className="flex justify-start p-3">
                        <p className="text-2xl">5 branches</p>
                    </div>
                    <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between items-center">
                        <FaStoreAlt style={{ fontSize: '34px' }}/>
                        <div className="flex flex-row gap-3 items-center">
                            <p>Manage branch</p>
                            <FaLongArrowAltRight />
                        </div>
                    </div>
                </div>
                </button>
                <div className="p-5 bg-[#41907a] rounded-lg">
                    <div className="flex justify-start p-3">
                        <p className="text-2xl">127 customers</p>
                    </div>
                    <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                        <GoPeople style={{ fontSize: '34px' }}/>
                        <div className="flex flex-row gap-3 items-center">
                            <p>See more</p>
                            <FaLongArrowAltRight />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#41907a] rounded-lg">
                    <div className="flex justify-start p-3">
                        <p className="text-2xl">47 products</p>
                    </div>
                    <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                        <FaPlateWheat style={{ fontSize: '34px' }}/>
                        <div className="flex flex-row gap-3 items-center">
                            <p>Manage Product</p>
                            <FaLongArrowAltRight />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#41907a] rounded-lg">
                    <div className="flex justify-start p-3">
                        <p className="text-xl">Rp.2.200.000 Collected</p>
                    </div>
                    <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                        <VscGraphLine style={{ fontSize: '34px' }}/>
                        <div className="flex flex-row gap-3 items-center">
                            <p>See reports</p>
                            <FaLongArrowAltRight />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#41907a] rounded-lg">
                    <div className="flex justify-start p-3">
                        <p className="text-2xl">6 promos available</p>
                    </div>
                    <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                        <MdOutlineDiscount style={{ fontSize: '34px' }}/>
                        <div className="flex flex-row gap-3 items-center">
                            <p>Manage promo</p>
                            <FaLongArrowAltRight />
                        </div>
                    </div>
                </div>
                <div className="p-5 bg-[#41907a] rounded-lg">
                    <div className="flex justify-start p-3">
                        <p className="text-2xl">Recent orders</p>
                    </div>
                    <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                        <TbFileInvoice style={{ fontSize: '34px' }}/>
                        <div className="flex flex-row gap-3 items-center">
                            <p>Manage recent orders</p>
                            <FaLongArrowAltRight />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}