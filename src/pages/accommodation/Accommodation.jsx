import { Typography } from "@material-tailwind/react";
import AccommodationCard from "./components/AccommodationCard";
import CheckoutPopup from "../buy-tickets/components/CheckoutPopup";

const Accommodation = () => {
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">Accommodation</Typography>
      <div className="my-3 text-xl">
        <div className="my-3">
          Accommodation is available to the participants in MIT Hostel for a fee
          of ₹400 for 24 hours.
        </div>
        <div className="my-3">
          The accomodation fee includes breakfast, lunch and dinner.
        </div>
        <div className="my-3">Accommodation available within MIT Premises.</div>
      </div>
      <div className="my-3">
        <Typography variant="h3">Accommodation Tickets</Typography>
        <div className="flex flex-col md:flex-row gap-5 justify-evenly">
          <AccommodationCard
            title={"Accommodation"}
            price={400}
            checkoutId="accomodation_24hrs"
            description="Upto 24 hrs Stay"
          />
          <AccommodationCard
            title={"Accommodation"}
            price={800}
            checkoutId="accomodation_48hrs"
            description="Upto 48 hrs Stay"
          />
        </div>
      </div>
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
