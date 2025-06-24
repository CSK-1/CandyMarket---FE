import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({setToken}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();   

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://localhost:3000/api/users/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				setError(data.message || "Registration failed");
				return;
			}

			localStorage.setItem("token", data.token);
             if (setToken) setToken(data.token);
			navigate("/"); 
		} catch (err) {
			setError("Something went wrong. Please try again.");
		}
	};

	return (
		<div className="form-container">
			<h2>Create Account</h2>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password (min 6 characters)"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{error && <p className="error">{error}</p>}
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default Register;