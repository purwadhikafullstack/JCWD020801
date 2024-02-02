
// process.env.RAJAONGKIR_APIKEY
const BASE_URL = 'https://api.rajaongkir.com/starter';

const getCities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/city`, {
            method: 'GET',
            headers: {
                key: '0c58a715f1b3a17869e83526f5e20139'
            }
        })
        const data = await response.json();
        console.log(data);
        return data

    } catch (error) {
        console.error('Error fetching cities', error);
        throw new Error('Failed to fetch cities')
    }
}

module.exports = getCities;
