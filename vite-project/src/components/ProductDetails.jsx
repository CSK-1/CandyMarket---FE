import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

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

  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>${product.price}</h3>
{/* 
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
      )} */}
      <Reviews productId={id} />

    </div>
  );
};

export default ProductDetails;
