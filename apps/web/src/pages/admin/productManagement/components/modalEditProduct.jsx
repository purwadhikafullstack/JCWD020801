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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from "../../../../api/axios";
import { useEffect, useState } from "react";

export default function ModalEditProduct({openModalEdit, handleEdit, clickedData, handleRefreshTable}){
    const token = localStorage.getItem('admtoken')
    const [categoryId, setCategoryId] = useState(0)
    const [subCategoryData, setSubCategoryData] = useState([])
    const [categoryData, setCategoryData] = useState([]);
    const [enable, setEnable] = useState(clickedData?.isDisabled)

    const handleSwitch = () =>{
        setEnable(!enable)
    }

    const handleClose = () => {
        setCategoryId(0)
        formik.resetForm();
        handleEdit()
    }

    const handleSubmit = async (data) => {
        data.id = clickedData.id
        data.isDisabled = enable
        try{
            console.log(data);
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
        }catch(err){
            console.log(err);
            toast.error(err.response.data.message, { position: "top-center" });
        }
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            weight: "",
            price: "",
            category_id: "",
            subcategory_id: "",
        },
        onSubmit: (values, action) => {
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
            if(categoryId){
                const response2 = await axios.get(`/categories/sub-category/${categoryId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                setSubCategoryData(response2.data.result)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [categoryId])

    return(
        <>
        <Dialog
                size="xs"
                open={openModalEdit}
                handler={handleEdit}
                dismiss={{outsidePress: (() => handleClose())}}
                className="bg-transparent shadow-none"
            >
                <Card className="mx-auto w-full max-w-[24rem]">
                    <form onSubmit={formik.handleSubmit}>
                    <CardBody className="flex flex-col gap-4">
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
                        value={formik.values.price}/>
                        <Typography className="-mb-2" variant="h6">
                            {'Weight (gram)'}
                        </Typography>
                        <Input name="weight" type="number" autoComplete="new" label={clickedData?.weight} size="lg" 
                        onChange={formik.handleChange}
                        value={formik.values.weight}/>
                        <Typography className="-mb-2" variant="h6">
                            Description
                        </Typography>
                        <Input name="description" type="text" autoComplete="new" label={clickedData?.description} size="lg" 
                        onChange={formik.handleChange}
                        value={formik.values.description}/>
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
                                        onChange={(value) => {formik.setFieldValue("category_id", value); setCategoryId(value)}}
                                    >
                                        {categoryData?.map((item, index) => (
                                            <Option key={index} value={item.id}>{item.name}</Option>
                                        ))}
                                    </Select>
                                </>
                            )}
                            {subCategoryData && subCategoryData.length > 0  && categoryId!=0 && (
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
                            <Switch onChange={handleSwitch} defaultChecked={clickedData?.isDisabled ? false : true} label={enable === true ? 'Disabled' : 'Enabled'}></Switch>
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