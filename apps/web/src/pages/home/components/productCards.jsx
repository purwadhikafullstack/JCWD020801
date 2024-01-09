import 'keen-slider/keen-slider.min.css'
import KeenSlider from 'keen-slider'
import { useEffect, useRef, useState } from 'react'
import stockAvail from '../../../assets/home/stock_avail.svg'
import { convertToIDR, formatDistance } from '../../../functions/functions';
import { useGeoLocation } from '../../../hooks/useGeoLocation';
import axios from '../../../api/axios';

const cardsData = [
    {
        title: 'card 2',
        img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '25000',
        stock: 54,
        desc: 'Just FreshDirect 100% Grass-Fed Local 80% Lean Ground Beef, Fresh, Premium Packaging',
    },
    {
        title: 'card 1',
        img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '25000',
        stock: 54,
        desc: "FreshDirect Rotisserie Chicken, Raised w/o Antibiotics",
    },
    {
        title: 'card 3',
        img: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '2500000',
        stock: 54,
        desc: 'Siggis Skyr Icelandic-Style Strained Non-Fat Yogurt, Mixed Berry and Acai',
    },
    {
        title: 'card 4',
        img: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '25000',
        stock: 54,
        desc: 'Just FreshDirect Local Angus RWA 90% Lean Ground Beef, Premium Packaging',
    },
    {
        title: 'card 5',
        img: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '25000000',
        stock: 54,
        desc: 'Sprouts Organic Chicken Thin Sliced Boneless Breast',
    },
    {
        title: 'card 6',
        img: 'https://plus.unsplash.com/premium_photo-1671379041175-782d15092945?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        price: '250000',
        stock: 54,
        desc: 'this is desc this is desc this is desc',
    },
];

