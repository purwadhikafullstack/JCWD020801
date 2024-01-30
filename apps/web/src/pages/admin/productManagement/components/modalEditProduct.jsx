import {
    Button,
    Dialog,
    Card,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Select,
    Option,
    Switch,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from "../../../../api/axios";
import { useEffect, useState } from "react";

export default function ModalEditProduct({ openModalEdit, handleEdit, clickedData, adminDataRedux, handleRefreshTable }) {
    const token = localStorage.getItem('admtoken')
    const [categoryId, setCategoryId] = useState(0)
    const [subCategoryData, setSubCategoryData] = useState([])
    const [categoryData, setCategoryData] = useState([]);
    const [branchData, setBranchData] = useState([])
    const [branchId, setBranchId] = useState(0);
    const [enable, setEnable] = useState(clickedData?.isDisabled)

    const handleSwitch = () => {
        setEnable(!enable)
    }

    const handleClose = () => {
        setCategoryId(0)
        setBranchId(0)
        formik.resetForm();
        handleEdit()
    }

    const handleSubmit = async (data) => {
        try {
            const response = await axios.patch('products/', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            handleRefreshTable()
            handleClose();
            toast.success(response.data.message, {
                position: "top-center",
                hideProgressBar: true,
                theme: "colored"
            });
        } catch (err) {
            console.log(err);
            toast.error(err.response.data.message, { position: "top-center" });
        }
    }

    // const EditSchema = Yup.object({
    //     stock: Yup.number().required("Please enter the stock quantity."),
    // });

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            weight: "",
            stock: "",
            price: "",
            branch_id: "",
            category_id: "",
            subcategory_id: "",
        },
        // validationSchema: EditSchema,
        onSubmit: (values, action) => {
            values.id = clickedData.id
            values.isDisabled = enable
            values.branch_id = branchId
            values.updatedBy = adminDataRedux?.name
            handleSubmit(values);
            action.resetForm();
        },
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`/categories?all=true}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setCategoryData(response.data.result.rows)
            if (categoryId) {
                const response2 = await axios.get(`/categories/sub-category/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSubCategoryData(response2.data.result)
            }
            if (adminDataRedux?.isSuperAdmin === true) {
                const response_branch = await axios.get(`/branches/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                setBranchData(response_branch.data.result)
            } else {
                const response_branch = await axios.get(`/branches/assigned?id=${adminDataRedux?.id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                })
                setBranchData(response_branch.data.result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [categoryId])

    return (
        <>
            <Dialog
                size="lg"
                open={openModalEdit}
                handler={handleEdit}
                dismiss={{ outsidePress: (() => handleClose()) }}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full h-[80vh] overflow-auto">
                    <form onSubmit={formik.handleSubmit}>
                        <CardBody className="flex flex-col gap-4">
                            {adminDataRedux?.isSuperAdmin === true &&
                                <>
                                    <Typography variant="h4" color="blue-gray">
                                        Edit {clickedData?.name}
                                    </Typography>
                                    <Typography className="-mb-2" variant="h6">
                                        Product Name
                                    </Typography>
                                    <Input name="name" autoComplete="new" label={clickedData?.name} size="lg"
                                        onChange={formik.handleChange}
                                        value={formik.values.name} />
                                    <Typography className="-mb-2" variant="h6">
                                        Price
                                    </Typography>
                                    <Input name="price" type="number" autoComplete="new" label={clickedData?.price} size="lg"
                                        onChange={formik.handleChange}
                                        value={formik.values.price} />
                                    <Typography className="-mb-2" variant="h6">
                                        {'Weight (gram)'}
                                    </Typography>
                                    <Input name="weight" type="number" autoComplete="new" label={clickedData?.weight} size="lg"
                                        onChange={formik.handleChange}
                                        value={formik.values.weight} />
                                    <Typography className="-mb-2" variant="h6">
                                        Description
                                    </Typography>
                                    <Input name="description" type="text" autoComplete="new" label={clickedData?.description} size="lg"
                                        onChange={formik.handleChange}
                                        value={formik.values.description} />
                                    {categoryData && categoryData.length > 0 && (
                                        <>
                                            <Typography className="-mb-2" variant="h6">
                                                Category
                                            </Typography>
                                            <Select
                                                name="category_id"
                                                color="teal"
                                                label={"Select Category"}
                                                value={formik.values.category_id}
                                                onChange={(value) => { formik.setFieldValue("category_id", value); setCategoryId(value) }}
                                            >
                                                {categoryData?.map((item, index) => (
                                                    <Option key={index} value={item.id}>{item.name}</Option>
                                                ))}
                                            </Select>
                                        </>
                                    )}
                                    {subCategoryData && subCategoryData.length > 0 && categoryId != 0 && (
                                        <>
                                            <Typography className="-mb-2" variant="h6">
                                                Sub Category
                                            </Typography>
                                            <Select
                                                name="subcategory_id"
                                                color="teal"
                                                label="Select sub category"
                                                value={formik.values.subcategory_id}
                                                onChange={(value) => formik.setFieldValue("subcategory_id", value)}
                                            >
                                                {subCategoryData?.map((item, index) => (
                                                    <Option key={index} value={item.id}>{item.name}</Option>
                                                ))}
                                            </Select>
                                        </>
                                    )}
                                </>
                            }

                            {branchData && branchData.length > 0 && (
                                <>
                                    <Typography className="-mb-2" variant="h6">
                                        Assign to branch
                                    </Typography>
                                    <Select
                                        name="branch_id"
                                        color="teal"
                                        label="Select available branch"
                                        value={formik.values.branch_id}
                                        onChange={(value) => { formik.setFieldValue("branch_id", value); setBranchId(value) }}
                                    >
                                        {branchData?.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </>)}
                            {branchId > 0 &&
                                <>
                                    <Typography variant="h6">
                                        Stock
                                    </Typography>
                                    <Input type="number" name="stock" autoComplete="new" label="Stock" size="lg"
                                        onChange={formik.handleChange}
                                        value={formik.values.stock}
                                        error={formik.touched.stock && Boolean(formik.errors.stock)} />
                                    {formik.touched.stock && formik.errors.stock ? (
                                        <div className=" text-red-900 text-xs">
                                            {formik.errors.stock}
                                        </div>
                                    ) : null}
                                </>
                            }
                            {adminDataRedux?.isSuperAdmin === true &&
                                <Switch onChange={handleSwitch} defaultChecked={clickedData?.isDisabled ? false : true} label={enable === true ? 'Disabled' : 'Enabled'}></Switch>
                            }
                        </CardBody>
                        <CardFooter className="pt-0">
                            <div className="flex flex-row gap-3">
                                <Button onClick={handleClose} variant="text" fullWidth>
                                    Cancel
                                </Button>
                                <Button type="submit" style={{ backgroundColor: '#41907a' }} variant="filled" fullWidth>
                                    Update
                                </Button>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </Dialog>
        </>
    )
}