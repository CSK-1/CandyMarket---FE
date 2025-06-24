import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import candyImage from "../assets/CandyImage.png";

const Home = () => {
	const [candy, setCandy] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch(`http://localhost:3000/api/products`);
				const data = await response.json();
				setCandy(data);
			} catch (e) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<>
			<h1>🍭 Home <span className="sweet-text">Sweet</span> Home 🍭</h1>
			<div className="candy-list">
				{candy.map((item) => (
					<div key={item.id || item.title} className="candy-card">
						<h2>{item.title}</h2>
            <img src={candyImage} alt="Candy image" className="candy-icon"/>
						<p>{item.description}</p>
						<h3>${item.price}</h3>
						<Link to={`/products/${item.id}`}>Get Details</Link>
					</div>
				))}
			</div>
		</>
	);
};

export default Home;
