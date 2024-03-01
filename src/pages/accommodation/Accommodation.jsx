import { Typography } from "@material-tailwind/react";
import AccommodationCard from "./components/AccommodationCard";
import CheckoutPopup from "../buy-tickets/components/CheckoutPopup";

const Accommodation = () => {
  return (
    <div className="container mx-auto page-view">
      <Typography variant="h2">Accommodation</Typography>
      <div className="my-3 text-xl">
        <div className="my-3">
          Accommodation is available to the participants in MIT Hostel from a
          starting price of ₹250 for 24 hours.
        </div>
        <div className="my-3">
          Food charge includes breakfast, lunch and dinner.
        </div>
        <div className="my-3">Accommodation available within MIT Premises.</div>
      </div>
      <div className="my-3">
        <Typography variant="h3">Accommodation Tickets</Typography>
        <div className="flex flex-col md:flex-row gap-5 justify-evenly">
          <AccommodationCard
            title={"Accommodation 24hrs (No Food)"}
            price={250}
            checkoutId="accommodation_24hrs_no_food"
            description="Upto 24 hrs Stay. Food NOT included"
          />
          <AccommodationCard
            title={"Accommodation 48hrs (No Food)"}
            price={500}
            checkoutId="accommodation_48hrs_no_food"
            description="Upto 48 hrs Stay. Food NOT included"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-evenly">
          <AccommodationCard
            title={"Accommodation 24hrs (With Food)"}
            price={400}
            checkoutId="accommodation_24hrs"
            description="Upto 24 hrs Stay. Food included"
          />
          <AccommodationCard
            title={"Accommodation 48hrs (With Food)"}
            price={800}
            checkoutId="accommodation_48hrs"
            description="Upto 48 hrs Stay. Food included"
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
