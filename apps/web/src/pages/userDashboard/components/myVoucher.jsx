import lemonLogo from '../../../assets/lemon-logo.svg'

export const MyVoucher = () => {
    return (
        <>
            <div className="h-screen">
                <section className="flex h-max flex-1 flex-col gap-[1.6rem] rounded-2xl border border-[#E6E6E5] bg-white px-[22px] px-[22px] md:px-[32px] lg:px-[2.6rem] py-[2rem]">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h3 className="mb-2 text-[26px] font-bold">My Voucher</h3>
                            <p className="text-[15px] text-gray-600 ">
                                Available coupon and voucher
                            </p>
                        </div>
                    </div>
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-[0.75rem] md:gap-[2rem]">
                        <card className="col-span-1 flex flex-col rounded-lg bg-gradient-to-r from-[#049F75] via-[#24C194] to-[#43E5B4] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                            <div className="relative flex justify-between py-4 px-[1.6rem] items-center rounded-t-lg">
                                <div className="flex flex-col  text-white">
                                    <span className="text-[23px] font-semibold tracking-tight whitespace-pre">Rp 200.000  Off</span>
                                    <span className="text-[15px] font-thin text-[#e2f9f2]">
                                        28SA3
                                    </span>
                                </div>
                                <circle className="absolute h-5 w-5 rounded-full bg-white -left-[0.7rem] -bottom-[0.7rem] border-r border-[#E3E4E5]"></circle>
                                <circle className="absolute h-5 w-5 rounded-full bg-white -right-[0.7rem] -bottom-[0.7rem] border-l border-[#E3E4E5]"></circle>
                                <div className="absolute right-[1.2rem] opacity-[0.65]">
                                    <img
                                        src={lemonLogo}
                                        alt=""
                                        className="h-[3.5rem] w-[3.5rem]"
                                    />
                                </div>
                            </div>
                            <div className="flex py-2.5 px-[1.6rem] justify-start items-center rounded-b-lg text-[14px] text-[#e2f9f2] gap-2 border-t-[1px] border-dashed border-[#e2f9f2]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    className="mb-[1px]"
                                >
                                    <g fill="none">
                                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path
                                            fill="currentColor"
                                            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"
                                        />
                                    </g>
                                </svg>
                                <div className="flex">
                                    <span>12 Jan 2024</span>
                                    <span className="mx-1">-</span>
                                    <span>12 Jan 2024</span>
                                </div>
                            </div>
                        </card>
                        {/*  */}
                        <card className="col-span-1 flex flex-col rounded-lg bg-gradient-to-r from-[#4427D9] via-[#6E56EB] to-[#9682FF] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                            <div className="relative flex justify-between py-4 px-[1.6rem] items-center rounded-t-lg">
                                <div className="flex flex-col  text-white">
                                    <span className="text-[23px] font-semibold whitespace-pre">12%  Off</span>
                                    <span className="text-[15px] font-thin text-[#e2f9f2]">
                                        0B7U4
                                    </span>
                                </div>
                                <circle className="absolute h-5 w-5 rounded-full bg-white -left-[0.7rem] -bottom-[0.7rem] border-r border-[#E3E4E5]"></circle>
                                <circle className="absolute h-5 w-5 rounded-full bg-white -right-[0.7rem] -bottom-[0.7rem] border-l border-[#E3E4E5]"></circle>
                                <div className="absolute right-[1.2rem] opacity-[0.65]">
                                    <img
                                        src={lemonLogo}
                                        alt=""
                                        className="h-[3.5rem] w-[3.5rem]"
                                    />
                                </div>
                            </div>
                            <div className="flex py-2.5 px-[1.6rem] justify-start items-center rounded-b-lg text-[14px] text-[#e2f9f2] gap-2 border-t-[1px] border-dashed border-[#e2f9f2]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    className="mb-[1px]"
                                >
                                    <g fill="none">
                                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path
                                            fill="currentColor"
                                            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"
                                        />
                                    </g>
                                </svg>
                                <div className="flex">
                                    <span>12 Jan 2024</span>
                                    <span className="mx-1">-</span>
                                    <span>12 Jan 2024</span>
                                </div>
                            </div>
                        </card>
                        {/*  */}
                        <card className="col-span-1 flex flex-col rounded-lg bg-gradient-to-r from-[#D87428] via-[#E9954C] to-[#FBB770] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
                            <div className="relative flex justify-between py-4 px-[1.6rem] items-center rounded-t-lg">
                                <div className="flex flex-col  text-white">
                                    <span className="text-[23px] font-semibold whitespace-pre">20%  Off</span>
                                    <span className="text-[15px] font-thin text-[#e2f9f2]">
                                        C8BR7
                                    </span>
                                </div>
                                <circle className="absolute h-5 w-5 rounded-full bg-white -left-[0.7rem] -bottom-[0.7rem] border-r border-[#E3E4E5]"></circle>
                                <circle className="absolute h-5 w-5 rounded-full bg-white -right-[0.7rem] -bottom-[0.7rem] border-l border-[#E3E4E5]"></circle>
                                <div className="absolute right-[1.2rem] opacity-[0.65]">
                                    <img
                                        src={lemonLogo}
                                        alt=""
                                        className="h-[3.5rem] w-[3.5rem]"
                                    />
                                </div>
                            </div>
                            <div className="flex py-2.5 px-[1.6rem] justify-start items-center rounded-b-lg text-[14px] text-[#e2f9f2] gap-2 border-t-[1px] border-dashed border-[#e2f9f2]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    className="mb-[1px]"
                                >
                                    <g fill="none">
                                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                                        <path
                                            fill="currentColor"
                                            d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2m0 4a1 1 0 0 0-1 1v5a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V7a1 1 0 0 0-1-1"
                                        />
                                    </g>
                                </svg>
                                <div className="flex">
                                    <span>12 Jan 2024</span>
                                    <span className="mx-1">-</span>
                                    <span>12 Jan 2024</span>
                                </div>
                            </div>
                        </card>
                        {/*  */}
                    </section>
                </section>
            </div>
        </>
    );
}