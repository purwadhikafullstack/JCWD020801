import { FaStoreAlt } from "react-icons/fa";
import { GoPeople } from "react-icons/go";
import { VscGraphLine } from "react-icons/vsc";
import { MdOutlineDiscount } from "react-icons/md";
import { TbFileInvoice } from "react-icons/tb";
import { FaPlateWheat } from "react-icons/fa6";
import axios from "../../../../api/axios"

export const apiTotalAdmin = async () => {
    const token = localStorage.getItem('admtoken')
    try {
        const response = await axios.get('admins/total', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.totalAdmin
    } catch (err) {
        console.log(err)
    }
}

export const apiTotalProduct = async () => {
    const token = localStorage.getItem('admtoken')
    try {
        const response = await axios.get('products/total', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.totalProduct
    } catch (err) {
        console.log(err)
    }
}

export const getCardData = async () => {
    const totalAdmin = await apiTotalAdmin();
    const totalProduct = await apiTotalProduct();

    const card_data = [
        { 
            title: 'branches', 
            desc: 'Manage branch', 
            path: '/', 
            icon: <FaStoreAlt style={{ fontSize: '34px' }} />, 
            data: 5 
        },
        { 
            title: 'admins', 
            desc: 'Manage admin', 
            path: '/admin-management', 
            icon: <GoPeople style={{ fontSize: '34px' }} />,
            data: totalAdmin
        },
        { 
            title: 'customers',
            desc: 'See more', 
            path: '/customer-management',
            icon: <GoPeople style={{ fontSize: '34px' }} />, 
            data: 127
        },
        { 
            title: 'products',
            desc: 'Manage product', 
            path: '/product-management',
            icon: <FaPlateWheat style={{ fontSize: '34px' }} />, 
            data: totalProduct,
            admin: true
        },
        { 
            title: 'collected',
            desc: 'See reports', 
            path: '/',
            icon: <VscGraphLine style={{ fontSize: '34px' }} />, 
            data: 'Rp.2.200.000' 
        },
        { 
            title: 'promos available',
            desc: 'Manage promo', 
            path: '/',
            icon: <MdOutlineDiscount style={{ fontSize: '34px' }} />, 
            data: 8
        },
        { 
            title: 'Recent orders',
            desc: 'Manage recent orders', 
            path: '/',
            icon: <TbFileInvoice style={{ fontSize: '34px' }} />, 
            data: ''
        },
    ];

    return card_data;
};