import React from "react";
import { Navigate } from "react-router-dom";
import { useSavedState } from "./hooks/useSavedState";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const [token, setToken] = useSavedState("", "token");
	return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
