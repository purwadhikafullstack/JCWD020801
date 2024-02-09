export const fetchAddressFromCoordinates = async (lat, lng) => {
    const apiKey = 'AIzaSyCClwQuelemPWnx5zJNjfbARhwvjg0XsxA';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&callback=Function.prototype`;

    try {
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json();
            const formattedAddress = data.results[0].formatted_address;
            // console.log(formattedAddress);
            return formattedAddress;
        } else {
            console.error('Failed to fetch address:', response.statusText);
            return null
        }

    } catch (error) {
        console.error('Error fetching data address:', error);
        return null
    }

}
