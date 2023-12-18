import { Navigate, Outlet } from "react-router-dom";

function Required() {
    const token = localStorage.getItem("token");
    return (
        <>
            {
                token ? <Outlet></Outlet> : <Navigate to='/home' />
            }
        </>
    )
}

export default Required;