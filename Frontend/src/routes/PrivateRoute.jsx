import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../contexts/authContext";

export default function PrivateRoute() {
    const { token } = useContext(userContext);

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}