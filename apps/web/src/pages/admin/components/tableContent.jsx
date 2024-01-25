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

export default function TableContent({
    TABLE_HEAD,
    handleDelete = () => { },
    handleEdit = () => { },
    tableData,
    renderColumns,
    currentPage,
    handlePageChange,
    totalPages,
    handleSortBy }) {

    return (
        <div className="w-screen md:w-5/6">
            <Card className="h-full w-full">
                <CardBody className="overflow-scroll px-0 py-0">
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