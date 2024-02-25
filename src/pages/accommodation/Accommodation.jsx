import { Typography } from "@material-tailwind/react";

const Accommodation = () => {
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">Accommodation</Typography>
      <div className="my-3">
        Accommodation is available to the participants in MIT Hostel for a fee
        of ₹400 for 24 hours. The accomodation fee includes breakfast, lunch and
        dinner.
      </div>
      <div className="my-5 text-center">
        <p>For accommodation related queries, please contact:</p>
        <Typography variant="h6">Surendra</Typography>
        <Typography variant="paragraph">Mobile: +91 6369413619</Typography>
      </div>
    </div>
  );
};
export default Accommodation;
