import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LogIn({ setToken }) {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		try {
			const response = await fetch(`http://localhost:3000/api/users/login`, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify({
					username: username,
					password: password,
				}),
			});
			const result = await response.json();

			if (!response.ok) {
				setError(result.message || "Login failed. Please try again.");
				return;
			}

			setToken(result.token);
			localStorage.setItem("token", result.token);
			navigate("/account");
		} catch (error) {
			console.log(error);
			setError("An unexpected error occurred. Please try again.");
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="login-form">
				<h2>Login</h2>
				<label>
					Username
					<input
						name="username"
						onChange={(event) => setUsername(event.target.value)}
						value={username}
						required
					/>
				</label>
				<label>
					Password
					<input
						name="password"
						onChange={(event) => setPassword(event.target.value)}
						value={password}
						minLength={6}
						required
					/>
				</label>
				<button>Log In</button>
				{error && <p className="error">{error}</p>}
			</form>
			<div className="register">
				<p>
					Don't have an account?{" "}</p>
					<div className="register-button">
						<Link to="/register">Register here</Link>
					</div>
				
			</div>
		</>
	);
}

export default LogIn;
