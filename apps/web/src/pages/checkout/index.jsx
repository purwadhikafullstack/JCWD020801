import { FaArrowRight } from 'react-icons/fa6';
import { AddressDelivery } from './component/addressDelivery';
import { OrderSummary } from './component/orderSummary';
import appLogo from '../../assets/logo-app-1.png';
import { IoMdArrowBack } from 'react-icons/io';

export const CheckoutPage = () => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="bg-white flex justify-between items-center px-[18px] lg:px-[160px] py-3 border-b border-[#E4E4E4]">
        <img src={appLogo} alt="" className="h-[28px] lg:h-[35px] "></img>
      </div>
      <div className="bg-[#F8F8FA]">
        <section className="mx-[16px] md:mx-[32px] lg:mx-[160px] py-3.5">
          <div className="flex flex-col pb-3 gap-1">
            <div
              // onClick={() => navigate('/store-management')}
              id="underline-wrapper"
              className="text-gray-600 flex items-center gap-2 w-max cursor-pointer hover:text-gray-700 relative"
            >
              <IoMdArrowBack className="h-[1rem] w-[1rem]" />
              <span className="font-medium text-[14px] relative">
                Go back
                <span
                  id="underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-700 transition-all origin-left transform scale-x-0"
                ></span>
              </span>
            </div>
            <div className="flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#00a67c"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M11.5 21H8.574a3 3 0 0 1-2.965-2.544l-1.255-8.152A2 2 0 0 1 6.331 8H17.67a2 2 0 0 1 1.977 2.304l-.5 3.248" />
                  <path d="M9 11V6a3 3 0 0 1 6 0v5m0 8l2 2l4-4" />
                </g>
              </svg>
              <h2 className="text-[25px] font-bold text-[#00A67C]">Checkout</h2>
            </div>
          </div>
          <div className="flex gap-6 w-full">
            {/* -- Left -- */}
            <section className="flex flex-col gap-3 w-[47vw]">
              {/* Order Summary */}
              <OrderSummary />
              {/* Address & Delivery */}
              <AddressDelivery />
              {/* Payment Method */}
              <section className="rounded-xl bg-[#FFFFFF] py-5 px-7 shadow-sm">
                <h3 className="text-[20px] font-bold border-b border-[#dcdcdc] text-[#28302A] pb-[0.6rem]">
                  Payment Method
                </h3>
                <div className="mt-2">
                  <fieldset className="space-y-3">
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
                        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-100 bg-white p-4 font-medium shadow-sm hover:border-gray-200  peer-checked:ring-1 peer-checked:ring-[#00A67C]"
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

                          <p className="text-gray-700 text-[14px]">Midtrans</p>
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
                        className="flex cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white p-4 font-medium shadow-sm hover:border-gray-300 peer-checked:ring-1 peer-checked:ring-[#00A67C]"
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
                          <p className="text-gray-700 text-[14px]">
                            Manual Payment
                          </p>
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
                      <h4 className="font-semibold tracking-tight text-gray-900">
                        Rp 230.000
                      </h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-600">Discount</h4>
                      <h4 className="font-semibold tracking-tight text-gray-900">
                        Rp 30.000
                      </h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-600">Delivery</h4>
                      <h4 className="font-semibold tracking-tight text-gray-900">
                        Rp 24.000
                      </h4>
                    </div>
                  </div>
                  <div className="border-t border-[#dcdcdc] flex items-center justify-between pt-[1rem]">
                    <h4 className="font-semibold text-[18px]">Total</h4>
                    <h4 className="font-bold text-[18px]">Rp 224.000</h4>
                  </div>
                  <button className="flex items-center justify-center gap-2 mt-[1.2rem] px-4 rounded-lg w-full bg-[#00A67C] font-semibold text-white py-[0.6rem] text-[15px] hover:bg-[#00916D] transition ease-in-out delay-100">
                    <span>Pay Now</span>
                    {/* <img src={arrowLong} alt="" className="mt-[0.1rem]" /> */}
                    <FaArrowRight className="mt-[0.1rem]" />
                  </button>
                </section>
                <p className="text-[14px] mt-[0.6rem] text-gray-500 font-medium tracking-tight text-justify px-2">
                  By completing your purchase, you are agreeing to our
                  application&apos;s Terms and Conditions.
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
};
