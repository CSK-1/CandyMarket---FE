import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";
import candyImage from "../assets/CandyImage.png";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch");
        setProduct(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit review");

      setRating("");
      setComment("");
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div className="candy-list">
      <div className="candy-details">
        <h2>{product.title}</h2>
        <img src={candyImage} alt="Candy image" className="candy-icon" />
        <p>{product.description}</p>
        <h3>${product.price}</h3>

        <h4>Reviews:</h4>
        <Reviews productId={id} />

        <h4>Write a Review:</h4>
        {token ? (
          <form onSubmit={handleSubmit} className="review-form">
            <label>
              Rating (out of 10):
              <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                required
              />
            </label>
            <label>
              Comment:
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </label>
            <button type="submit">Submit Review</button>
          </form>
        ) : (
          <p>Log in to write a review.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;