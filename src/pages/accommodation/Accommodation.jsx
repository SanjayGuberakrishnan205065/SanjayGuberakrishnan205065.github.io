import { Alert, Typography } from "@material-tailwind/react";
import AccommodationCard from "./components/AccommodationCard";
import CheckoutPopup from "../buy-tickets/components/CheckoutPopup";

const Accommodation = () => {
  return (
    <div className="container mx-auto page-view">
      <Typography variant="h2">Accommodation</Typography>
      <Alert color="red" className="my-5">
        Accommodation tickets are no longer available
      </Alert>
      <div className="my-5 text-center">
        <p>For accommodation related queries, please contact:</p>
        <Typography variant="h6">Surendra</Typography>
        <Typography variant="paragraph">Mobile: +91 6369413619</Typography>
      </div>
      <CheckoutPopup />
    </div>
  );
};
export default Accommodation;
