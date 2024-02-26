import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import DoneIcon from "@mui/icons-material/Done";
import { useEffect, useState } from "react";
import {
  useCartContext,
  useCartDispatch,
} from "../../../../contexts/CartContext";

function WorkshopCard({ title, price, description, checkoutId }) {
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
    <Card className="mt-6 w-96 pricing-card">
      <CardBody className="rounded-lg rounded-b-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="mb-4 h-12 w-12 text-gray-900"
        >
          <path
            fillRule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clipRule="evenodd"
          />
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
        </svg>
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
          onClick={handleAddToCart}
        >
          {selected ? (
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
}

export default WorkshopCard;
