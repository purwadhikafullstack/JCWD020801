import { useEffect, useState } from 'react';

export const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: '', lng: '' },
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
        });
        console.log(location);
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            coordinates: { lat: null, lng: null },
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!('geolocation' in navigator)) {
            onError({
                code: 0,
                message: 'Geolocation not supported',
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};
