import { Button, Card, Chip, Input, Typography } from "@material-tailwind/react";

export default function AdminProfileForm({ adminData }) {
    return (
        <div className="flex flex-col p-8 bg-white shadow-md rounded-3xl w-96 h-auto items-center">
            <div className="flex flex-col gap-3 w-full">
                <Typography variant="h3">Edit profile</Typography>
                <Typography className="-mb-2" variant="h6">Name</Typography>
                <Input label="name" />
                <Typography className="-mb-2" variant="h6">Username</Typography>
                <Input label="username" />
                <Typography className="-mb-2" variant="h6">Email</Typography>
                <Input label="email" />
                <Typography className="-mb-2" variant="h6">Password</Typography>
                <Input
                    name="password"
                    label="New Password"
                    type="password"
                />
                <Input
                    name="confirmPassword"
                    label="Confirm password"
                    type="password" />
                <Button fullWidth className="bg-[#41907a] text-white">Save</Button>
            </div>
        </div>
    )
}