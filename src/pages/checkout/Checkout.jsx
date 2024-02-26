import { Typography } from "@material-tailwind/react";
import { useCartContext } from "../../contexts/CartContext";
import CheckoutTable from "./components/CheckoutTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { checkoutIdsInCart } = useCartContext();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (checkoutIdsInCart.length === 0) {
      navigate("/buy-tickets");
    }

    axios.get("/api/tickets").then((response) => {
      const tickets = response.data;
      const ticketsToPurchase = checkoutIdsInCart.map((checkoutId) => {
        const ticket = tickets.find(
          (ticket) => ticket.checkoutId === checkoutId
        );
        return ticket;
      });
      setCartItems(ticketsToPurchase);
      const total = ticketsToPurchase.reduce((acc, cartItem) => {
        return acc + parseFloat(cartItem.ticketPrice["$numberDecimal"]);
      }, 0);
      setTotal(total);
    });
  }, [checkoutIdsInCart]);
  return (
    <div className="page-view container mx-auto">
      <Typography variant="h1">Checkout</Typography>
      <div>
        <Typography variant="h6" className="my-3 font-normal">
          Please review your order before proceeding to payment.
        </Typography>
        <CheckoutTable cartItems={cartItems} />
        <Typography variant="h2" className="text-right my-5">
          Total: ₹{total}
        </Typography>
      </div>
    </div>
  );
};
export default Checkout;
