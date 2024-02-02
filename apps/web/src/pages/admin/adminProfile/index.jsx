import { useSelector } from "react-redux";
import AdminSidebar from "../components/sidebarAdminDashboard";
import { AdminProfileCard } from "./components/profileCard";
import AdminProfileForm from "./components/profileForm";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function AdminProfile() {
    const adminData = useSelector((state) => state.admin.value);

    const formik = useFormik({
        initialValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
        onSubmit: (values, action) => {
            handleSubmit(values);
            action.resetForm();
        },
    });
    
    return (
        <div className="flex flex-row">
            <AdminSidebar />
            <div className="flex flex-row items-center justify-center w-full bg-[#edf7f4] gap-5">
                <div className="flex flex-col md:flex-row items-start gap-5 w-3/4 h-3/4">
                    <AdminProfileCard adminData={adminData} />
                    <AdminProfileForm adminData={adminData} />
                </div>
            </div>
        </div>
    )
}