import {
    Card,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { Helper } from "../../components/icons";
import { useSelector } from "react-redux";

export default function CategoryTable({ tabValueFromChild, handleDelete, handleEdit, categoryData, currentPage, handlePageChange, totalPages, handleSortBy }) {
    const TABLE_HEAD = ["ID", "Name", "CreatedAt", "UpdatedAt", "Actions"]
    const adminDataRedux = useSelector((state) => state.admin.value);

    return (
        <div className="w-screen md:w-5/6">
            <Card className="h-full w-full">
                <CardBody className="px-0 py-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        onClick={() => { handleSortBy(head) }}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="flex items-center justify-between font-bold leading-none opacity-70"
                                        >
                                            {head}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {categoryData?.map(
                                (item, index) => {
                                    const isLast = index === categoryData.length - 1;
                                    const classes = isLast
                                        ? "p-5"
                                        : "p-5 border-b border-blue-gray-50";
                                    return (
                                        <tr key={item.name}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {item.id}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col md:flex-row gap-3">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    {tabValueFromChild === 1 &&
                                                        <Chip
                                                            variant="filled"
                                                            size="sm"
                                                            value={item.CategoryId != null ? "Assigned" : "Not assigned"}
                                                            color={item.CategoryId ? "green" : "blue-gray"}
                                                        />}
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item.createdAt}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {item.updatedAt}
                                                    </Typography>
                                                </div>
                                            </td>
                                            {adminDataRedux.isSuperAdmin === true && 
                                            <td className={classes}>
                                                
                                                <>
                                                <Tooltip content={`Edit ${item.name}`}>
                                                    <IconButton onClick={() => handleEdit(item)} variant="text">
                                                        <PencilIcon className="h-4 w-4" />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip content={`Delete ${item.name}`}>
                                                    <IconButton onClick={() => handleDelete(item)} variant="text">
                                                        <TrashIcon className="h-4 w-4" color="red" />
                                                    </IconButton>
                                                </Tooltip>
                                                </>
                                            </td>
                                                }
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button onClick={() => handlePageChange(currentPage - 1)} variant="outlined" size="sm" disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Button onClick={() => handlePageChange(currentPage + 1)} variant="outlined" size="sm" disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}