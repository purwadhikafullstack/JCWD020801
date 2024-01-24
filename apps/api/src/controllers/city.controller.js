import City from '../models/city.model'
import getCities from '../services/getCity'

export const fetchAndPostCities = async (req, res) => {
    try {
        const citiesData = await getCities();
        const formattedCities = citiesData.rajaongkir.results.map((city) => ({
            city_id: city.city_id,
            city: city.city_name,
            province_id: city.province_id,
            type: city.type,
            postal_code: city.postal_code
        }))

        const result = await City.bulkCreate(formattedCities);

        res.status(200).send({ message: "Cities data posted successfully", result: result })
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message })
    }
}

export const getAllCities = async (req, res) => {
    try {
        const result = await City.findAll()
        res.status(200).send({ result })
    } catch (error) {
        console.error(error);
        res.status(400).send({ message: error.message })

    }
}