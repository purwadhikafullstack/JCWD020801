import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function AdminErrorPage(){
    return(
        <div className="flex flex-col justify-center items-center h-screen gap-5">
            <div className="w-1/2 items-center">
            <Typography variant="h1">You don't have the right permissions to view this page.</Typography>
            </div>
            <Link to={'/admin-overview'}>
                <Button>Back to dashboard</Button>
            </Link>
        </div>
    )
}