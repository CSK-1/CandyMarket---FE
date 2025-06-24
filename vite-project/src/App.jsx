import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home.jsx";
import LogIn from "./components/LogIn.jsx";
import Register from "./components/Register.jsx";
import "./index.css";
import ProductDetails from "./components/ProductDetails.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  let navBar = <Link to="/login">Log In</Link>;

  if (!!token) {
    navBar = <Link to="/account">Account</Link>;
  }

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
		<Route path="/products/:id" element={<ProductDetails token={token} />} />
      </Routes>
    </>
  );
}

export default App;
