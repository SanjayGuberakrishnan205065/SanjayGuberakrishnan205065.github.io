import {
  Card,
  CardHeader,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const PricingCard = ({ title, price, cardBody, savings }) => {
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
          color="deep-purple"
          className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
          variant="gradient"
          ripple={true}
          fullWidth={true}
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
