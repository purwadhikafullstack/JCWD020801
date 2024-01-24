import ShippingCost from '../models/shippingcost.model'
const axios = require('axios');

export const calculateShippingCost = async (req, res) => {
    try {
        const {
            originCityId,
            destinationCityId,
            weight,
            courier,
        } = req.body

        const response = await axios.post(
            'https://api.rajaongkir.com/starter/cost',
            {
                origin: originCityId,
                destination: destinationCityId,
                weight: weight,
                courier: courier,
            },
            {
                headers: {
                    key: '0c58a715f1b3a17869e83526f5e20139'
                },
            }
        );

        const shippingcost = response.data.rajaongkir.results;
        res.status(200).send({ shippingcost })

    } catch (error) {
        console.error(error);
        res.status(error.response?.status || 500).send({
            message: error.response?.data?.rajaongkir?.status?.description || 'Failed to calculate shipping cost',
        });
    }
}