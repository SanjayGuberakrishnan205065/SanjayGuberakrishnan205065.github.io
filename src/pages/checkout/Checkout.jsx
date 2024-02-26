import { Button, Typography } from "@material-tailwind/react";
import { useCartContext } from "../../contexts/CartContext";
import CheckoutTable from "./components/CheckoutTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./components/PaymentModal";
import toast from "react-hot-toast";

const Checkout = () => {
  const { checkoutIdsInCart } = useCartContext();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
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

  const handlePayment = (upiTransactionId) => {
    if (!upiTransactionId || upiTransactionId.length !== 12) {
      toast.error("Enter a valid 12 digit UPI transaction ID");
    }
    console.log(upiTransactionId, checkoutIdsInCart);
  };

  const handleCheckout = () => {
    console.log(checkoutIdsInCart);
    setOpenPaymentModal(true);
  };

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
      <div className="text-center">
        <Button
          variant="gradient"
          color="deep-purple"
          size="lg"
          className="rounded-full"
          onClick={handleCheckout}
        >
          Pay Now
        </Button>
        <PaymentModal
          isOpen={openPaymentModal}
          close={() => {
            setOpenPaymentModal(false);
          }}
          amount={total}
          handlePayment={handlePayment}
        />
      </div>
    </div>
  );
};
export default Checkout;
