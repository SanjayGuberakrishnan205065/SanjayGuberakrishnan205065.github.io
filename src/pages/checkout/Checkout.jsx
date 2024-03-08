import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import { useCartContext, useCartDispatch } from "../../contexts/CartContext";
import CheckoutTable from "./components/CheckoutTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentModal from "./components/PaymentModal";
import toast from "react-hot-toast";
import { useAuthContext } from "../../hooks/useAuthContext";

const Checkout = () => {
  const { token } = useAuthContext();
  const [referralCode, setReferralCode] = useState("");
  const { checkoutIdsInCart } = useCartContext();
  const cartDispatch = useCartDispatch();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [containsAccommodationTicket, setContainsAccommodationTicket] =
    useState(false);
  const navigate = useNavigate();

  const handleClearCart = () => {
    cartDispatch({
      type: "SET_CHECKOUT_IDS_IN_CART",
      payload: { checkoutIdsInCart: [] },
    });
  };

  useEffect(() => {
    if (checkoutIdsInCart.length === 0) {
      navigate("/buy-tickets");
    }

    axios.get("/api/tickets").then((response) => {
      const tickets = response.data;
      const ticketsToPurchase = checkoutIdsInCart.map((checkoutId) => {
        const ticket = tickets.find((ticket) => {
          if (
            ticket.type === "accommodation" &&
            ticket.checkoutId === checkoutId
          ) {
            setContainsAccommodationTicket(true);
          }
          return ticket.checkoutId === checkoutId;
        });
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
      return;
    }
    const loadingToast = toast.loading("Creating transaction...");
    axios
      .post(
        "/api/transactions",
        {
          upiTransactionId,
          checkoutIds: checkoutIdsInCart,
          referralCode,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        toast.dismiss(loadingToast);
        toast.success("Transaction created successfully!");
        cartDispatch({
          type: "SET_CHECKOUT_IDS_IN_CART",
          payload: { checkoutIdsInCart: [] },
        });
        navigate("/my-transactions");
      })
      .catch((err) => {
        toast.dismiss(loadingToast);
        toast.error(err.response.data.message);
      });
  };

  const handleCheckout = () => {
    setOpenPaymentModal(true);
  };

  return (
    <div className="page-view container mx-auto">
      <Typography variant="h1">Checkout</Typography>
      <div>
        <Alert variant="gradient" color="deep-purple" className="my-3">
          <div>
            Referral codes can be used only for transactions without
            accommodation tickets.
            <br />
            If you want to purchase accommodation tickets, please make a
            separate transaction.
          </div>
        </Alert>
        <Typography variant="h6" className="my-3 font-normal">
          Please review your order before proceeding to payment.
        </Typography>
        <Button
          color="pink"
          variant="gradient"
          className="my-3"
          size="sm"
          onClick={handleClearCart}
        >
          Clear Cart
        </Button>
        <CheckoutTable cartItems={cartItems} />
        <Typography variant="h2" className="text-right my-5">
          Total: ₹{total}
        </Typography>
      </div>
      <div className="mt-3 mb-5 w-full lg:w-96">
        <Input
          type="text"
          color={containsAccommodationTicket ? "black" : "white"}
          label={
            containsAccommodationTicket
              ? "Referral code cannot be used with accommodation"
              : "Referral code (optional)"
          }
          placeholder="Enter referral code"
          value={referralCode}
          disabled={containsAccommodationTicket}
          onChange={(e) => setReferralCode(e.target.value)}
        />
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
          setAmount={setTotal}
          handlePayment={handlePayment}
          referralCode={referralCode}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
};
export default Checkout;
