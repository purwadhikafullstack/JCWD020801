import { useEffect, useState } from "react";
import { ModalUserCreateAddress } from "./modalUserCreateAddress";
import axios from "axios";
import { AddressDataMap } from "./AddressDataMap";

export const UserAddress = () => {
    const token = localStorage.getItem('token');

    const [userAddressData, setUserAddressData] = useState([])
    const [modalAddOpen, setModalAddOpen] = useState(false)
    const handleModalAddOpen = () => setModalAddOpen(!modalAddOpen);

    const fetchUserAddressData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/customer-address/list', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data.result)
            setUserAddressData(response.data.result)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUserAddressData();
    }, [])

    return (
        <>
            <div className="flex flex-1 flex-col gap-[1.8rem] lg:gap-[3rem] rounded-2xl border border-[#E6E6E5] bg-white px-[22px] md:px-[32px] lg:px-[2.6rem] py-[2rem]">
                <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-end md:items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="mb-2 text-[26px] font-bold">Your Address</h3>
                        <p className="text-[15px] text-gray-500 ">
                            Edit, Delete and Add a new Address for your account
                        </p>
                    </div>
                    {/* Button */}
                    <button onClick={handleModalAddOpen} className="button_wrap rounded-full" type="button">
                        <span className="button__text">Add New</span>
                        <span className="button__icon">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.07692 12.9231C8.07692 13.5188 7.59567 14 7 14C6.40433 14 5.92308 13.5188 5.92308 12.9231V8.07692H1.07692C0.48125 8.07692 0 7.59567 0 7C0 6.40433 0.48125 5.92308 1.07692 5.92308H5.92308V1.07692C5.92308 0.481249 6.40433 -7.15256e-07 7 -7.15256e-07C7.59567 -7.15256e-07 8.07692 0.481249 8.07692 1.07692V5.92308H12.9231C13.5188 5.92308 14 6.40433 14 7C14 7.59567 13.5188 8.07692 12.9231 8.07692H8.07692V12.9231Z"
                                    fill="#F8F8F8"
                                />
                            </svg>
                        </span>
                    </button>
                </div>
                {/* Address list */}
                <div className="flex flex-col gap-5">
                    {userAddressData?.map((item) => (
                        <AddressDataMap item={item} key={item.id} fetchUserAddressData={fetchUserAddressData} />
                    ))}

                </div>
            </div>
            {/* Modal */}
            <ModalUserCreateAddress modalAddOpen={modalAddOpen} handleModalAddOpen={handleModalAddOpen} fetchUserAddressData={fetchUserAddressData} />
        </>
    );
};
