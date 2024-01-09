import { useSelector } from 'react-redux';
import avaDummy from '../../../assets/userDashboard/ava-dummy.png';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { Option, Select } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SyncLoader } from 'react-spinners';
import googleIcon from '../../../assets/userDashboard/google.svg';

export const PersonalInformation = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const customer = useSelector((state) => state.customer.value);
    const token = localStorage.getItem('token');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Referral code copied!', {
            position: 'top-center',
        });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('profile_picture', selectedFile);

            try {
                const response = await axios.patch(
                    'http://localhost:8000/api/customer/img-update',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
                console.log('File uploaded successfully:', response.data);
                toast.success('Profile picture has been updated!', {
                    position: 'top-center',
                });
            } catch (error) {
                console.log('Error uploading file', error);
            }
        } else {
            toast.error('You need to select a file', {
                position: 'top-center',
            });
        }
    };

    const handleSubmit = async (values) => {
        try {
            setIsLoading(true);
            const response = await axios.patch(
                'http://localhost:8000/api/customer/data-update',
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            console.log(response);
            setIsLoading(false);
            toast.success(response.data.message, {
                position: 'top-center',
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error.response.data.message, {
                position: 'top-center',
            });
        }
    };

    const userDataUpdateSchema = Yup.object().shape({
        firstname: Yup.string(),
        lastname: Yup.string(),
        gender: Yup.string(),
        phoneNumber: Yup.number()
    });

    const formik = useFormik({
        initialValues: {
            firstname: customer.firstname || undefined,
            lastname: customer.lastname || undefined,
            gender: customer.gender || undefined,
            phoneNumber: customer.phoneNumber || undefined,
        },
        validationSchema: userDataUpdateSchema,
        onSubmit: (values) => {
            handleSubmit(values);
            formik.resetForm();
        },
    });

    return (
        <div className="h-screen">
            <div className="flex h-max flex-1 flex-col gap-6 rounded-2xl border border-[#E6E6E5] bg-white px-[22px] md:px-[32px] lg:px-[2.6rem] py-[2rem]">
                <div className="mb-2 flex flex-col">
                    <h3 className="mb-2 text-[22px] lg:text-[26px] font-bold">
                        Welcome to Your Account,
                        <span className="text-[#00A67C]"> {customer.firstname}!</span>
                    </h3>
                    <p className="text-[15px] text-gray-600">
                        {customer.socialRegister ? 'See' : 'Update'} your personal details
                    </p>
                </div>
                {/* Edit Image */}
                <div
                    className={`${customer.socialRegister ? '' : 'border-b border-gray-300 pb-5'
                        } flex flex-col gap-[2rem] md:gap-0 md:flex-row w-full justify-between`}
                >
                    <div
                        className={`${customer.socialRegister
                            ? 'py-4 pl-4 md:pr-6 w-full md:w-max flex flex-row border border-gray-300 bg-[#fafafa]'
                            : ''
                            } rounded-xl flex items-center gap-4`}
                    >
                        <img
                            src={
                                customer.profile_picture ? customer.profile_picture : avaDummy
                            }
                            alt=""
                            className="h-[5rem] w-[5rem] lg:h-[5.5rem] lg:w-[5.5rem] rounded-full object-cover"
                        ></img>
                        {customer.socialRegister ? (
                            <div className="flex flex-col gap-[0.4rem]">
                                <div className="flex flex-col">
                                    <span className="font-semibold">
                                        {customer.firstname} {customer?.lastname}
                                    </span>
                                    <span className="text-[15px] text-gray-600">
                                        {customer.email}
                                    </span>
                                </div>
                                <div className="flex items-center gap-[0.4rem]">
                                    <img src={googleIcon} alt="" className="h-4" />
                                    <span className="text-[14px] md:text-[15px] font-medium text-gray-600">
                                        Registered using{' '}
                                        <span className="font-semibold">Google</span>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col">
                                <span className="text-[16px] font-semibold text-gray-800">
                                    Edit Your Profile Picture
                                </span>
                                <div className="flex flex-col justify-between gap-[0.3rem]">
                                    <input
                                        id="file_upload"
                                        type="file"
                                        className="file:cursor-pointer text-gray-700 mt-2 block w-[15rem] text-sm file:mr-2 lg:file:mr-4 file:rounded-full file:border-0 file:bg-[#E1F5EF] file:py-1 file:px-4 file:text-sm file:font-medium file:text-[#3A826E] hover:file:bg-[#a8e2d0] focus:outline-none disabled:opacity-60"
                                        onChange={handleFileChange}
                                    />
                                    <button
                                        className="cursor-pointer w-max text-sm rounded-full bg-gray-100 border border-gray-300 px-4 py-0 h-[27px] font-normal text-gray-800"
                                        onClick={handleFileUpload}
                                    >
                                        Upload
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* Referral code */}
                    <div
                        className="flex flex-col items-center justify-center rounded-lg border-[2px] border-dashed border-[#00A67C] bg-[#F0FAF7] px-5 py-2 cursor-pointer hover:scale-105 transition delay-100 ease-in-out hover:bg-[#ddf4ed]"
                        onClick={() => copyToClipboard(customer.referral_code)}
                    >
                        <span className="text-[15px] font-medium text-green-500">
                            Your referral code
                        </span>
                        <span className="text-[18px] font-bold text-[#00916D]">
                            {customer.referral_code}
                        </span>
                        <span className="text-[14px] text-green-500">tap to copy</span>
                    </div>
                </div>
                {/* Form */}
                {customer.socialRegister ? (
                    <></>
                ) : (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex flex-1 flex-col gap-[1.8rem]">
                            {/* Firstname & Lastname */}
                            <div className="flex flex-col md:flex-row w-full justify-between gap-[1rem] md:gap-[1.2rem] lg:gap-[4rem]">
                                <div className="w-full">
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        First name
                                    </label>
                                    <input
                                        id="firstname"
                                        name="firstname"
                                        value={formik.values.firstname}
                                        onChange={formik.handleChange}
                                        className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                        placeholder={customer.firstname}
                                        type="text"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Last name
                                    </label>
                                    <input
                                        name="lastname"
                                        value={formik.values.lastname}
                                        onChange={formik.handleChange}
                                        className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                        placeholder={customer.lastname}
                                        id="lastname"
                                        type="text"
                                    />
                                </div>
                            </div>
                            {/* phone number */}
                            <div className="md:flex-row flex flex-col w-full justify-between gap-[1rem] md:gap-[1.4rem] lg:gap-[4rem]">
                                <div className="w-full">
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <div className="relative mt-2 text-gray-500">
                                        <div className="absolute inset-y-0 left-3 my-auto h-6 flex items-center border-r pr-2">
                                            <select className="text-sm text-gray-500 outline-none rounded-lg h-full bg-transparent">
                                                <option>IDN</option>
                                            </select>
                                        </div>
                                        <input
                                            name="phoneNumber"
                                            value={formik.values.phoneNumber}
                                            onChange={formik.handleChange}
                                            type="number"
                                            placeholder={customer.phoneNumber}
                                            className="focus:outline-[#4ECCA3] block w-full pl-[4.5rem] pr-3 py-2.5 text-sm border border-gray-300 bg-[#FCFCFC] rounded-lg text-gray-900"
                                        />
                                    </div>
                                </div>
                                <div className="w-full">
                                    <label className="mb-2 block text-sm font-medium text-gray-900">
                                        Gender
                                    </label>
                                    <Select
                                        color="teal"
                                        label={customer.gender ? customer.gender : "Gender"}
                                        id="gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        onChange={(value) => formik.setFieldValue('gender', value)}
                                        className="h-[43px] bg-[#FCFCFC] border-gray-300"
                                    >
                                        <Option value="male">Male</Option>
                                        <Option value="female">Female</Option>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        {/* Button Group */}
                        <div className="mt-10 flex w-full md:w-max md:justify-end gap-3">
                            <button
                                type="submit"
                                className="rounded-full bg-[#00a67c] w-full md:w-[144px] h-[42.5px] text-[15px] font-semibold text-white transition delay-100 ease-in-out hover:bg-[#00916D] "
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <SyncLoader color="white" size={9} />
                                    </div>
                                ) : (
                                    'Save changes'
                                )}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
