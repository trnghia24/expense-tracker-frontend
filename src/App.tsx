import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/DashboardPage/Dashboard";
import LoginPage from "./components/LoginPage/LoginPage";
import { useAppDispatch } from "./utils/hooks/hooks";
import PrivateRoute from "./utils/PrivateRoute";
import { useSavedState } from "./utils/hooks/useSavedState";
import { setSuccessfulAuthentication } from "./store/auth/authSlice";
import MyNavBar from "./components/MyNavBar";

function App() {
	const dispatch = useAppDispatch();
	const [token, setToken] = useSavedState("", "token");
	const [firstName, setFirstName] = useSavedState("", "firstName");
	const [lastName, setLastName] = useSavedState("", "lastName");

	useEffect(() => {
		token &&
			firstName &&
			lastName &&
			dispatch(setSuccessfulAuthentication({ firstName, lastName, token }));
	}, [dispatch]);

	return (
		<div>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route
					path="/dashboard"
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
