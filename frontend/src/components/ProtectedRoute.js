import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  element: Component,
  isLoggedIn,
  ...props
}) => {
  if (isLoggedIn === null) return null;
  
  return isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;