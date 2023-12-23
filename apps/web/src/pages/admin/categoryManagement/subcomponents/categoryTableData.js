import axios from "../../../../api/axios"

export const TABLE_HEAD_CATEGORY = [
    "Id",
    "Name",
    "Created at",
    "Updated at",
]

export const allCategory = async () => {
    const token = localStorage.getItem('admtoken')
    try {
        const response = await axios.get('categories/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data.allCategory
    } catch (err) {
        console.log(err)
    }
}