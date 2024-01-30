import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { handleReset, handleSortBy, updateURL } from "../components/adminUtils";
import AdminSidebar from "../components/sidebarAdminDashboard";
import { useNavigate } from "react-router-dom";
import axios from "../../../api/axios";
import { TableHeader } from "../components/tableHeader";
import StockTable from "./components/stockTable";
import { useSelector } from "react-redux";
import ModalEditStock from "./components/modalEditStock";
import ModalStockHistory from "./components/modalStockHistory";
import ModalDelete from "../components/modalDelete";

export default function StockManagement() {
    const [productBranchData, setProductBranchData] = useState([]);
    const [clickedData, setClickedData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(false)
    const handleRefreshTable = () => setRefreshTable(!refreshTable);
    const adminDataRedux = useSelector((state) => state.admin.value);
    const token = localStorage.getItem('admtoken');
    const navigate = useNavigate()

    /* MODALS STATES AND HANDLES */
    const [openModalEdit, setOpenEdit] = useState(false); //Modal Edit
    const handleEdit = (item) => { setClickedData(item); setOpenEdit(!openModalEdit) };
    const [openModalHistory, setOpenHistory] = useState(false); //Modal History
    const handleHistory = (item) => { setClickedData(item); setOpenHistory(!openModalHistory) };
    const [openDelete, setDelete] = useState(false); //Modal Delete
    const handleDelete = (item) => { setClickedData(item); setDelete(!openDelete) };

    /* FILTERING STATES AND HANDLES */
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc')
    const [orderChange, setOrderChange] = useState(false)
    const [sortBy, setSortBy] = useState('createdAt');
    const [debouncedSearchValue] = useDebounce(searchValue, 500)

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSortByColumn = (columnName) => {
        handleSortBy(columnName, setSortBy, orderChange, setSortOrder, setOrderChange);
    };
    const handleResetButtonClick = () => {
        handleReset(setSortBy, setOrderChange, setSortOrder, setSearchValue);
    };

    const getBranchProductData = async (page, sort, order, search) => {
        try {
            const response = await axios.get(`products/branch-product?page=${page}&sortBy=${sort}&sortOrder=${order}&search=${search}&admid=${adminDataRedux.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            updateURL(navigate, page, sort, order, search)
            setProductBranchData(response.data?.result.rows)
            setTotalPages(response.data?.totalPages)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if(adminDataRedux.id){
            getBranchProductData(currentPage, sortBy.toLowerCase(), sortOrder, debouncedSearchValue)
        }
    }, [adminDataRedux.id, currentPage, sortBy, sortOrder, debouncedSearchValue, refreshTable])

    return (
        <div className="flex flex-row">
            <AdminSidebar subMenuStatus={true} />
            <div className="flex flex-col h-screen p-5 gap-3 bg-[#edf7f4] w-full items-center">
                <TableHeader
                    title={'Stock Management'}
                    description={'Manage stock of product'}
                    showAddButton={false}
                    searchValue={searchValue}
                    handleReset={handleResetButtonClick}
                    setSearchValue={setSearchValue} />
                <StockTable
                    handleEdit={handleEdit}
                    handleHistory={handleHistory}
                    handleDelete={handleDelete}
                    productBranchData={productBranchData}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                    handleSortBy={handleSortByColumn}
                />
            </div>
            <ModalEditStock
                api={'/products/branch-product/stock'}
                openModalEdit={openModalEdit}
                handleEdit={handleEdit}
                handleRefreshTable={handleRefreshTable}
                clickedData={clickedData}
            />
            <ModalStockHistory
                openModalHistory={openModalHistory}
                handleHistory={handleHistory}
                clickedData={clickedData}
            />
            <ModalDelete
                api={'/products/branch-product'}
                openDelete={openDelete}
                handleDelete={handleDelete}
                getData={getBranchProductData}
                clickedData={clickedData}
                handleRefreshTable={handleRefreshTable} />
        </div>
    )
}