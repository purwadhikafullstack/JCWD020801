export const updateURL = (navigate, currentPage, sortBy, sortOrder, debouncedSearchValue) => {
    const params = new URLSearchParams();
    params.set('page', currentPage);
    params.set('sortBy', sortBy.toLowerCase());
    params.set('sortOrder', sortOrder);
    params.set('search', debouncedSearchValue);
   
    navigate(`?${params.toString()}`);
};

export const roleCheck = (navigate, isSuperAdmin) => {
    if (isSuperAdmin === false) {
        navigate('/error')
    }
}

// This is for filtering, required in every page that needs filtering
// Required for table header handleReset, searchValue, setSearchValue
// const [searchValue, setSearchValue] = useState('');
// const [sortOrder, setSortOrder] = useState('asc')
// const [orderChange, setOrderChange] = useState(false)
// const [sortBy, setSortBy] = useState('createdAt');

export const handleSortBy = (columnName, setSortBy, orderChange, setSortOrder, setOrderChange) => {
    if (columnName !== 'Action') {
        if(columnName === 'Product Name'){
            setSortBy('ProductId')
        }else if(columnName === 'Branch'){
            setSortBy('BranchId')
        }else if(columnName === 'Min. Purchase'){
            setSortBy('min_purchase_amount')
        }else if(columnName === 'Max. Discount'){
            setSortBy('max_discount')
        }else{
            setSortBy(columnName);
        }
        const sortOrder = orderChange ? 'asc' : 'desc';
        setSortOrder(sortOrder);
        setOrderChange(!orderChange);
    }
};

export const handleReset = (setSortBy, setOrderChange, setSortOrder, setSearchValue) => {
    setSearchValue('');
    setSortOrder('asc');
    setOrderChange(false);
    setSortBy('createdAt');
};