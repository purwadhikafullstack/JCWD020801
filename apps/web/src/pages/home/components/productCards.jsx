import 'keen-slider/keen-slider.min.css';
import KeenSlider from 'keen-slider';
import { useEffect, useRef, useState } from 'react';
import stockAvail from '../../../assets/home/stock_avail.svg';
import { convertToIDR, formatDistance } from '../../../functions/functions';
import axios from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/cartSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProductCards = () => {
    const { coordinates, loaded } = useSelector((state) => state.geolocation);

    // const { coordinates, loaded } = useGeoLocation();
    const [branchData, setBranchData] = useState(null);
    const customer = useSelector((state) => state.customer.value);

    const products = useSelector((state) => state.product.data);
    const dispatch = useDispatch();

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
                            spacing: 8,
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
                const response = await axios.post(`branches/get-nearest?latitude=${coordinates.lat}&longitude=${coordinates.lng}&limit=1`);
                // console.log(response.data.result);
                setBranchData(response.data.result[0])
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
        if (coordinates.lat && coordinates.lng) {
            fetchNearestBranch();
        } else {
            fetchMainBranch();
        }

    }, [coordinates?.lat, coordinates?.lng]);

    const handleAddtoCart = (item) => {
        if (Object.keys(customer).length > 0 && customer.isVerified === true) {
            dispatch(addToCart({ id: item.id, quantity: 1, amount: item.price }));

            toast.success(`${item.title} has been added to cart`, {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                theme: 'light',
            });
        } else {
            toast.error(
                <>
                    <div className="font-semibold text-[#E74C3C]">Oops!</div>
                    <div className="text-[15px]">Please Sign in to access this feature</div>
                </>,
                {
                    position: 'top-center',
                },
            );
            // navigate('/signin');
        }
    };

    return (
        <>
            <div className="my-[16px] mx-[16px] md:mx-[32px] lg:mx-[160px]">
                {/* Shopping From */}
                <div className="flex w-full justify-start">
                    <section className="flex gap-[0.7rem] mb-5 items-center w-max p-1 bg-[#00A67C] rounded-full">
                        <div
                            className={`${!coordinates?.lat && 'pulse-effect'
                                } rounded-full p-2 bg-[#E1F5EF]`}
                        >
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
                        <div
                            className={`${!coordinates?.lat && 'mr-[1.2rem]'
                                } flex flex-col text-white`}
                        >
                            <span className="text-[14px] font-normal">Shopping from:</span>
                            <span className="text-[16px] font-medium">{branchData?.name}</span>
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
                </div>
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
                                    {products.map((item, index) => (
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
                                                            className=" h-3 pt-[0.1rem]"
                                                        />
                                                        <span className="text-[#067627] font-medium text-[13px] md:text-[14px]">
                                                            stock:{' '}
                                                            <span className="text-[13px] md:text-[14px]">
                                                                {item.stock}
                                                            </span>{' '}
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    disabled={item.stock > 0 ? false : true}
                                                    onClick={() => handleAddtoCart(item)}
                                                    className={`mt-1 mb-[0.2rem] w-full rounded-full  text-white py-[0.4rem] text-[14px] ${item.stock > 0 ? 'bg-[#00A67C]' : ' bg-gray-600'
                                                        }`}
                                                >
                                                    {item.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
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
};
