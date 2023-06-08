import React, { useState } from "react";
import {
	Button,
	Container,
	FloatingLabel,
	Form,
	Spinner,
} from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/hooks";
import { authenticateUser, Credentials } from "../../store/auth/authSlice";
import backgroundImage from "../../utils/images/login_background_image.png";
import "./styles.css";

const LoginPage = () => {
	const dispatch = useAppDispatch();
	const isLoading: boolean = useAppSelector((state) => state.auth.loading);
	const authError: string | null | undefined = useAppSelector(
		(state) => state.auth.error
	);

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
		<div className="main">
			<div className="background-left">
				<img src={backgroundImage} />
			</div>

			<div className="background-right">
				<Container className="login-box">
					<div className="login-text-input">
						<input
							type="email"
							name="email"
							onChange={(e) => {
								onChange(e.target.name as keyof Credentials, e.target.value);
							}}
							required
						/>
						<label htmlFor="email">EMAIL</label>
					</div>

					<div className="login-text-input mt-4">
						<input
							type="password"
							name="password"
							onChange={(e) => {
								onChange(e.target.name as keyof Credentials, e.target.value);
							}}
							required
						/>
						<label htmlFor="email">PASSWORD</label>
					</div>

					<Button
						variant="primary"
						className="signin-button mt-3"
						type="submit"
						onClick={onSubmit}>
						{isLoading ? <Spinner animation="border" /> : "Sign in"}
					</Button>

					{!!authError && authError === "Login error" && (
						<div className="text-danger">
							Sorry, your email or password is incorrect
						</div>
					)}
				</Container>
			</div>
		</div>
	);
};

export default LoginPage;
