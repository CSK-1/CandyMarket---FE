import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Account({ token, setToken }) {
  const [error, setError] = useState("");
  const [order, setOrder] = useState([]);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/me`);
                const data = await response.json();
                setOrder(data);
            } catch (e) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, []);


  return (
    <>
      <h1>Accounts</h1>
			<div className="order">
				{order.map((orders) => (
					<div key={orders.id || orders.title}>
						<h2>{orders.note}</h2>
					</div>
				))}
			</div>
    </>
  );
}

export default Account;
