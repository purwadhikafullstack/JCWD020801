import axios from "../../../../api/axios"

export const TABLE_HEAD_CATEGORY = [
    "ID",
    "Name",
    "Created at",
    "Updated at",
]

export const allCategory = async (page, sort, order, search) => {
    const token = localStorage.getItem('admtoken')
    try {
        const response = await axios.get(`categories?page=${page}&sortBy=${sort}&sortOrder=${order}&search=${search}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (err) {
        console.log(err)
    }
}