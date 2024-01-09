import { Input } from "@material-tailwind/react"
import { Navbar } from "../navbar"
import { BsSearch } from "react-icons/bs"

const dummy = [
    { name: "Toko Asia Afrika", distance: "4.1 km", address: "Regus - Bandung, Wisma Monex, Jalan Asia Afrika, Kebon Pisang, Bandung City, West Java, Indonesia", phone: "022555444" },
    { name: "Toko Asia Afrika", distance: "4.1 km", address: "Regus - Bandung, Wisma Monex, Jalan Asia Afrika, Kebon Pisang, Bandung City, West Java, Indonesia", phone: "022555444" },
    { name: "Toko Asia Afrika", distance: "4.1 km", address: "Regus - Bandung, Wisma Monex, Jalan Asia Afrika, Kebon Pisang, Bandung City, West Java, Indonesia", phone: "022555444" },
    { name: "Toko Asia Afrika", distance: "4.1 km", address: "Regus - Bandung, Wisma Monex, Jalan Asia Afrika, Kebon Pisang, Bandung City, West Java, Indonesia", phone: "022555444" },
    { name: "Toko Asia Afrika", distance: "4.1 km", address: "Regus - Bandung, Wisma Monex, Jalan Asia Afrika, Kebon Pisang, Bandung City, West Java, Indonesia", phone: "022555444" },
    { name: "Toko Asia Afrika", distance: "4.1 km", address: "Regus - Bandung, Wisma Monex, Jalan Asia Afrika, Kebon Pisang, Bandung City, West Java, Indonesia", phone: "022555444" },
]

export const StoreLocator = () => {


    return (
        <>
            <Navbar />
            <section className="mx-[16px] md:mx-[32px] lg:mx-[160px]">
                <div className="flex ">
                    <section className="flex flex-col w-[35vw] mt-4 overflow-auto h-[100vh]">
                        <div className="px-5">
                            <Input label="Find a store" variant="standard" icon={<BsSearch className="fas fa-heart" />} />
                        </div>
                        <div className="flex flex-col gap-2">
                            {/*  */}
                            {dummy.map((item, index) => (
                                <>
                                    <div className="flex flex-col hover:bg-[#E5E5E5] px-5 py-5 cursor-pointer rounded-lg bg-[#F6F7F8]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[#212121] font-semibold">{item.name}</span>
                                            <span className="text-[14px] text-gray-600 font-medium">{item.distance} away</span>
                                        </div>
                                        <span className="text-[15px] line-clamp-2 mt-[0.4rem] font-normal text-[#757575]">{item.address}</span>
                                        <span className="text-[14px] mt-[0.1rem] font-normal text-[#757575]">{item.phone}</span>
                                        <button className="rounded-full px-3.5 py-1.5 w-max text-[13px] font-normal text-[#00A67C] transition delay-100 ease-in-out border border-[#00A67C] hover:bg-[#00A67C] hover:text-white mt-[0.8rem]">
                                            View on Map
                                        </button>
                                    </div>
                                </>
                            ))}

                            {/*  */}
                        </div>
                    </section>
                    <section className="w-[65vw]">

                    </section>
                </div>
            </section>
        </>
    )
}