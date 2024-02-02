import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { SyncLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css'
import React, { useState } from "react";
import axios from "../../../api/axios";

export default function ModalAddForm({
    open,
    handleOpenAdd,
    title,
    submitButtonText,
    cancelButtonText,
    validationSchema,
    fields,
    api
}) {
    const token = localStorage.getItem('admtoken')
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        handleOpenAdd()
        formik.resetForm()
    }

    const handleSubmit = async (data) => {
        try {
            setIsLoading(true)
            const response = await axios.post(`${api}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsLoading(false)
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
            handleClose();
            getAdminData(currentPage);
        } catch (err) {
            setIsLoading(false)
            toast.error(err.response.data.message, { position: "top-center" });
        }
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, action) => {
            handleSubmit(values);
            action.resetForm();
        },
    });

    return (
        <Dialog
            size="xs"
            open={open}
            handler={handleClose}
            dismiss={{ outsidePress: handleClose }}
            className="bg-transparent shadow-none"
        >
            <Card className="mx-auto w-full max-w-[24rem]">
                <form onSubmit={formik.handleSubmit}>
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h4" color="blue-gray">
                            {title}
                        </Typography>
                        {fields.map((field) => (
                            <React.Fragment key={field.name}>
                                <Typography className="-mb-2" variant="h6">
                                    {field.label}
                                </Typography>
                                <Input
                                    name={field.name}
                                    autoComplete="off"
                                    label={field.label}
                                    size="lg"
                                    onChange={formik.handleChange}
                                    value={formik.values[field.name] || ""}
                                    error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                                    placeholder={field.placeholder || ""}
                                />
                                {formik.touched[field.name] && formik.errors[field.name] && (
                                    <div className="text-red-900 text-xs">
                                        {formik.errors[field.name]}
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </CardBody>
                    <CardFooter className="pt-0">
                        <div className="flex flex-row gap-3">
                            <Button disabled={isLoading} onClick={handleClose} variant="text" fullWidth>
                                {cancelButtonText}
                            </Button>
                            <Button
                                disabled={isLoading}
                                type="submit"
                                style={{ backgroundColor: '#41907a' }}
                                variant="filled"
                                fullWidth
                            >
                                {isLoading ? (
                                    <div className="flex justify-center items-center">
                                        <SyncLoader color="#c0cac2" size={9} />
                                    </div>
                                ) : (
                                    <>{submitButtonText}</>
                                )}
                            </Button>
                        </div>
                    </CardFooter>
                </form>
            </Card>
        </Dialog>
    );
}