export const ProductCards = () => {
    const { coordinates, loaded } = useGeoLocation();
    const [branchData, setBranchData] = useState(null)
    console.log("coords from product cards", coordinates);

    const [keenSlider, setKeenSlider] = useState(null);
    const sliderRef = useRef(null);

    const slidePrev = () => {
        if (keenSlider) {
            keenSlider.prev();
        }
    };

    const slideNext = () => {
        if (keenSlider) {
            keenSlider.next();
        }
    };

    useEffect(() => {
        if (sliderRef.current) {
            const slider = new KeenSlider(sliderRef.current, {
                loop: true,
                slides: {
                    origin: 'center',
                    perView: 1.25,
                    spacing: 16,
                },
                breakpoints: {
                    '(min-width: 0px)': {
                        slides: {
                            perView: 2,
                            spacing: 8
                        },
                    },
                    '(min-width: 640px)': {
                        slides: {
                            perView: 2,
                            spacing: 16,
                        },
                    },
                    '(min-width: 768px)': {
                        slides: {
                            perView: 3.25,
                            spacing: 15,
                        },
                    },
                    '(min-width: 1024px)': {
                        slides: {
                            origin: 'auto',
                            perView: 4.25,
                            spacing: 10,
                        },
                    },
                    '(min-width: 1280px)': {
                        slides: {
                            origin: 'auto',
                            perView: 4.5,
                            spacing: 22,
                        },
                    },
                },
            });

            setKeenSlider(slider);
        }
    }, []);

    const fetchNearestBranch = async () => {
        if (loaded) {
            try {
                const response = await axios.post(`branches/get-nearest?latitude=${coordinates.lat}&longitude=${coordinates.lng}`);
                console.log(response.data.result);
                setBranchData(response.data.result)
            } catch (error) {
                console.log(error);
            }
        }
    };

    const fetchMainBranch = async () => {
        try {
            const response = await axios.get('branches/super-store');
            setBranchData(response.data.result)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (coordinates === null) {
            console.log('Location permission denied. Fetching data from main store.');
            fetchMainBranch();
        } else if (coordinates && loaded) {
            console.log('Location permission granted. Fetching data from nearest store.');
            fetchNearestBranch();
        }
    }, [loaded, coordinates?.lat, coordinates?.lng]);

    return (
        <>
            <div className="my-[16px] mx-[16px] md:mx-[32px] lg:mx-[160px]">
                {/* Shopping From */}
                <section className="flex gap-[0.7rem] mb-5 items-center w-max p-1 bg-[#00A67C] rounded-full">
                    <div className={`${!coordinates?.lat && ("pulse-effect")} rounded-full p-2 bg-[#E1F5EF]`}>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 20 21"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.6667 5.49992H3.33333V3.83325H16.6667V5.49992ZM10.8333 13.4166C10.8333 14.3666 11.1917 15.3833 11.6667 16.3333V17.1666H3.33333V12.1666H2.5V10.4999L3.33333 6.33325H16.6667L17.25 9.24992C16.6667 8.98325 16.0667 8.83325 15.4167 8.83325C12.9167 8.83325 10.8333 10.9166 10.8333 13.4166ZM10 12.1666H5V15.4999H10V12.1666ZM18.3333 13.4166C18.3333 15.5833 15.4167 18.8333 15.4167 18.8333C15.4167 18.8333 12.5 15.5833 12.5 13.4166C12.5 11.8333 13.8333 10.4999 15.4167 10.4999C17 10.4999 18.3333 11.8333 18.3333 13.4166ZM16.4167 13.4999C16.4167 12.9999 15.9167 12.4999 15.4167 12.4999C14.9167 12.4999 14.4167 12.9166 14.4167 13.4999C14.4167 13.9999 14.8333 14.4999 15.4167 14.4999C16 14.4999 16.5 13.9999 16.4167 13.4999Z"
                                fill="#00A67C"
                            />
                        </svg>
                    </div>
                    <div className={`${!coordinates?.lat && ("mr-[1.2rem]")} flex flex-col text-white`}>
                        <span className="text-[14px] font-normal">Shopping from:</span>
                        <span className="text-[16px] font-medium">
                            {branchData?.name}
                        </span>
                    </div>
                    {coordinates?.lat && (
                        <div className="pulse-effect rounded-full bg-[#E1F5EF] px-4 py-[0.7rem] ml-[0.5rem]">
                            <span className="text-[15px] font-semibold text-[#00A67C]">
                                {formatDistance(branchData?.distance)}
                                <span className="font-medium"> away</span>
                            </span>
                        </div>
                    )}
                </section>
                {/* Cards */}
                <>
                    <section className="border-y border-[#D1D5D8]">
                        <div className="pb-[2rem] pt-[1.4rem]">
                            <div className="items-center justify-between sm:flex">
                                <h2 className="text-[25px] md:text-[28px] font-semibold text-gray-900 tracking-tight">
                                    Recommended Products
                                </h2>

                                <div className="flex items-center justify-between gap-5 mt-3 md:mt-0">
                                    <span className="font-semibold text-[#28302A] hover:underline underline-offset-2 cursor-pointer ">
                                        View all
                                    </span>
                                    <div className="flex gap-3">
                                        <button
                                            aria-label="Previous slide"
                                            id="keen-slider-previous"
                                            onClick={slidePrev}
                                            className="rounded-full border border-gray-300 p-3 transition hover:bg-gray-50"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-5 w-5 rtl:rotate-180"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                                />
                                            </svg>
                                        </button>

                                        <button
                                            aria-label="Next slide"
                                            id="keen-slider-next"
                                            onClick={slideNext}
                                            className="rounded-full border border-gray-300 p-3 transition hover:bg-gray-50"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-5 w-5 rotate-180"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* ---- */}
                            <div className="mt-6" ref={sliderRef}>
                                <div id="keen-slider" className="keen-slider">
                                    {cardsData.map((item, index) => (
                                        <div
                                            className="keen-slider__slide cursor-pointer"
                                            key={index}
                                        >
                                            <div className="flex h-full flex-col justify-between bg-white p-2 border border-[#D1D5D8] rounded-xl gap-3 hover:border-[#00A67C] transition delay-100 ease-in-out">
                                                <div>
                                                    <img
                                                        src={item.img}
                                                        alt=""
                                                        className="rounded-lg h-[140px] md:h-[145px] xl:h-[180px] w-full object-cover"
                                                    />
                                                </div>
                                                <div className="px-1.5 flex flex-col gap-2">
                                                    <div className="flex gap-1">
                                                        <span className="font-bold text-[13px]">Rp</span>
                                                        <p className="text-[16px] md:text-[18px] font-bold text-rose-600 tracking-tight">
                                                            {convertToIDR(item.price)}
                                                        </p>
                                                    </div>
                                                    <p className="leading-relaxed text-gray-700 text-[14px] md:text-[15px] line-clamp-2">
                                                        {item.desc}
                                                    </p>

                                                    <div className="flex gap-1.5 items-center">
                                                        <img
                                                            src={stockAvail}
                                                            alt=""
                                                            className="h-3 h-3 pt-[0.1rem]"
                                                        />
                                                        <span className="text-[#067627] font-medium text-[13px] md:text-[14px]">
                                                            stock:{' '}
                                                            <span className="text-[13px] md:text-[14px]">
                                                                {item.stock}
                                                            </span>{' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button className="mt-1 mb-[0.2rem] w-full rounded-full bg-[#00A67C] text-white py-[0.4rem] text-[14px]">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </>
            </div>
        </>
    );
}