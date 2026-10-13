import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../contexts/authContext";

export default function PublicRoute() {
    const { token } = useContext(userContext);
    if (token) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}