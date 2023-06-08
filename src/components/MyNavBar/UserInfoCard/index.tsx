import React, { useEffect } from "react";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useAppSelector } from "../../../utils/hooks/hooks";
import { AuthState } from "../../../store/auth/authSlice";
import { Button } from "react-bootstrap";

const UserInfoCard = () => {
	const loginInfo: AuthState = useAppSelector((state) => state.auth);

	const logOut: () => void = () => {
		localStorage.clear();
	};

	if (loginInfo.isLoggedIn) {
		return (
			<NavDropdown
				title={`${loginInfo.userInfo.firstName} ${loginInfo.userInfo.lastName}`}>
				<NavDropdown.Item>Settings</NavDropdown.Item>
				<NavDropdown.Item href="/" onClick={logOut}>
					Log Out
				</NavDropdown.Item>
			</NavDropdown>
		);
	} else {
		return <Nav.Link>Sign Up</Nav.Link>;
	}
};

export default UserInfoCard;
