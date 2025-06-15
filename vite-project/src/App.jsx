import { useState } from "react";
import Home from "./components/Home";

function App() {
	const [token, setToken] = useState();

	let navBar = <Link to="/login">Log In</Link>;

	if (!!token) {
		navBar = <Link to="/account">Account</Link>;
	}

	return (
		<>
			<Home />
			<nav style={{ display: "flex", justifyContent: "space-between" }}>
				<Link to="/">Home</Link>
				{navBar}
			</nav>
			<Routes>
				<Route path="/login" element={<LogIn setToken={setToken} />} />
			</Routes>
		</>
	);
}

export default App;
