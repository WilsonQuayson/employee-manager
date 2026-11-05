import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../hooks/useAuth";

const ProtectedRoute = () => {
    const { data: user, isPending, isError } = useCurrentUser();
    const location = useLocation();

    if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    if (isError) {
    return <div className="flex min-h-screen items-center justify-center">Unable to verify your session. Please try again.</div>;
    }

    if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
