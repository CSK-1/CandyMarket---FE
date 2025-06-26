import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import LogIn from "./components/LogIn.jsx";
import Register from "./components/Register.jsx";
import "./index.css";
import ProductDetails from "./components/ProductDetails.jsx";
import Account from "./components/Account.jsx";


function App() {
	const [token, setToken] = useState(localStorage.getItem("token") || null);

	let navBar = token ? (
  <>
    <Link to="/account">Account</Link>
    <button className="nav-button"
      onClick={() => {
        localStorage.removeItem("token");
        setToken(null);
      }}
    >
      Log Out
    </button>
  </>
) : (
  <Link to="/login">Log In</Link>
);

	return (
		<>
			<nav
				style={{
					display: "flex",
					justifyContent: "space-between",
					margin: "10px",
				}}
			>
				<Link to="/">Home</Link>
				{navBar}
			</nav>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<LogIn setToken={setToken} />} />
				<Route path="/register" element={<Register setToken={setToken} />} />
				<Route
					path="/products/:id"
					element={<ProductDetails token={token} />}
				/>
        <Route path="/account" element={<Account token={token} />} />
			</Routes>
		</>
	);
}

export default App;
