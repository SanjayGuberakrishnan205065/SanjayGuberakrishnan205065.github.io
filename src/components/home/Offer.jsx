import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const Offer = () => {
  return (
    <div className="flex mx-3 md:mx-auto md:max-w-fit py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 rounded-2xl p-5">
      <Typography
        className="text-2xl md:text-3xl text-center font-bold "
        color="white"
      >
        Get a referral to avail upto ₹100 OFF!
      </Typography>
      <Typography
        color="white"
        className="md:w-7/12 text-center my-3 !text-base"
      >
        Don&apos;t miss out on this exclusive offer that will end soon.
      </Typography>
      <div className="text-center my-1">
        <Link to="/buy-tickets">
          <Button
            className="rounded-full"
            size="lg"
            variant="gradient"
            color="deep-purple"
          >
            buy ticket
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Offer;
