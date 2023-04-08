import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useAppDispatch } from "../../utils/hooks/hooks";
import { authenticateUser, Credentials } from "../../store/auth/authSlice";

const LoginPage = () => {
	const dispatch = useAppDispatch();

	const [credentials, setCredentials] = useState<Credentials>({
		email: "",
		password: "",
	});

	const onChange = <K extends keyof Credentials>(
		key: K,
		value: Credentials[K]
	) => {
		setCredentials({ ...credentials, [key]: value });
	};

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		dispatch(authenticateUser(credentials));
	};

	return (
		<Container className={styles.container} style={{ maxWidth: "1000px" }}>
			<Form>
				<Form.Group className="mb-3">
					<Form.Label>Email Address</Form.Label>
					<Form.Control
						type="email"
						placeholder="Enter your email"
						name="email"
						onChange={(e) => {
							onChange(e.target.name as keyof Credentials, e.target.value);
						}}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						onChange={(e) => {
							onChange(e.target.name as keyof Credentials, e.target.value);
						}}
					/>
				</Form.Group>
			</Form>

			<Button
				variant="primary"
				className="mb-3"
				type="submit"
				onClick={onSubmit}>
				Login
			</Button>

			<div>Email: {credentials.email}</div>

			<div>Password: {credentials.password}</div>
		</Container>
	);
};

export default LoginPage;

const styles = {
	container: "d-flex flex-column align-items-center mt-5 card rounded p-3",
};
