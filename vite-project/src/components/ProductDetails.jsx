import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import candyImage from "../assets/CandyImage.png";

const ProductDetails = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [error, setError] = useState("");
	const [rating, setRating] = useState(null);
	const [comment, setComment] = useState(null);

	const token = localStorage.getItem("token");

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const res = await fetch(`http://localhost:3000/api/products/${id}`);
				const data = await res.json();
				console.log("API response:", data);
				if (!res.ok) throw new Error(data.error || "Failed to fetch");
				setProduct(data);
			} catch (err) {
				setError(err.message);
			}
		};
		fetchProduct();
	}, [id]);

	if (error) return <p>{error}</p>;
	if (!product) return <p>Loading...</p>;

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const res = await fetch(`http://localhost:3000/api/reviews`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ rating, comment, productId: id }),
			});

			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to submit review");

			setProduct((prev) => ({
				...prev,
				reviews: [...prev.reviews, data],
			}));

			setRating("");
			setComment("");
		} catch (err) {
			setError(err.message);
		}
	};

	let reviewForm = <p>Log in to write a review.</p>;

	if (!!token) {
		reviewForm = (
			<form onSubmit={handleSubmit} className="review-form">
				<label>
					Rating (out of 10)
					<input
						name="rating"
						type="number"
						min="1"
						max="10"
						onChange={(e) => setRating(e.target.value)}
						value={rating || ""}
						required
					/>
				</label>
				<label>
					Comment
					<input
						name="comment"
						onChange={(e) => setComment(e.target.value)}
						value={comment || ""}
						required
					/>
				</label>
				<button type="submit">Submit Review</button>
				{error && <p className="error">{error}</p>}
			</form>
		);
	}

	return (
		<div className="candy-list">
			<div className="candy-details">
				<h2>{product.title}</h2>
				<img src={candyImage} alt="Candy image" className="candy-icon" />
				<p>{product.description}</p>
				<h3>${product.price}</h3>

				<h4>Reviews:</h4>
				{product.reviews && product.reviews.length > 0 ? (
					<ul>
						{product.reviews.map((review) => (
							<li key={review.id}>
								<strong>{review.username}</strong>: {review.comment}
							</li>
						))}
					</ul>
				) : (
					<p>No reviews yet.</p>
				)}
				<h4>Write a Review:</h4>
				{reviewForm}
			</div>
		</div>
	);
};

export default ProductDetails;
