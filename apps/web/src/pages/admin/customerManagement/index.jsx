import { useEffect, useState } from "react";
import AdminSidebar from "../components/sidebarAdminDashboard";
import { TableHeader } from "../components/tableHeader";
import CustomerTable from "./components/customerTable";
import { handleSortBy, updateURL } from "../components/adminUtils";
import { useDebounce } from 'use-debounce';
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CustomerManagement() {
    const [customerData, setCustomerData] = useState([]);
    const [clickedData, setClickedData] = useState([]);
    const [refreshTable, setRefreshTable] = useState(false)
    const handleRefreshTable = () => setRefreshTable(!refreshTable)
    const token = localStorage.getItem('admtoken');
    const navigate = useNavigate();

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

    const getCustomerData = async (page, sort, order, search) => {
        try {
            const response = await axios.get(`customer/all?page=${page}&sortBy=${sort}&sortOrder=${order}&search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCustomerData(response.data?.result.rows)
            setTotalPages(response.data?.totalPages)
            updateURL(navigate, page, sort, order, search)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getCustomerData(currentPage, sortBy.toLowerCase(), sortOrder, debouncedSearchValue)
    }, [currentPage, sortBy, sortOrder, debouncedSearchValue, refreshTable])

    return (
        <div className="flex flex-row">
            <AdminSidebar />
            <div className="flex flex-col  h-screen p-5 gap-3 items-center bg-[#edf7f4] w-full">
                <TableHeader
                    title={'Customer Management'}
                    description={'The current list of registered customers.'}
                    showAddButton={false}
                    searchValue={searchValue}
                    setSearchValue={setSearchValue} />
                <CustomerTable
                    customerData={customerData}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                    handleSortBy={handleSortByColumn}
                />
            </div>
        </div>
    )
}