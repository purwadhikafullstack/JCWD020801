import axios from "../../../../api/axios"

export const cardData = async () => {
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