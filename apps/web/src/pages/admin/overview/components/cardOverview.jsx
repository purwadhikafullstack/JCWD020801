import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function CardOverview({ path, title, desc, icon, data }) {
    return (
        <Link to={path}>
            <div className="bg-[#4eaf94] p-5 rounded-2xl shadow-xl transition duration-300 hover:bg-[#41907a] transform hover:scale-105">
                <div className="flex justify-start p-3">
                    <p className="text-2xl">{data} {title}</p>
                </div>
                <div className="flex flex-row w-full mt-9 p-3 gap-4 justify-between">
                    {icon}
                    <div className="flex flex-row gap-3 items-center">
                        <p>{desc}</p>
                        <FaLongArrowAltRight />
                    </div>
                </div>
            </div>
        </Link>
    )
}