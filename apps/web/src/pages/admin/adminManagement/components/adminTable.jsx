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
    Input
} from "@material-tailwind/react";
import { PencilIcon, TrashIcon, UserPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Helper } from "../../components/icons";

export default function AdminTable({ handleOpenAdd, handleDelete, handleEdit, adminData, currentPage, handlePageChange, totalPages }) {
    const TABLE_HEAD = ["Name", "Username", "Email", "Action"];
    return (
        <div className="flex flex-col w-full items-center justify-center gap-5">
            <div className="w-screen md:w-5/6">
                <Card className="mt-6 w-full">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Admin management
                        </Typography>
                        <Typography>
                            The current list of registered admins.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="flex flex-col gap-3  md:flex-row md:justify-between">
                            <Button onClick={handleOpenAdd} className="flex items-center gap-3 bg-[#41907a]" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add admin
                            </Button>
                            <div className="w-full md:w-72">
                                <Input
                                    label="Search"
                                    icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                />
                            </div>
                        </div>

                    </CardFooter>
                </Card>
            </div>
            <div className="w-screen md:w-5/6">
                <Card className="h-full w-full">
                    <CardBody className="overflow-scroll px-0 py-0">
                        <table className="mt-4 w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {adminData?.map(
                                    (item, index) => {
                                        const isLast = index === adminData.length - 1;
                                        const classes = isLast
                                            ? "p-5"
                                            : "p-5 border-b border-blue-gray-50";
                                        return (
                                            <tr key={item.name}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src="https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png" alt={item.name} size="sm" />
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {item.name}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {item.username}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col w-1/2">
                                                        <div className="flex flex-row items-center gap-1">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {item.email}
                                                            </Typography>
                                                            <Helper content={`Verification code: ${item.verification_code}`} />
                                                        </div>
                                                        <Chip
                                                            variant="filled"
                                                            size="sm"
                                                            value={item.isVerified ? "Verified" : "not verified"}
                                                            color={item.isVerified ? "green" : "blue-gray"}
                                                        />
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip content="Edit User">
                                                        <IconButton onClick={() => handleEdit(item)} variant="text">
                                                            <PencilIcon className="h-4 w-4" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip content={`Delete ${item.name}`}>
                                                        <IconButton onClick={() => handleDelete(item)} variant="text">
                                                            <TrashIcon className="h-4 w-4" color="red" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
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
        </div>
    )
}