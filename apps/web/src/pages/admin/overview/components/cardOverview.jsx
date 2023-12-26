import { FaLongArrowAltRight } from "react-icons/fa";
import { FaStoreAlt } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { VscGraphLine } from "react-icons/vsc";
import { MdOutlineDiscount } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { FaPlateWheat } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CardOverview({ totalAdmin }) {
    return (
        <>
            <div className="p-5 bg-[#41907a] rounded-lg shadow-xl">
                <div className="flex justify-start p-3">
                    <p className="text-2xl">5 branches</p>
                </div>
                <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between items-center">
                    <FaStoreAlt style={{ fontSize: '34px' }} />
                    <div className="flex flex-row gap-3 items-center">
                        <p>Manage branch</p>
                        <FaLongArrowAltRight />
                    </div>
                </div>
            </div>
            <Link to={'/admin-management'}>
                <div className="p-5 bg-[#41907a] rounded-lg shadow-xl">
                    <div className="flex justify-start p-3">
                        <p className="text-2xl">{totalAdmin} admins</p>
                    </div>

                    <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                        <GoPeople style={{ fontSize: '34px' }} />
                        <div className="flex flex-row gap-3 items-center">
                            <p>Manage admin</p>
                            <FaLongArrowAltRight />
                        </div>
                    </div>
                </div>
            </Link>
            <Link to={'/customer-management'}>
            <div className="p-5 bg-[#41907a] rounded-lg shadow-xl">
                <div className="flex justify-start p-3">
                    <p className="text-2xl">127 customers</p>
                </div>
                <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                    <GoPeople style={{ fontSize: '34px' }} />
                    <div className="flex flex-row gap-3 items-center">
                        <p>See more</p>
                        <FaLongArrowAltRight />
                    </div>
                </div>
            </div>
            </Link>
            <div className="p-5 bg-[#41907a] rounded-lg shadow-xl">
                <div className="flex justify-start p-3">
                    <p className="text-2xl">47 products</p>
                </div>
                <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                    <FaPlateWheat style={{ fontSize: '34px' }} />
                    <div className="flex flex-row gap-3 items-center">
                        <p>Manage Product</p>
                        <FaLongArrowAltRight />
                    </div>
                </div>
            </div>
            <div className="p-5 bg-[#41907a] rounded-lg shadow-xl">
                <div className="flex justify-start p-3">
                    <p className="text-xl">Rp.2.200.000 Collected</p>
                </div>
                <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                    <VscGraphLine style={{ fontSize: '34px' }} />
                    <div className="flex flex-row gap-3 items-center">
                        <p>See reports</p>
                        <FaLongArrowAltRight />
                    </div>
                </div>
            </div>
            <div className="p-5 bg-[#41907a] rounded-lg shadow-xl">
                <div className="flex justify-start p-3">
                    <p className="text-2xl">6 promos available</p>
                </div>
                <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                    <MdOutlineDiscount style={{ fontSize: '34px' }} />
                    <div className="flex flex-row gap-3 items-center">
                        <p>Manage promo</p>
                        <FaLongArrowAltRight />
                    </div>
                </div>
            </div>
            <div className="p-5 bg-[#41907a] rounded-lg shadow-xl">
                <div className="flex justify-start p-3">
                    <p className="text-2xl">Recent orders</p>
                </div>
                <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                    <TbFileInvoice style={{ fontSize: '34px' }} />
                    <div className="flex flex-row gap-3 items-center">
                        <p>Manage recent orders</p>
                        <FaLongArrowAltRight />
                    </div>
                </div>
            </div>
        </>
    )
}