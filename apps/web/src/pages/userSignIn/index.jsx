import appLogoSm from '../../assets/userSignIn/lemon-logo.svg';
import googleIcon from '../../assets/userSignIn/google-icon.svg';
import facebookIcon from '../../assets/userSignIn/facebook-icon.svg';
import loginBanner from '../../assets/userSignIn/login-vector.svg';
import { SyncLoader } from 'react-spinners'
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import eyeIcon from '../../assets/userDashboard/eye.svg';
import eyeOffIcon from '../../assets/userDashboard/eye-off.svg';
import { Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setData } from '../../redux/customerSlice';

export const UserSignIn = () => {
    const navigate = useNavigate();
    const [socialHover1, setSocialHover1] = useState(false);
    const [socialHover2, setSocialHover2] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [modalOpen, setModalOpen] = useState(false)
    const handleModalOpen = () => setModalOpen(!modalOpen)
    const dispatch = useDispatch()

    const handleSubmit = async (values) => {
        console.log(values);
        try {
            setIsLoading(true)
            const response = await axios.get(`http://localhost:8000/api/customer/user-signin?email=${values.email}&password=${values.password}`, values)
            console.log(response);
            setIsLoading(false)
            navigate('/home')
            localStorage.setItem('token', response.data.token)
            dispatch(setData(response.data.result))
            toast.success('Login Success!', {
                position: "top-center",
            })
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            toast.error(error.response.data.message, {
                position: "top-center",
            });
        }
    }

    const userSignInSchema = Yup.object().shape({
        email: Yup.string().required(),
        password: Yup.string().required()
    })

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: userSignInSchema,
        onSubmit: (values) => {
            handleSubmit(values);
            formik.resetForm();
        }
    })

    return (
        <>
            <section className="h-screen bg-[#EDF7F4]">
                <div className="grid h-full grid-cols-1 p-3 md:grid-cols-2">
                    {/* --------------- Left Col -------------- */}
                    <div className="flex h-full flex-col items-center justify-center gap-[3rem] lg:gap-0 lg:justify-between rounded-3xl bg-white py-12 lg:mr-5">
                        {/* Title & Desc */}
                        <div className="flex flex-col items-center gap-5 pt-4 md:pt-0">
                            <img src={appLogoSm} alt="" className="h-12"></img>
                            <div className="flex flex-col items-center gap-2">
                                <h3 className="text-[30px] font-bold text-[#28302A]">
                                    Welcome Back!
                                </h3>
                                <span className="text-gray-500">Please enter your details</span>
                            </div>
                        </div>
                        <div className="mt-0 flex w-full flex-col gap-6 px-[2.2rem] pb-8 md:mt-5 md:px-[2rem] lg:px-[8rem]">
                            {/* Input email, Password */}
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                                {/* email */}
                                <label className="relative block w-full rounded-full border border-[#D4D4D5] focus-within:border-[#4ECCA3] focus-within:outline-1 focus-within:outline-[#4ECCA3] focus-within:outline">
                                    <input
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        type="text"
                                        className="peer w-full border-none bg-transparent px-4 py-2.5 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                        placeholder="Event Title"
                                        autoComplete="off"
                                    />
                                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 px-3 text-sm text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                        Email
                                    </span>
                                </label>
                                {formik.touched.email && formik.errors.email ? (
                                    <span className="text-red-500 text-[14px]">
                                        {formik.errors.email}
                                    </span>
                                ) : null}
                                {/* Password */}
                                <label className="relative block w-full rounded-full border border-[#D4D4D5] focus-within:border-[#4ECCA3] focus-within:outline-1 focus-within:outline-[#4ECCA3] focus-within:outline">
                                    <input
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        type={showPassword ? 'text' : 'password'}
                                        className="peer w-full border-none bg-transparent px-4 py-2.5 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                        placeholder="Password"
                                        autoComplete="off"
                                    />
                                    <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 px-3 text-sm text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                        Password
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute top-1/2 transform -translate-y-1/2 right-4 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <img src={eyeIcon} className="h-5" />
                                        ) : (
                                            <img src={eyeOffIcon} className="h-5" />
                                        )}
                                    </button>
                                </label>
                                {formik.touched.password && formik.errors.password ? (
                                    <span className="text-red-500 text-[14px]">
                                        {formik.errors.password}
                                    </span>
                                ) : null}
                                <div className="flex justify-end" onClick={handleModalOpen}>
                                    <span className="w-full cursor-pointer text-end text-[14px] text-gray-600 hover:text-gray-700 hover:underline hover:decoration-1">
                                        forgot password?
                                    </span>
                                </div>
                                <button type="submit" className="mt-3 rounded-full bg-[#28302A] h-[46px] font-medium text-white hover:bg-black transition delay-100 ease-in-out" disabled={isLoading}>
                                    <span className="button-text">
                                        {isLoading ? (
                                            <div className="flex justify-center items-center">
                                                <SyncLoader color="#c0cac2" size={9} />
                                            </div>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </span>
                                </button>
                            </form>
                            {/* social Login */}
                            <div className="inline-flex items-center justify-center">
                                <hr className="mt-[0.2rem] h-px w-full border-0 bg-gray-300"></hr>
                                <p className="whitespace-nowrap bg-white px-3 text-[15px] text-gray-800">
                                    or continue with
                                </p>
                                <hr className="mt-[0.2rem] h-px w-full border-0 bg-gray-300"></hr>
                            </div>
                            <div className="flex items-center justify-center gap-5">
                                {/* Google */}
                                <motion.div
                                    className="flex h-12 cursor-pointer gap-3 rounded-full bg-[#f0f0f0] p-3 hover:bg-[#e6e6e6]"
                                    onHoverStart={() => setSocialHover1(true)}
                                    onHoverEnd={() => setSocialHover1(false)}
                                    initial={{ opacity: 1, x: 0 }}
                                    animate={{ opacity: 1, x: socialHover1 ? 10 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img src={googleIcon} alt="" className=""></img>
                                    <AnimatePresence>
                                        {socialHover1 && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ duration: 0.3 }}
                                                className="mr-0 whitespace-nowrap text-[14px] font-semibold text-gray-500 md:mr-1.5"
                                            >
                                                Log in with Google
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                {/* Facebook */}
                                <motion.div
                                    className="flex h-12 cursor-pointer gap-3 rounded-full bg-[#1977F3] p-3"
                                    onHoverStart={() => setSocialHover2(true)}
                                    onHoverEnd={() => setSocialHover2(false)}
                                    initial={{ opacity: 1, x: 0 }}
                                    animate={{ opacity: 1, x: socialHover1 ? 10 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img src={facebookIcon} alt="" className=""></img>
                                    <AnimatePresence>
                                        {socialHover2 && (
                                            <motion.span
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -50 }}
                                                transition={{ duration: 0.3 }}
                                                className="mr-0 whitespace-nowrap text-[14px] font-semibold text-white md:mr-1.5"
                                            >
                                                Log in with Facebook
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        </div>
                        <div>
                            <span className="text-[15px] text-gray-800">
                                Don&apos;t have an account?
                                <span className="cursor-pointer font-semibold text-[#41907A] hover:underline hover:decoration-1">
                                    {' '}
                                    Register
                                </span>
                            </span>
                        </div>
                    </div>
                    {/* --------------- Right Col -------------- */}
                    <div className="hidden h-full flex-col items-center justify-center gap-[2.6rem] md:flex">
                        <img src={loginBanner} alt="" className="h-[28vh] lg:h-[58vh]"></img>
                        <h4 className="whitespace-pre text-center text-[19px] font-medium text-[#28302A]">
                            Make grocery shopping easier <br></br> with{' '}
                            <span className="font-bold"> Fresh Finds</span>
                        </h4>
                    </div>
                </div>
            </section >
            {/* Forgot Password */}
            <Dialog Dialog size="sm" open={modalOpen} handler={handleModalOpen} className="p-3 flex flex-col items-center" >
                <DialogHeader className="text-[#28302A] font-bold w-max">Forgot your password?</DialogHeader>
                <DialogBody className="flex flex-col gap-4 items-center">
                    <div className="flex items-center justify-center p-6 rounded-full bg-[#F2F3F5]">
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 11C18.7 11 19.37 11.1 20 11.29V10C20 8.9 19.1 8 18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H12.26C11.5275 20.9511 11.0967 19.7214 11.0144 18.4447C10.9322 17.168 11.2017 15.8932 11.7935 14.759C12.3854 13.6247 13.277 12.6746 14.3712 12.0118C15.4655 11.349 16.7206 10.9991 18 11ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6Z" fill="#6B7280" />
                            <path d="M18 13C15.24 13 13 15.24 13 18C13 20.76 15.24 23 18 23C20.76 23 23 20.76 23 18C23 15.24 20.76 13 18 13ZM20 20C19.8 20.2 19.49 20.2 19.29 20L17.64 18.35C17.5467 18.2571 17.4929 18.1317 17.49 18V15.5C17.49 15.22 17.71 15 17.99 15C18.27 15 18.49 15.22 18.49 15.5V17.79L19.99 19.29C20.2 19.49 20.2 19.8 20 20Z" fill="#8b919e" />
                        </svg>
                    </div>
                    <span className="text-[15px] text-gray-600 w-[80%] text-center">
                        Enter your email address associated with your account
                    </span>
                    <div className="mt-2 w-full">
                        <label className="relative block w-full rounded-full border border-[#D4D4D5] focus-within:border-[#4ECCA3] focus-within:outline-1 focus-within:outline-[#4ECCA3] focus-within:outline">
                            <input
                                type="text"
                                name="username"
                                className="peer w-full border-none bg-transparent px-4 py-2.5 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                                placeholder="Event Title"
                                autoComplete="off"
                            />
                            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 px-3 text-sm text-gray-600 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                                Email
                            </span>
                        </label>
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-end">
                    <div className="flex justify-end gap-3">
                        <button onClick={handleModalOpen} className="shadow-sm rounded-full px-5 py-2 border border-[#E5E7EB] text-[15px] font-medium text-gray-600 transition delay-100 ease-in-out hover:bg-gray-100">
                            Cancel
                        </button>
                        <button className="rounded-full bg-[#00a67c] px-5 py-2.5 text-[15px] font-semibold text-white transition delay-100 ease-in-out hover:bg-[#00916D] ">
                            Confirm
                        </button>
                    </div>
                </DialogFooter>
            </Dialog >
        </>
    );
};
