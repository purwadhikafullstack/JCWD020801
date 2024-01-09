import { useState } from "react";
import PropTypes from 'prop-types';

const deliveryMethod = [
    {
        name: 'JNE',
        method: [
            {
                service: 'OKE',
                description: 'Ongkos Kirim Ekonomis',
            },
            {
                service: 'REG',
                description: 'Layanan Reguler',
            },
            {
                service: 'YES',
                description: 'Yakin Esok Sampai',
            },
        ],
    },
    {
        name: 'TIKI',
        method: [
            {
                service: 'ECO',
                description: 'Economy Service',
            },
            {
                service: 'REG',
                description: 'Reguler Service',
            },
            {
                service: 'SDS',
                description: 'Same Day Service',
            },
        ],
    },
    {
        name: 'POS',
        method: [
            {
                service: 'Kurir Reguler',
            },
            {
                service: 'Pos Express',
            },
        ],
    },
];

export const AddressDelivery = ({ modalChangeAddressOpen, setModalChangeAddressOpen }) => {
    const [selectedMethod, setSelectedMethod] = useState('');
    const [selectedService, setSelectedService] = useState('');

    const handleMethodChange = (event) => {
        const selectedMethodName = event.target.value;
        setSelectedMethod(selectedMethodName);
        setSelectedService(''); // Reset selected service when the method changes
    };

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };


    return (
        <>
            {/* Delivery Address */}
            <section className="rounded-xl bg-[#FFFFFF] py-5 px-7 shadow-sm">
                <h3 className="text-[20px] font-bold border-b border-[#dcdcdc] text-[#28302A] pb-[0.6rem]">
                    Delivery Address
                </h3>
                <div className="flex flex-col gap-1 mt-[1rem] border-b border-[#dcdcdc] pb-[1.3rem]">
                    <div className="flex items-center gap-[0.6rem]">
                        <h4 className="text-[16.5px] text-[#474747] font-medium">
                            My Home
                        </h4>
                        <div className="flex items-center py-[0.1rem] bg-[#DBEFDC] w-max rounded-md px-[0.5rem] mt-[0.1rem]">
                            <span className="text-[13px] font-medium text-[#1e6a24] tracking-tight">
                                default
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#989d9e]">
                        <span className="font-medium text-[14px]">John Doe</span>
                        <span className=" font-medium text-[14px]">
                            (081288394087)
                        </span>
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
                            Jl. Taman Cibaduyut Indah No.3b, Cangkuang Wetan, Kec.
                            Dayeuhkolot, Kabupaten Bandung, Jawa Barat 40238,
                            Indonesia
                        </p>
                    </div>
                </div>
                <button
                    onClick={() =>
                        setModalChangeAddressOpen(!modalChangeAddressOpen)
                    }
                    className="mt-[0.8rem] px-4 rounded-full bg-[#00A67C] font-medium text-white py-[0.6rem] text-[14px] hover:bg-[#00916D] transition ease-in-out delay-100"
                >
                    Change Address
                </button>
            </section>
            {/* Delivery Cost */}
            <section className="rounded-xl bg-[#FFFFFF] py-5 px-7 shadow-sm">
                <h3 className="text-[20px] font-bold border-b border-[#dcdcdc] text-[#28302A] pb-[0.6rem]">
                    Delivery Method & Cost
                </h3>
                <div className="flex flex-col gap-2 mt-4 ">
                    {/* Dropdown for Delivery Method */}
                    <select
                        value={selectedMethod}
                        onChange={handleMethodChange}
                        className="outline-none text-gray-700 text-sm font-medium rounded-lg bg-[#FFFFFF] py-3 px-4 shadow-sm border border-gray-200 cursor-pointer "
                    >
                        <option disabled hidden value="" className="">Select Delivery Method</option>
                        {deliveryMethod.map((method, index) => (
                            <option key={index} value={method.name} className="text-gray-700">
                                {method.name}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown for Selected Services */}
                    {selectedMethod && (
                        <select
                            value={selectedService}
                            onChange={handleServiceChange}
                            className="cursor-pointer outline-none text-gray-700 text-sm font-medium rounded-lg bg-[#FFFFFF] py-3 px-4 shadow-sm border border-gray-200"
                        >
                            <option disabled hidden value="text-gray-600">Select Service</option>
                            {deliveryMethod.find(method => method.name === selectedMethod)?.method.map((service, index) => (
                                <option key={index} value={service.service} className="text-gray-700">
                                    {service.description || service.service}
                                </option>
                            ))}
                        </select>
                    )}
                </div>
                <div className="flex justify-between pt-[1rem]">
                    <h4 className="font-medium text-gray-700 pl-1">Delivery Cost</h4>
                    <h4 className="font-semibold">Rp 24.000</h4>
                </div>
            </section>
        </>
    )
}

AddressDelivery.propTypes = {
    modalChangeAddressOpen: PropTypes.bool.isRequired,
    setModalChangeAddressOpen: PropTypes.func.isRequired,
};