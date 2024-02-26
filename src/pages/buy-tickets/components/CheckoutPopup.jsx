import { DoubleArrowOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../../contexts/CartContext";
import { useEffect, useState } from "react";
import { Alert } from "@material-tailwind/react";

const CheckoutPopup = () => {
  const { checkoutIdsInCart } = useCartContext();
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkoutIdsInCart.length > 0) {
      setAlertOpen(true);
    } else {
      setAlertOpen(false);
    }
  }, [checkoutIdsInCart]);

  return (
    <Alert
      open={alertOpen}
      style={{
        position: "fixed",
        bottom: 20,
        left: "50%",
        translateX: "-50%",
      }}
      className="w-8/12 md:w-3/12 2xl:w-2/12 flex checkout-alert"
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      <button onClick={() => navigate("/checkout")}>
        Proceed to checkout <DoubleArrowOutlined />
      </button>
    </Alert>
  );
};
export default CheckoutPopup;
