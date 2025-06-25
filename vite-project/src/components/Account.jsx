import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
      <h1>Accounts</h1>
      <div className="order">

        {
          <div key={order.id}>
            <h2>{order.id}</h2>
            <h2>{order.note}</h2>
            <h2>{order.date}</h2>
          </div>
        }
      </div>
    </>
  );
}

export default Account;
