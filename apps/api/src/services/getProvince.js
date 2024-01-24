
// process.env.RAJAONGKIR_APIKEY
const BASE_URL = 'https://api.rajaongkir.com/starter';

const getProvinces = async () => {
    try {
        const response = await fetch(`${BASE_URL}/province`, {
            method: 'GET',
            headers: {
                key: '0c58a715f1b3a17869e83526f5e20139'
            }
        })
        console.log(response.results);
        const data = await response.json();
        // console.log(data);
        return data
    } catch (error) {
        console.error('Error fetching provinces', error);
        throw new Error('Failed to fetch provinces')
    }
}

module.exports = getProvinces;
