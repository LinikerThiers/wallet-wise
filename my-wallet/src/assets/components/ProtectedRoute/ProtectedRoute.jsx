import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('user');
    const hasResetPasswordData = !!localStorage.getItem('resetPasswordData');
    
    return (isAuthenticated && hasResetPasswordData) ? children : <Navigate to="/" />;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
