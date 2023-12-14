import { Card, Typography, Button } from "@material-tailwind/react";
import { UserPlusIcon } from "@heroicons/react/24/solid";

const TABLE_HEAD = ["Name", "Username", "Email", "Status", "Branch"];

const TABLE_ROWS = [
    {
        name: "John Michael",
        username: "john_michael",
        email: "john@gmail.com",
        status: "Verified",
        branch: "Branch 1"
    },
    {
        name: "Alexa",
        username: "alexa",
        email: "alexa@gmail.com",
        status: "Verified",
        branch: "Branch 2"
    }
];

export default function AdminManagement() {
    return (
        <div className="flex flex-col justify-center items-center h-screen p-5 bg-[#edf7f4] max-w-full">
            <div className="w-3/4 h-1/2">
                <Card className="h-full w-full">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Button style={{ backgroundColor: '#41907a' }} className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add admin
                            </Button>
                        </div>
                    </div>
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {TABLE_ROWS.map(({ name, username, email, status, branch }, index) => {
                                const isLast = index === TABLE_ROWS.length - 1;
                                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={name}>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {name}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {username}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {email}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {status}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {branch}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Button>
                                                Edit
                                            </Button>
                                            <Button color="red">
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Card>
            </div>
        </div>
    )
}