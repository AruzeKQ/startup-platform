import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../contexts/authContext";

export function PrivateRoute() {
    const { token } = useContext(userContext);

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export function PublicRoute() {
    const { token } = useContext(userContext);
    if (token) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}