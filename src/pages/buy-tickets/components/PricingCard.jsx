import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useCartContext, useCartDispatch } from "../../../contexts/CartContext";
import { useEffect, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";

const PricingCard = ({
  title,
  price,
  cardBody,
  savings,
  startingFrom,
  handleCardAction,
  checkoutId,
}) => {
  const { checkoutIdsInCart } = useCartContext();
  const cartDispatch = useCartDispatch();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  useEffect(() => {
    if (checkoutIdsInCart.includes(checkoutId)) {
      setIsAddedToCart(true);
    } else {
      setIsAddedToCart(false);
    }
  }, [checkoutIdsInCart, checkoutId]);
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
    <Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
      >
        <Typography
          variant="small"
          color="white"
          className="font-normal uppercase"
        >
          {title}
        </Typography>
        {startingFrom && (
          <Typography className="font-normal text-primaryLighter my-3">
            Starting from
          </Typography>
        )}
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center gap-1 text-7xl font-normal"
        >
          <span className="mt-2 text-4xl">₹</span>
          {price}
        </Typography>
        {savings && (
          <Typography
            variant="small"
            className="font-normal uppercase text-primaryLighter"
          >
            Save {savings}%
          </Typography>
        )}
      </CardHeader>
      {cardBody}
      <CardFooter className="mt-12 p-0">
        <Button
          size="lg"
          color={
            startingFrom ? "purple" : isAddedToCart ? "deep-purple" : "white"
          }
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          variant="gradient"
          ripple={true}
          fullWidth={true}
          onClick={startingFrom ? handleCardAction : handleAddToCart}
        >
          {startingFrom ? (
            "Browse Passes"
          ) : isAddedToCart ? (
            <div className="flex items-center">
              <DoneIcon />
              <div className="ml-2">Added to cart</div>
            </div>
          ) : (
            "Add to cart"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
