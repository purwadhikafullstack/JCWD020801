import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from "react";
import googlePin from '../../../assets/userDashboard/google-pin-2.svg';
import { SyncLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete'; import { MapWithMarker } from './mapWithMarker';

export const ModalUserCreateAddress = ({ modalAddOpen, handleModalAddOpen, fetchUserAddressData }) => {
    const token = localStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(false);
    const customer = useSelector((state) => state.customer.value);

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null,
    });

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);

        const ll = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(ll);
        console.log(address);
        console.log(ll);
    };

    const handleSubmit = async () => {
        console.log('Form Submitted');
        try {
            setIsLoading(true);
            const dataToSend = {
                title: formik.values.title,
                customerAddressName: formik.values.customerAddressName,
                phoneNumber: formik.values.phoneNumber,
                address: address,
                longitude: coordinates.lng,
                latitude: coordinates.lat,
            };

            await createAddressSchema.validate(dataToSend);
            console.log('Validated data:', dataToSend);

            const response = await axios.post(
                'http://localhost:8000/api/customer-address/create',
                dataToSend,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log('Success adding new address', response.data);
            setIsLoading(false);
            toast.success(response.data.message, {
                position: 'top-center',
            });
            handleModalAddOpen()
            fetchUserAddressData()
            formik.resetForm();
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error.response.data.message, {
                position: 'top-center',
            });
        }
    };

    const createAddressSchema = Yup.object().shape({
        title: Yup.string().required("Title can't be empty"),
        customerAddressName: Yup.string().required("Customer name can't be empty"),
        phoneNumber: Yup.string().required("Phone number can't be empty"),
        address: Yup.string(),
    });

    const formik = useFormik({
        initialValues: {
            title: '',
            customerAddressName: '',
            phoneNumber: '',
            address: '',
            latitude: '',
            longitude: '',
        },
        validationSchema: createAddressSchema,
        onSubmit: (values) => {
            console.log('Form submitted');
            handleSubmit(values);
        },
    });

    return (
        <Dialog
            Dialog
            size="lg"
            open={modalAddOpen}
            handler={() => handleModalAddOpen()}
            className="flex flex-col items-center"
        >
            <DialogHeader className="justify-between font-bold w-max flex  border-b border-gray-300 w-full h-[3.6rem]">
                <div></div>
                <div className="flex text-[#28302A] text-[20px] md:text-[21px] gap-3 items-center">
                    <img
                        src={googlePin}
                        alt=""
                        className="h-[1.2rem] w-[1.2rem]"
                    />
                    <span>Add New Address</span>
                </div>
                <div onClick={() => handleModalAddOpen()} className="cursor-pointer rounded-md hover:bg-gray-100 p-[0.1rem]">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#657385"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </div>
            </DialogHeader>
            <DialogBody className="flex flex-col gap-4 items-center w-full px-4 md:px-10">
                <form onSubmit={formik.handleSubmit} className="w-full">
                    {/* ---------------------- */}
                    <div className="flex flex-col md:flex-row gap-3.5 md:gap-[2rem] w-full">
                        {/* Title & Customer Name */}
                        <div className="flex flex-col w-full gap-3.5">
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Title
                                </label>
                                <input
                                    name="title"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                    type="text"
                                    className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                    placeholder="My Home"
                                    autoComplete="off"
                                />
                                {formik.touched.title && formik.errors.title ? (
                                    <span className="pl-2 pb-2 text-red-500 text-[14px]">
                                        {formik.errors.title}
                                    </span>
                                ) : null}
                            </div>
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Customer name
                                </label>
                                <input
                                    name="customerAddressName"
                                    value={formik.values.customerAddressName}
                                    onChange={formik.handleChange}
                                    type="text"
                                    className="block w-full rounded-lg border border-gray-300 bg-[#FCFCFC] p-2.5 text-gray-900 focus:outline-[#4ECCA3] sm:text-sm"
                                    placeholder={customer.firstname}
                                    autoComplete="off"
                                />
                                {formik.touched.customerAddressName &&
                                    formik.errors.customerAddressName ? (
                                    <span className="pl-2 pb-2 text-red-500 text-[14px]">
                                        {formik.errors.customerAddressName}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                        {/* Phone Number & Address: Autocomplete */}
                        <div className="flex flex-col w-full gap-3.5">
                            <div className="w-full">
                                <label className="mb-2 block text-sm font-medium text-gray-900">
                                    Phone number
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
                                        id="phoneNumber"
                                        placeholder={customer.phoneNumber}
                                        className="focus:outline-[#4ECCA3] block w-full pl-[4.5rem] pr-3 py-2.5 text-sm border border-gray-300 bg-[#FCFCFC] rounded-lg text-gray-900"
                                        autoComplete="off"
                                    />
                                </div>
                                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                                    <span className="pl-2 pb-2 text-red-500 text-[14px]">
                                        {formik.errors.phoneNumber}
                                    </span>
                                ) : null}
                            </div>
                            <PlacesAutocomplete
                                value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}
                            >
                                {({
                                    getInputProps,
                                    suggestions,
                                    getSuggestionItemProps,
                                    loading,
                                }) => (
                                    <div className="w-full relative">
                                        <label className="mb-2 block text-sm font-medium text-gray-900">
                                            Address
                                        </label>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Search Places ...',
                                                className: 'location-search-input',
                                            })}
                                            className="rounded-lg bg-red h-[41px] bg-[#FCFCFC] border border-[#E0E0E0] px-3 block w-full focus:outline-[#4ECCA3] text-[15px] text-gray-900"
                                        />
                                        <div className="autocomplete-dropdown-container absolute z-50 border border-gray-300 rounded-sm">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map((suggestion, index) => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                const style = suggestion.active
                                                    ? {
                                                        backgroundColor: '#e6f4f0',
                                                        cursor: 'pointer',
                                                        padding: '3px 10px',
                                                        fontSize: '15px',
                                                    }
                                                    : {
                                                        backgroundColor: '#ffffff',
                                                        cursor: 'pointer',
                                                        padding: '3px 10px',
                                                        fontSize: '15px',
                                                    };
                                                return (
                                                    <div
                                                        key={index}
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </PlacesAutocomplete>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="flex flex-col gap-3 mt-5">
                        <MapWithMarker
                            coordinates={{
                                lat: coordinates.lat || 0,
                                lng: coordinates.lng || 0,
                            }}
                            setAddress={setAddress}
                            setCoordinates={setCoordinates}
                        />
                        <div className="flex gap-3 items-center">
                            <div className="shrink-0">
                                <svg
                                    width="19"
                                    height="19"
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11 3C15.4183 3 19 6.58172 19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3Z"
                                        stroke="#4ECCA3"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M11 3V1M19 11H21M11 19V21M3 11H1"
                                        stroke="#4ECCA3"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                    <path
                                        d="M11 15C13.2091 15 15 13.2091 15 11C15 8.79086 13.2091 7 11 7C8.79086 7 7 8.79086 7 11C7 13.2091 8.79086 15 11 15Z"
                                        fill="#4ECCA3"
                                    />
                                </svg>
                            </div>
                            <div>
                                <span className="text-gray-600 font-normal mt-2 text-[15px]">
                                    {address}{' '}
                                    <span className="text-[14px] text-gray-500">
                                        {' '}
                                        ({coordinates.lat}, {coordinates.lng}).
                                    </span>{' '}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Button Group */}
                    <div className="mt-4 flex justify-center gap-3">
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={handleModalAddOpen}
                                className="shadow-sm rounded-full px-5 py-2 border border-[#E5E7EB] text-[15px] font-medium text-gray-600 transition delay-100 ease-in-out hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="rounded-full bg-[#00a67c] h-[44px] w-[138px] text-[15px] font-semibold text-white transition delay-100 ease-in-out hover:bg-[#00916D] "
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <SyncLoader color="white" size={9} />
                                    </div>
                                ) : (
                                    'Save Address'
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </DialogBody>
        </Dialog>
    );
};

ModalUserCreateAddress.propTypes = {
    modalAddOpen: PropTypes.bool.isRequired,
    handleModalAddOpen: PropTypes.func.isRequired,
    fetchUserAddressData: PropTypes.func.isRequired,
};
