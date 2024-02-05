import { convertToIDR } from "../../../functions/functions";
import stockAvail from "../../../assets/home/stock_avail.svg"

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


export const ProductCatalogueData = () => {
    return (
        <>
            {/* Card Grid */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-[0.6rem]">
                {cardsData.map((item, index) => (
                    <div className="cursor-pointer col-span-1" key={index}>
                        <div className="flex h-full flex-col justify-between bg-white p-2 border border-[#D1D5D8] rounded-xl gap-3 hover:border-[#00A67C] transition delay-75 ease-in-out">
                            <div>
                                <img
                                    src={item.img}
                                    alt=""
                                    className="rounded-lg h-[8.75rem] md:h-[11.5rem] lg:h-[9rem] xl:h-[10rem] w-full object-cover"
                                />
                            </div>
                            <div className="px-1.5 flex flex-col gap-1">
                                <div className="flex gap-1">
                                    <span className="font-bold text-[13px]">Rp</span>
                                    <p className="text-[16px] md:text-[15px] font-bold text-rose-600 tracking-tight">
                                        {convertToIDR(item.price)}
                                    </p>
                                </div>
                                <p className="leading-relaxed text-gray-700 text-[14px] line-clamp-2">
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
                            <button
                                // onClick={addToCart}
                                className="mt-1 mb-[0.2rem] w-full rounded-full bg-[#00A67C] text-white py-[0.4rem] text-[14px]"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </section>
            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-[1.4rem] md:mt-[1.8rem]">
                <button
                    // onClick={() => handlePageChange(currentPage - 1)}
                    // disabled={currentPage === 1}
                    className="rounded-lg border border-[#E0E0E0] p-1.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-[0.65] transition ease-in-out delay-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#7a7a7a"
                        className="h-[1.2rem] w-[1.2rem] rtl:rotate-180"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
                <div className="text-[#898989] text-[15px] font-medium mx-1.5">
                    {/* {currentPage} of {totalPages} */}
                    1 of 12
                </div>
                <button
                    // onClick={() => handlePageChange(currentPage + 1)}
                    // disabled={currentPage === totalPages}
                    className="rounded-lg border border-[#E0E0E0] p-1.5 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-[0.65] transition ease-in-out delay-100"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#7a7a7a"
                        className="h-[1.2rem] w-[1.2rem] rotate-180"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5L8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>
            </div>
        </>
    )
}