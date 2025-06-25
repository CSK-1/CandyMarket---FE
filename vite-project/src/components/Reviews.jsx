import { useEffect, useState } from "react";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3000/api/products/${productId}/reviews`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch reviews");
        setReviews(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h4>Reviews:</h4>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id}>
              <strong>{review.username || "Anonymous"}</strong>: {review.comment}
              <span><strong>  Rating:</strong> {review.rating}/10</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default Reviews;