/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';

export const OrderSummary = ({ carts, total, convertToIDR }) => {
  const data = useSelector((state) => state.product.data);
  // console.log(carts);

  return (
    <>
      <section className="rounded-xl bg-[#FFFFFF] py-5 px-7 shadow-sm">
        <h3 className="text-[20px] font-bold border-b border-[#dcdcdc] text-[#28302A] pb-[0.6rem]">
          Order Summary
        </h3>
        <div className="divide-y">
          {carts.map((item, index) => {
            const product = data.find((product) => product.id === item.id);

            return (
              <div key={index} className="flex gap-4 py-3">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-[6rem] object-cover rounded-lg"
                />
                <div className="flex flex-col w-[20rem]">
                  <span className="text-[14px] font-medium text-gray-800 line-clamp-2">
                    {product.desc}
                  </span>
                  <div className="flex gap-2 mt-[0.3rem]">
                    <span className="text-[14px] font-medium text-gray-600">
                      {convertToIDR(product.price)}
                    </span>
                    {/* <span className="text-[14px] font-medium text-gray-600">x 3</span> */}
                  </div>
                  <span className="text-[13px] font-medium text-gray-600">
                    Qty: {item.quantity}
                  </span>
                </div>
                <div className="ml-auto">
                  <span className="text-[15px] font-semibold text-gray-700">
                    {convertToIDR(product.price * item.quantity)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="border-t border-[#dcdcdc] flex justify-between w-full pt-[1rem]">
          <h4 className="font-medium text-gray-700">Subtotal</h4>
          <h4 className="font-semibold">{convertToIDR(total)}</h4>
        </div>
      </section>
    </>
  );
};
