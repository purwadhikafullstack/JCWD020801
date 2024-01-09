import { useState } from 'react';
import { SyncLoader } from 'react-spinners';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

export const ChangeEmail = () => {
    const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem('token');
    // console.log(token);
    const customer = useSelector((state) => state.customer.value);

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            const response = await axios.patch(
                `http://localhost:8000/api/customer/email-update?email=${values.email}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response);
            setIsLoading(false);
            toast.success('Email update link has been sent to your current email', {
                position: 'top-center',
            });

        } catch (error) {
            console.log(`Error handle change email`, error);
            setIsLoading(false);
            toast.error(error.response.data.message, {
                position: 'top-center',
            });
        }
    };

    const userChangeEmailSchema = Yup.object().shape({
        email: Yup.string()
            .email('Must be a valid email format')
            .required("Email can't be empty"),
    });

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: userChangeEmailSchema,
        onSubmit: (values) => {
            handleSubmit(values);
            formik.resetForm();
        },
    });

    return (
        <div className="h-screen">
            <div className="flex h-max flex-1 flex-col gap-[1.6rem] rounded-2xl border border-[#E6E6E5] bg-white px-[22px] md:px-[32px] lg:px-[2.6rem] py-[2rem]">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h3 className="mb-2 text-[26px] font-bold">Change Your Email</h3>
                        <p className="text-[15px] text-gray-600 ">
                            Type the new email you want to use for your account below
                        </p>
                    </div>
                </div>
                <form
                    onSubmit={formik.handleSubmit}
                    className="flex flex-col gap-[1.2rem]"
                >
                    <div className="w-full md:w-[26rem] lg:w-[22rem]">
                        <label className="mb-2 block text-sm font-medium text-gray-900 ">
                            New Email
                        </label>
                        <div className="relative">
                            <input
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 sm:text-sm focus:outline-[#4ECCA3]"
                                placeholder={customer.email}
                                id="email"
                                type="text"
                            />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <span className="pl-2 pb-2 text-red-500 text-[14px]">
                                {formik.errors.email}
                            </span>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="rounded-full bg-[#00a67c] mt-3 md:mt-2 w-full md:w-[120px] h-[42.5px] text-[15px] font-semibold text-white transition delay-100 ease-in-out hover:bg-[#00916D] "
                    >
                        {isLoading ? (
                            <div className="flex justify-center items-center">
                                <SyncLoader color="#FFFFFF" size={8} />
                            </div>
                        ) : (
                            'Confirm'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};
