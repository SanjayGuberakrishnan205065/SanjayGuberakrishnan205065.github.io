import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import { useCartContext, useCartDispatch } from "../../../contexts/CartContext";
import HotelIcon from "@mui/icons-material/Hotel";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function AccommodationCard({ title, price, description, checkoutId }) {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { checkoutIdsInCart } = useCartContext();
  const cartDispatch = useCartDispatch();
  const [selected, setSelected] = useState(false);
  useEffect(() => {
    if (checkoutIdsInCart.includes(checkoutId)) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [checkoutIdsInCart]);

  const handleAddToCart = () => {
    if (checkoutIdsInCart.includes(checkoutId)) {
      cartDispatch({
        type: "REMOVE_CHECKOUT_ID_FROM_CART",
        payload: { checkoutId },
      });
      return;
    }
    cartDispatch({
      type: "ADD_CHECKOUT_ID_TO_CART",
      payload: { checkoutId },
    });
  };
  return (
    <Card className="mt-6 w-80 lg:w-96 accommodation-card">
      <CardBody className="rounded-lg rounded-b-none">
        <HotelIcon className="text-white" />
        <Typography variant="h5" color="white" className="mb-2">
          {title}
        </Typography>
        <Typography className="text-gray-200">{description}</Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center items-center gap-1 text-5xl font-normal"
        >
          <span className="mt-2 text-xl">₹</span>
          {price}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0 text-center rounded-b-lg">
        <Button
          variant="gradient"
          color={selected ? "deep-purple" : "white"}
          className={`${selected ? "active-btn" : "bg-white"}`}
          onClick={
            user
              ? handleAddToCart
              : () => {
                  navigate("/login");
                }
          }
        >
          {selected ? (
            <div className="flex items-center">
              <DoneIcon />
              <div className="ml-2">Added to cart</div>
            </div>
          ) : user ? (
            "Add to cart"
          ) : (
            "Login to purchase"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AccommodationCard;
