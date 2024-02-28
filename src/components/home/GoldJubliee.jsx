import { Typography } from "@material-tailwind/react";

const GoldJubliee = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center p-4 my-5">
      <div>
        <img
          src="/images/goldenJub.png"
          alt="golden jubliee Logo"
          className="w-48"
        />
      </div>
      <div>
        <div className="text-center">
          <Typography variant="h4" className="text-center">
            Three-quarters of a century, countless stories of success
          </Typography>
        </div>
        <div className="text-center">
          <Typography>
            Honoring the past, embracing the future—celebrating 75 years of
            MIT's triumphs.
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default GoldJubliee;
