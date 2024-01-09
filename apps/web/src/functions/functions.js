export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export const formatDate2 = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

export const truncateString = (str, limit) => {
    if (str.length <= limit) {
        return str
    } else {
        return str.substring(0, limit) + "...";
    }
}

export const convertToIDR = (price) => {
    const priceStr = price.toString().split('');

    for (let i = priceStr.length - 3; i > 0; i -= 3) {
        priceStr.splice(i, 0, '.');
    }
    const formattedPrice = priceStr.join('');
    return formattedPrice;
}

export const formatDistance = (distance) => {
    if (distance < 1000) {
        return `${Math.round(distance)} m`;
    } else if (distance >= 1000 && distance < 25000) {
        return `${(distance / 1000).toFixed(1)} km`;
    } else {
        return `25+ km`;
    }
}