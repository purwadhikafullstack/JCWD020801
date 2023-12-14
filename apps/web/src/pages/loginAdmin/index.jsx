import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
import { useState } from "react";
import ModalForgotPassword from "./components/modalForgotPassword";
import { Link } from "react-router-dom";
import adminLogin from '../../assets/admin_login.png'

export default function LoginAdmin() {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);
    
    return (
        <div className="h-screen flex items-center justify-center p-9 bg-[#edf7f4]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
            <Card color="white" shadow={true} className="p-9">
                <Typography variant="h4" color="blue-gray">
                    Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to sign in.
                </Typography>
                <form className="mt-8 mb-2 max-w-screen-lg sm:w-96">
                    <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Email
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                        <Typography variant="h6" color="blue-gray" className="-mb-3">
                            Password
                        </Typography>
                        <Input
                            type="password"
                            size="lg"
                            placeholder="********"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                                className: "before:content-none after:content-none",
                            }}
                        />
                    </div>
                    <div className="flex flex-row items-center justify-between">
                    <Checkbox
                        label={
                            <Typography
                                variant="small"
                                color="gray"
                                className="flex items-center font-normal"
                            >
                                Remember Me
                            </Typography>
                        }
                        containerProps={{ className: "-ml-2.5" }}
                    />
                    <div onClick={handleOpen} className="cursor-pointer">Forgot Password</div>
                    
                    </div>
                    <Link to={'/admin-dashboard'}>
                        <Button style={{ backgroundColor: '#41907a' }} variant="filled" className="mt-6" fullWidth>
                            Log in
                        </Button>
                    </Link>
                </form>
            </Card>
            <img
            className="h-96 rounded-lg object-cover hidden md:block"
            src={adminLogin}
            alt="admin image"
            />
            </div>
            
            <ModalForgotPassword
            open={open}
            handleOpen={handleOpen}
            />
        </div>
    )
}