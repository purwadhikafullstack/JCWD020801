import { useDebounce } from "use-debounce";
import AdminSidebar from "../components/sidebarAdminDashboard";
import { TableHeader } from "../components/tableHeader";
import { useEffect, useState } from "react";
import ModalAddProduct from "./components/modalAddProduct";
import ProductCard from "../components/productCard";
import axios from "../../../api/axios";
import { handleSortBy, handleReset, updateURL } from "../components/adminUtils";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";

export default function ProductManagement() {
    const navigate = useNavigate();
    const adminDataRedux = useSelector((state) => state.admin.value);
    const [productData, setProductData] = useState([])
    const [refreshTable, setRefreshTable] = useState(false)
    const handleRefreshTable = () => setRefreshTable(!refreshTable)
    const token = localStorage.getItem('admtoken')

    /* MODALS STATES AND HANDLES */
    const [openModalAdd, setOpenAdd] = useState(false); //Modal Add
    const [openModalEdit, setOpenEdit] = useState(false); //Modal Edit
    const [openDelete, setDelete] = useState(false); //Modal Delete
    const handleOpenAdd = () => setOpenAdd(!openModalAdd);
    const handleDelete = (item) => { setClickedData(item); setDelete(!openDelete) };
    const handleEdit = (item) => { setClickedData(item); setOpenEdit(!openModalEdit) };

    /* FILTERING STATES AND HANDLES */
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [sortOrder, setSortOrder] = useState('asc')
    const [orderChange, setOrderChange] = useState(false)
    const [sortBy, setSortBy] = useState('createdAt');
    const [debouncedSearchValue] = useDebounce(searchValue, 500)
    const [filterByCategory, setFilterByCategory] = useState(0);
    const handleFilterByCategory = (item) => {
        setFilterByCategory(item)
    }
    
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
    const handleSortByColumn = (columnName) => {
        handleSortBy(columnName, setSortBy, orderChange, setSortOrder, setOrderChange);
    };
    const handleResetButtonClick = () => {
        // handleReset(setSortBy, setOrderChange, setSortOrder, setSearchValue, refreshTable);
        setSearchValue('')
        setFilterByCategory(0)
    };

    const getProductData = async (page, sort, order, search) => {
        try {
            const response = await axios.get(`products?page=${page}&sortBy=${sort}&sortOrder=${order}&category=${filterByCategory}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            updateURL(navigate, page, sort, order, search)
            setProductData(response.data?.result.rows)
            setTotalPages(response.data?.totalPages)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProductData(currentPage, sortBy.toLowerCase(), sortOrder, debouncedSearchValue)
    }, [currentPage, debouncedSearchValue, sortOrder, sortBy, filterByCategory, refreshTable])

    return (
        <div className="flex flex-col lg:flex-row">
            <AdminSidebar subMenuStatus={true} />
            <div className="flex flex-col p-5 gap-3 bg-[#edf7f4] w-full items-center">
                <TableHeader
                    title={'Product Management'}
                    page={'product'}
                    description={'The current list of products.'}
                    handleOpenAdd={handleOpenAdd}
                    handleReset={handleResetButtonClick}
                    showAddButton={adminDataRedux.isSuperAdmin === true ? true : false}
                    addButtonText={'product'}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                    handleFilterByCategory={handleFilterByCategory} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2 md:p-9 items-center">
                    {productData?.map((item, index) => (
                        !item.isDeleted && (
                            <ProductCard
                                key={index}
                                productData={item}
                                adminDataRedux={adminDataRedux}
                                handleRefreshTable={handleRefreshTable}
                            />
                        )
                    ))}
                </div>
                <div className="flex flex-row gap-2 items-center justify-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {currentPage} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button onClick={() => handlePageChange(currentPage - 1)} variant="outlined" size="sm" disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <Button onClick={() => handlePageChange(currentPage + 1)} variant="outlined" size="sm" disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
            <ModalAddProduct
                openModalAdd={openModalAdd}
                handleOpenAdd={handleOpenAdd}
                handleRefreshTable={handleRefreshTable}
            />
            
        </div>
    )
}