import {
    Card,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    Input
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const customer_dummy = [
    {
        first_name: "Barack",
        last_name: "Obama",
        username: "obama",
        email: "barackobama@gmail.com",
        referral_code: "BO1234",
        birthdate: "4/8/1961",
        isVerified: true,
        isDeleted: false,
        socialRegister: false
    },
    {
        first_name: "John",
        last_name: "Kennedy",
        username: "kennedy",
        email: "johnfkennedy@gmail.com",
        referral_code: "JFK1234",
        birthdate: "4/8/1961",
        isVerified: true,
        isDeleted: true,
        socialRegister: true
    }
]

export default function CustomerTable() {
    const TABLE_HEAD = ["First Name", "Last Name", "Username", "Email", "Birth Date", "Referral Code", "Status"];
    return (
        <div className="flex flex-col w-full items-center justify-center gap-5">
            <div className="w-screen md:w-5/6">
                <Card className="mt-6 w-full">
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2">
                            Customer Management
                        </Typography>
                        <Typography>
                            The current list of registered customers.
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="flex flex-col gap-3  md:flex-row md:justify-between">
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
                                {customer_dummy?.map(
                                    (item, index) => {
                                        const isLast = index === customer_dummy.length - 1;
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
                                                                {item.first_name}
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
                                                            {item.last_name}
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
                                                            {item.username}
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
                                                            {item.email}
                                                        </Typography>
                                                        <Chip
                                                            variant="filled"
                                                            size="sm"
                                                            value={item.isVerified ? "Verified" : "not verified"}
                                                            color={item.isVerified ? "green" : "blue-gray"}
                                                        />
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {item.birthdate}
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
                                                            {item.referral_code}
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
                                                            <Chip
                                                                variant="filled"
                                                                size="sm"
                                                                value={item.isDeleted ? "Deleted" : "Active"}
                                                                color={item.isDeleted ? "red" : "green"}
                                                            />
                                                            <Chip
                                                                variant="ghost"
                                                                size="sm"
                                                                value={item.socialRegister ? "Social Register" : "Regular Register"}
                                                                color='green'
                                                            />
                                                        </Typography>
                                                    </div>
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
                            Page 1 of 10
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" size="sm">
                                Previous
                            </Button>
                            <Button variant="outlined" size="sm">
                                Next
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}