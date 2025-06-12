import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetails = ({ token }) => {
  const navigate = useNavigate();
  const [candy, setCandy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/products/:id`);
        if (!response.ok) {
          throw new Error(`Product not found`);
        }
        const data = await response.json();
        console.log(data);
        setCandy(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);
};
