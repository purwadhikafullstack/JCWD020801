import { Avatar, CardHeader, Chip, Typography } from "@material-tailwind/react";
import { MdOutlineEmail } from "react-icons/md";
import { WiTime4 } from "react-icons/wi";
import { MdOutlineAdminPanelSettings } from "react-icons/md"

export function AdminProfileCard({ adminData }) {
    return (
        <div className="flex flex-col p-8 bg-white shadow-md rounded-3xl w-96 h-auto items-center">
            <div className="flex flex-col items-center">
                <CardHeader floated={false}>
                    <img src={adminData.profile_picture ? adminData.profile_picture : "https://th.bing.com/th/id/OIP.0CZd1ESLnyWIHdO38nyJDAAAAA?rs=1&pid=ImgDetMain"} alt="profile-picture" />
                </CardHeader>
                <div className="flex flex-row w-full -mb-3 p-3 gap-2 items-center">
                    <Typography variant="h3" className="text-gray-700">{adminData?.name}</Typography>
                    <Chip
                        variant="filled"
                        size="sm"
                        value={adminData?.isVerified ? "Verified" : "not verified"}
                        color={adminData?.isVerified ? "green" : "blue-gray"}
                        className="h-1/2"
                    />
                </div>
                <div className="flex flex-col w-full p-3 gap-2">
                    <div className="flex flex-row items-center gap-1">
                        <MdOutlineAdminPanelSettings className="w-5 h-5 text-[#41907a]"/>
                        <Typography className="-mb-1 text-[#41907a]" variant="h6">Role</Typography>
                    </div>
                    <Typography className="text-gray-700">{adminData?.isSuperAdmin ? <>Super Admin</> : <>Admin</>}</Typography>
                    <div className="flex flex-row items-center gap-1">
                        <MdOutlineEmail className="w-5 h-5 text-[#41907a]" />
                        <Typography className="-mb-1 text-[#41907a]" variant="h6">Email</Typography>
                    </div>
                    <Typography className="text-gray-700">{adminData?.email}</Typography>
                    <div className="flex flex-row items-center gap-1">
                        <WiTime4 className="w-5 h-5 text-[#41907a]" />
                        <Typography className="-mb-1 text-[#41907a]" variant="h6">Registered at</Typography>
                    </div>
                    <Typography className="text-gray-700">{adminData?.createdAt}</Typography>
                </div>
            </div>
        </div>
    );
}