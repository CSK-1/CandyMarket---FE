import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import candyImage from "../assets/CandyImage.png";

function Account() {
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const [order, setOrder] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUser(data);

        const userResponse = await fetch(
          `http://localhost:3000/api/orders/${data.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = await userResponse.json();
        setOrder(userData);
      } catch (e) {
        setError(error.message);
      }
    };
    fetchOrder();
  }, []);
 console.log(order)
  return (
    <>
      <h1>Orders</h1>
      <div className="candy-list">

        {
          <div key={order.id} className="order-card">
            <h2><strong>Order ID: </strong>{order.id}</h2>
            <img src={candyImage} alt="Candy image" className="candy-icon" />
            <h2><strong>Note: </strong>{order.note}</h2>
            <h2><strong>Date: </strong>{order.date}</h2>
          </div>
        }
      </div>
    </>
  );
}

export default Account;
