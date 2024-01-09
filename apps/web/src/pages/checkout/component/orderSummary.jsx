import { convertToIDR } from '../../../functions/functions';
import dummyProduct from '../../../assets/navbar/bowl.png';

const productList = [
    {
        name: 'Family Tree Farms Jumbo Ultra-Premium Blueberries, Case',
        price: '67000',
        img: dummyProduct,
    },
    { name: 'Family Tree Farms', price: '5000', img: dummyProduct },
    {
        name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case, Ultra-Premium Blueberries, ',
        price: '45000',
        img: dummyProduct,
    },
    {
        name: 'Family Tree Farms Jumbo Ultra Premium Blueberries, Case',
        price: '32000',
        img: dummyProduct,
    },
];


export const OrderSummary = () => {
    return (
        <>
            <section className="rounded-xl bg-[#FFFFFF] py-5 px-7 shadow-sm">
                <h3 className="text-[20px] font-bold border-b border-[#dcdcdc] text-[#28302A] pb-[0.6rem]">
                    Order Summary
                </h3>
                <div className="divide-y">
                    {productList.map((item, index) => (
                        <div key={index} className="flex gap-4 py-3">
                            <img
                                src={item.img}
                                alt=""
                                className="w-[6rem] object-cover rounded-lg"
                            />
                            <div className="flex flex-col w-[20rem]">
                                <span className="text-[14px] font-medium text-gray-800 line-clamp-2">
                                    {item.name}
                                </span>
                                <div className="flex gap-2 mt-[0.3rem]">
                                    <span className="text-[14px] font-medium text-gray-600">
                                        Rp {convertToIDR(item.price)}
                                    </span>
                                    {/* <span className="text-[14px] font-medium text-gray-600">x 3</span> */}
                                </div>
                                <span className="text-[13px] font-medium text-gray-600">
                                    Qty: 3
                                </span>
                            </div>
                            <div className="ml-auto">
                                <span className="text-[15px] font-semibold text-gray-700">
                                    Rp 200.000
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="border-t border-[#dcdcdc] flex justify-between w-full pt-[1rem]">
                    <h4 className="font-medium text-gray-700">Subtotal</h4>
                    <h4 className="font-semibold">Rp 230.000</h4>
                </div>
            </section>
        </>
    )
}