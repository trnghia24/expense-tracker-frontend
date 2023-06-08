import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Container } from "react-bootstrap";
import UserInfoCard from "./UserInfoCard";

const MyNavBar = () => {
	return (
		<Navbar bg="dark" variant="dark" className="">
			<Container>
				<Navbar.Brand>Expense Tracker</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/">Home</Nav.Link>
					<Nav.Link href="/dashboard">Dashboard</Nav.Link>
					<Nav.Link>FAQ</Nav.Link>
				</Nav>
				<Nav>
					<UserInfoCard />
				</Nav>
			</Container>
		</Navbar>
	);
};

export default MyNavBar;
