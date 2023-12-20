const addressList = [
    { title: "Apartment", name: "Zoey", phoneNum: "022547932", address: "Apartemen Madison Garden, Dago Giri, Kota Bandung", postCode: "450092" },
    { title: "Work", name: "Jordan", phoneNum: "022897491", address: "H Headquarters, Jl Asia Afrika, Kota Bandung", postCode: "37913" },
];

export const UserAddress = () => {
    return (
        <>
            <div className="flex h-max flex-1 flex-col gap-[3rem] rounded-2xl border border-[#E6E6E5] bg-white px-[2.6rem] py-[2rem]">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="mb-2 text-[26px] font-bold">Your Address</h3>
                        <p className="text-[15px] text-gray-500 ">
                            Edit, Delete and Add a new Address for your account
                        </p>
                    </div>
                    {/* Button */}
                    <button className="button_wrap rounded-full" type="button">
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
                    {/* Default */}
                    <div className="flex flex-col gap-3 rounded-xl border px-6 py-4 border-[#209978] bg-[#fcfefe] shadow-sm">
                        <div className="flex gap-2.5 items-center border-b pb-2.5">
                            <h4 className="text-[18px] font-semibold text-[#00916D]">
                                My Home
                            </h4>
                            <div className="rounded-lg bg-[#e1f5ef] px-4 py-1.5 text-[14px] font-semibold text-[#3A826E]">Default</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="flex items-center rounded-lg bg-[#f1f2f4] px-3.5">
                                <svg
                                    width="18"
                                    height="17"
                                    viewBox="0 0 18 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8.81897 8.53448C7.97498 8.53448 7.14996 8.28422 6.44821 7.81532C5.74647 7.34643 5.19953 6.67998 4.87655 5.90024C4.55357 5.12051 4.46906 4.26251 4.63372 3.43475C4.79837 2.60698 5.20479 1.84663 5.80157 1.24985C6.39835 0.653063 7.1587 0.246648 7.98647 0.0819958C8.81423 -0.0826567 9.67223 0.00184894 10.452 0.324826C11.2317 0.647804 11.8982 1.19475 12.367 1.89649C12.8359 2.59824 13.0862 3.42326 13.0862 4.26724C13.0862 5.39899 12.6366 6.48438 11.8364 7.28464C11.0361 8.0849 9.95071 8.53448 8.81897 8.53448ZM8.81897 1.7069C8.31258 1.7069 7.81756 1.85706 7.39651 2.13839C6.97547 2.41973 6.6473 2.8196 6.45352 3.28744C6.25973 3.75528 6.20903 4.27008 6.30782 4.76674C6.40661 5.2634 6.65046 5.71961 7.00853 6.07768C7.3666 6.43575 7.82281 6.6796 8.31947 6.77839C8.81612 6.87718 9.33092 6.82648 9.79877 6.63269C10.2666 6.43891 10.6665 6.11074 10.9478 5.68969C11.2291 5.26865 11.3793 4.77363 11.3793 4.26724C11.3793 3.5882 11.1096 2.93696 10.6294 2.45681C10.1492 1.97665 9.49801 1.7069 8.81897 1.7069ZM16.7845 16.5C16.559 16.4971 16.3437 16.4062 16.1843 16.2468C16.0248 16.0874 15.934 15.872 15.931 15.6466C15.931 13.4276 14.7248 11.9483 8.81897 11.9483C2.9131 11.9483 1.7069 13.4276 1.7069 15.6466C1.7069 15.8729 1.61698 16.09 1.45693 16.25C1.29687 16.4101 1.0798 16.5 0.853448 16.5C0.6271 16.5 0.410022 16.4101 0.249969 16.25C0.0899165 16.09 0 15.8729 0 15.6466C0 10.2414 6.17897 10.2414 8.81897 10.2414C11.459 10.2414 17.6379 10.2414 17.6379 15.6466C17.635 15.872 17.5441 16.0874 17.3847 16.2468C17.2253 16.4062 17.0099 16.4971 16.7845 16.5Z"
                                        fill="#586474"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-semibold text-[#41907A]">Jordan</h5>
                                <span className="text-[15px] font-medium text-[#828997]">
                                    081265789930
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h5 className="max-w-md text-gray-600">
                                Komplek Taman Cibaduyt Indah Blok A No. 2B, Cangkuang Wetan,
                                Dayeuhkolot, Kabupaten Bandung
                            </h5>
                            <h5 className="text-[15px] text-gray-600">12025</h5>
                        </div>
                        {/* Button Group */}
                        <div className="mt-1.5 flex items-center justify-between">
                            <div className="flex gap-2 divide-x-2 divide-gray-200 ">
                                <button className="text-[14px] font-semibold text-[#209978]">
                                    Edit
                                </button>
                                <button className="pl-2 text-[14px] font-semibold text-[#209978]">
                                    Delete
                                </button>
                            </div>
                            {/*  */}
                            {/* <button className="rounded-lg bg-gray-200 px-4 py-2 text-[15px] font-medium text-gray-400 cursor-not-allowed">
                                Set as Default
                            </button> */}
                        </div>
                    </div>
                    {/* Others */}
                    {addressList.map((item) => (
                        <div key="item" className="flex flex-col gap-3 rounded-xl border px-6 py-4 shadow-sm">
                            <div className="flex gap-2 items-center border-b pb-2.5">
                                <h4 className="text-[18px] font-semibold text-gray-600">
                                    {item.title}
                                </h4>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex items-center rounded-lg bg-[#f1f2f4] px-3.5">
                                    <svg
                                        width="18"
                                        height="17"
                                        viewBox="0 0 18 17"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M8.81897 8.53448C7.97498 8.53448 7.14996 8.28422 6.44821 7.81532C5.74647 7.34643 5.19953 6.67998 4.87655 5.90024C4.55357 5.12051 4.46906 4.26251 4.63372 3.43475C4.79837 2.60698 5.20479 1.84663 5.80157 1.24985C6.39835 0.653063 7.1587 0.246648 7.98647 0.0819958C8.81423 -0.0826567 9.67223 0.00184894 10.452 0.324826C11.2317 0.647804 11.8982 1.19475 12.367 1.89649C12.8359 2.59824 13.0862 3.42326 13.0862 4.26724C13.0862 5.39899 12.6366 6.48438 11.8364 7.28464C11.0361 8.0849 9.95071 8.53448 8.81897 8.53448ZM8.81897 1.7069C8.31258 1.7069 7.81756 1.85706 7.39651 2.13839C6.97547 2.41973 6.6473 2.8196 6.45352 3.28744C6.25973 3.75528 6.20903 4.27008 6.30782 4.76674C6.40661 5.2634 6.65046 5.71961 7.00853 6.07768C7.3666 6.43575 7.82281 6.6796 8.31947 6.77839C8.81612 6.87718 9.33092 6.82648 9.79877 6.63269C10.2666 6.43891 10.6665 6.11074 10.9478 5.68969C11.2291 5.26865 11.3793 4.77363 11.3793 4.26724C11.3793 3.5882 11.1096 2.93696 10.6294 2.45681C10.1492 1.97665 9.49801 1.7069 8.81897 1.7069ZM16.7845 16.5C16.559 16.4971 16.3437 16.4062 16.1843 16.2468C16.0248 16.0874 15.934 15.872 15.931 15.6466C15.931 13.4276 14.7248 11.9483 8.81897 11.9483C2.9131 11.9483 1.7069 13.4276 1.7069 15.6466C1.7069 15.8729 1.61698 16.09 1.45693 16.25C1.29687 16.4101 1.0798 16.5 0.853448 16.5C0.6271 16.5 0.410022 16.4101 0.249969 16.25C0.0899165 16.09 0 15.8729 0 15.6466C0 10.2414 6.17897 10.2414 8.81897 10.2414C11.459 10.2414 17.6379 10.2414 17.6379 15.6466C17.635 15.872 17.5441 16.0874 17.3847 16.2468C17.2253 16.4062 17.0099 16.4971 16.7845 16.5Z"
                                            fill="#586474"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-[#41907A]">{item.name}</h5>
                                    <span className="text-[15px] font-medium text-[#828997]">
                                        {item.phoneNum}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h5 className="max-w-md text-gray-600">
                                    {item.address}
                                </h5>
                                <h5 className="text-[15px] text-gray-600">{item.postCode}</h5>
                            </div>
                            {/* Button Group */}
                            <div className="mt-1.5 flex items-center justify-between">
                                <div className="flex gap-2 divide-x-2 divide-gray-200 ">
                                    <button className="text-[14px] font-semibold text-[#209978]">
                                        Edit
                                    </button>
                                    <button className="pl-2 text-[14px] font-semibold text-[#209978]">
                                        Delete
                                    </button>
                                </div>
                                {/*  */}
                                <button className="rounded-lg bg-gray-200 px-4 py-2 text-[15px] font-medium text-gray-500 transition delay-75 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-[#41907A] hover:text-white">
                                    Set as Default
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
