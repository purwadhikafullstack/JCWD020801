import { Button, CardBody, CardFooter, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { ChevronUpDownIcon, TrashIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import axios from '../../../../api/axios'
import { FaCircleInfo } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { formatDate, truncateString } from '../../../../functions/functions'

const tableHead = ["Store branch", "Address", "Admin", "Status", "Created", "Action"]

export const StoreTable = () => {
    const [branchData, setBranchData] = useState([])
    const token = localStorage.getItem('admtoken');
    const navigate = useNavigate()

    const fetchBranchData = async () => {
        try {
            const response = await axios.get('branches/', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            console.log("Branches Data:", response);
            setBranchData(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchBranchData();
    }, [])

    return (
        <>
            <div className="rounded-lg bg-white shadow-sm">
                <CardBody className="overflow-auto px-0 py-0 my-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {tableHead.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between gap-2 font-semibold leading-none opacity-70"
                                        >
                                            {head}{' '}
                                            {index !== tableHead.length - 1 && (
                                                <ChevronUpDownIcon
                                                    strokeWidth={2}
                                                    className="h-4 w-4"
                                                />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {branchData?.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-blue-gray-50 text-[15px]"
                                >
                                    <td className="py-7">
                                        <div className="flex gap-2 items-center pl-3">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="18"
                                                height="18"
                                                viewBox="0 0 512 512"
                                                className="shrink-0"
                                            >
                                                <path
                                                    // fill="#94cfbf"
                                                    fill="#b9c7ce"
                                                    d="M256 32C167.67 32 96 96.51 96 176c0 128 160 304 160 304s160-176 160-304c0-79.49-71.67-144-160-144m0 224a64 64 0 1 1 64-64a64.07 64.07 0 0 1-64 64"
                                                />
                                            </svg>
                                            <span className="font-medium text-[#263238] line-clamp-2 w-[10rem]">
                                                {item.name} <br />
                                                {item?.isSuperStore && (<div className="flex items-center py-[0.1rem] bg-[#DBEFDC] w-max rounded-md px-[0.5rem] mt-[0.3rem]"><span className="text-[14px] font-medium text-[#1B5E20]">main store</span></div>)}
                                                {/* {truncateString(item.name, 20)} */}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="pl-3 flex-wrap w-[20rem]">
                                            <span className="text-gray-700 line-clamp-2 text-[14px]">
                                                {/* {truncateString(item.address, 80)} */}
                                                {item.address}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex flex-col pl-3">
                                            <span className="text-[#263238] text-[14px]">
                                                {item.Admin.name}
                                            </span>
                                            <span className="text-[14px] text-gray-500">
                                                {truncateString(item.Admin.email, 15)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="">
                                        <div className="flex justify-center">
                                            <div
                                                className={`${item.isActive ? 'bg-[#DBEFDC]' : 'bg-[#DFE5E8]'
                                                    } rounded-md  py-[0.1rem]`}
                                            >
                                                <span
                                                    className={`${item.isActive ? 'text-[#1B5E20]' : 'text-gray-600'
                                                        } text-[12px] font-bold px-3`}
                                                >
                                                    {item.isActive ? 'ACTIVE' : 'OFF'}
                                                </span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <span className="pl-3 text-gray-500 text-[14px]">{formatDate(item.createdAt)}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <Tooltip content="Branch Detail">
                                            <IconButton onClick={() => navigate(`/store-management/${item.id}`)} variant="text">
                                                {/* <PencilIcon className="h-4 w-4 text-[#616161]" /> */}
                                                <FaCircleInfo className="h-4 w-4 text-[#616161]" />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip content="Delete Branch">
                                            <IconButton onClick={""} variant="text">
                                                <TrashIcon className="h-4 w-4 text-[#ff0000]" color="red" />
                                            </IconButton>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-gray-200 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal text-gray-600">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" className="border-gray-500 text-gray-500">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm" className="border-gray-500 text-gray-500">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </div>
        </>
    );
}