import { useState } from 'react';
import { ModalChangeAddress } from './component/modalChangeAddress';
import { FaArrowRight } from 'react-icons/fa6';
import { AddressDelivery } from './component/addressDelivery';
import { OrderSummary } from './component/orderSummary';

export const CheckoutPage = () => {
    const [modalChangeAddressOpen, setModalChangeAddressOpen] = useState(false);

    return (
        <>
            {/* <Navbar /> */}
            <div className="bg-[#F8F8FA]">
                <section className="mx-[16px] md:mx-[32px] lg:mx-[160px] py-3">
                    <div className="flex gap-6 w-full">
                        {/* -- Left -- */}
                        <section className="flex flex-col gap-3 w-[47vw]">
                            {/* Order Summary */}
                            <OrderSummary />
                            {/* Address & Delivery */}
                            <AddressDelivery modalChangeAddressOpen={modalChangeAddressOpen} setModalChangeAddressOpen={setModalChangeAddressOpen} />
                            {/* Payment Method */}
                            <section className="rounded-xl bg-[#FFFFFF] py-5 px-7 shadow-sm">
                                <h3 className="text-[20px] font-bold border-b border-[#dcdcdc] text-[#28302A] pb-[0.6rem]">
                                    Payment Method
                                </h3>
                                <div className="mt-2">
                                    <fieldset className="space-y-4">
                                        <legend className="sr-only">Delivery</legend>

                                        <div>
                                            <input
                                                type="radio"
                                                name="DeliveryOption"
                                                value="DeliveryStandard"
                                                id="DeliveryStandard"
                                                className="peer hidden [&:checked_+_label_svg]:block"
                                                checked
                                            />

                                            <label
                                                htmlFor="DeliveryStandard"
                                                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200  peer-checked:ring-1 peer-checked:ring-[#00A67C]"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        className="hidden h-5 w-5 text-[#00A67C]"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>

                                                    <p className="text-gray-700">Midtrans</p>
                                                </div>
                                            </label>
                                        </div>

                                        <div>
                                            <input
                                                type="radio"
                                                name="DeliveryOption"
                                                value="DeliveryPriority"
                                                id="DeliveryPriority"
                                                className="peer hidden [&:checked_+_label_svg]:block"
                                            />

                                            <label
                                                htmlFor="DeliveryPriority"
                                                className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-300 peer-checked:ring-1 peer-checked:ring-[#00A67C]"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <svg
                                                        className="hidden h-5 w-5 text-[#00A67C]"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    <p className="text-gray-700">Manual Payment</p>
                                                </div>
                                            </label>
                                        </div>
                                    </fieldset>
                                </div>
                            </section>
                        </section>
                        {/* -- Right -- */}
                        <section className="flex-1 ">
                            <div className="">
                                <section className="rounded-xl bg-[#FFFFFF] py-5 px-6 shadow-sm h-max">
                                    <h3 className="text-[20px] font-semibold border-b border-gray-300 text-[#28302A] pb-[0.6rem]">
                                        Payment Details
                                    </h3>
                                    <div className="flex flex-col gap-2 mb-[1rem] mt-[1.4rem]">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-600">Subtotal</h4>
                                            <h4 className="font-semibold tracking-tight text-gray-900">Rp 230.000</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-600">Discount</h4>
                                            <h4 className="font-semibold tracking-tight text-gray-900">Rp 30.000</h4>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-gray-600">Delivery</h4>
                                            <h4 className="font-semibold tracking-tight text-gray-900">Rp 24.000</h4>
                                        </div>
                                    </div>
                                    <div className="border-t border-[#dcdcdc] flex items-center justify-between pt-[1rem]">
                                        <h4 className="font-semibold text-[18px]">Total</h4>
                                        <h4 className="font-bold text-[18px]">Rp 224.000</h4>
                                    </div>
                                    <button className="flex items-center justify-center gap-2 mt-[1.2rem] px-4 rounded-lg w-full bg-[#00A67C] font-semibold text-white py-[0.6rem] text-[15px] hover:bg-[#00916D] transition ease-in-out delay-100"
                                    >
                                        <span>Pay Now</span>
                                        {/* <img src={arrowLong} alt="" className="mt-[0.1rem]" /> */}
                                        <FaArrowRight className="mt-[0.1rem]" />
                                    </button>
                                </section>
                                <p className="text-[14px] mt-[0.6rem] text-gray-500 font-medium tracking-tight text-justify px-2">By completing your purchase, you are agreeing to our application&apos;s Terms and Conditions.</p>

                            </div>

                        </section>

                    </div>
                </section>
            </div>
            {/* ----- Modal ----- */}
            <ModalChangeAddress
                modalChangeAddressOpen={modalChangeAddressOpen}
                setModalChangeAddressOpen={setModalChangeAddressOpen}
            />
        </>
    );
};
