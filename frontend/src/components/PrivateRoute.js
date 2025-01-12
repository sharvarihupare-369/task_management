import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  return (
    <>
      {token ? (
        children
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoute;
