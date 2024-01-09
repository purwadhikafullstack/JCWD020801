import { useEffect, useState } from "react";
import ModalAddAdmin from "./components/modalAddAdmin";
import ModalDelete from "./components/modalDelete";
import AdminTable from "./components/adminTable";
import ModalEditAdmin from './components/modalEditAdmin';
import AdminSidebar from '../components/sidebarAdminDashboard';
import { useSelector } from 'react-redux';
import AdminErrorPage from '../components/adminErrorPage';
import axios from "../../../api/axios";

export default function AdminManagement() {
    const [adminData, setAdminData] = useState([]);
    const [openModalAdd, setOpenAdd] = useState(false);
    const [openModalEdit, setOpenEdit] = useState(false);
    const [openDelete, setDelete] = useState(false);
    const [clickedData, setClickedData] = useState([]);
    const handleOpenAdd = () => setOpenAdd(!openModalAdd);
    const handleDelete = (item) => { setClickedData(item); setDelete(!openDelete) };
    const handleEdit = (item) => { setClickedData(item); setOpenEdit(!openModalEdit) };
    const adminDataRedux = useSelector((state) => state.admin.value);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const token = localStorage.getItem('admtoken')

    const getAdminData = async (page) => {
        try {
            const response = await axios.get(`admins?page=${page}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            setAdminData(response.data?.result.rows)
            setTotalPages(response.data?.totalPages)
        } catch (err) {
            console.log(err);
        }
    }

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        getAdminData(currentPage)
    }, [currentPage])

    return (
        <>
            {adminDataRedux?.isSuperAdmin === true ?
                <>
                    <div className='flex flex-row'>
                        <AdminSidebar />
                        <div className="flex flex-col h-screen p-5 gap-3 bg-[#edf7f4] w-full">
                            <AdminTable
                                handleOpenAdd={handleOpenAdd}
                                handleDelete={handleDelete}
                                handleEdit={handleEdit}
                                adminData={adminData}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                                totalPages={totalPages}
                            />
                        </div>
                    </div>
                    <ModalAddAdmin
                        openModalAdd={openModalAdd}
                        handleOpenAdd={handleOpenAdd}
                        getAdminData={getAdminData}
                        currentPage={currentPage} />
                    <ModalDelete
                        openDelete={openDelete}
                        handleDelete={handleDelete}
                        getAdminData={getAdminData}
                        clickedData={clickedData}
                        currentPage={currentPage} />
                    <ModalEditAdmin
                        openModalEdit={openModalEdit}
                        handleEdit={handleEdit}
                        getAdminData={getAdminData}
                        clickedData={clickedData} />
                </>
                :
                <>
                    <AdminErrorPage />
                </>
            }
        </>
    )
}