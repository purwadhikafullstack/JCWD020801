import Province from '../models/province.model'
import getProvinces from '../services/getProvince';

export const fetchAndPostProvinces = async (req, res) => {
    try {
        const provincesData = await getProvinces()
        const formattedProvinces = provincesData.rajaongkir.results.map((province) => ({
            province_id: province.province_id,
            province: province.province
        }))

        const result = await Province.bulkCreate(formattedProvinces)

        res.status(200).send({ message: "Provinces data posted successfully", result: result })

    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message })
    }
}

export const getAllProvince = async (req, res) => {
    try {
        const result = await Province.findAll()
        res.status(200).send({ result })

    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message })
    }
}