import React from 'react';
import { Navigate } from 'react-router';
import { useSelector} from 'react-redux';
function ProtectedRoute({ children }) {
    const { isAuthenticated } = useSelector((state) => state.auth);
    if (!isAuthenticated) {
        console.log(isAuthenticated);
        return <Navigate to={'/login'} />
    }
    return children;
}
export default ProtectedRoute;