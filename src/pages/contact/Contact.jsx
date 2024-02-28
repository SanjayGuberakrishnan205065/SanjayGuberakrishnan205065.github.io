import { Typography } from "@material-tailwind/react";

const Contact = () => {
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">Contact Us</Typography>
      <div className="flex justify-evenly my-3 text-center flex-col md:flex-row gap-3">
        <div>
          <Typography variant="h3" className="text-center">
            ITA Chairman
          </Typography>
          <p>Contact for general queries</p>
          <Typography variant="h6" className="text-center">
            Madeshwaran K
          </Typography>
          <Typography variant="paragraph" className="text-center">
            Mobile: +91 7868008688
          </Typography>
        </div>
        <div>
          <Typography variant="h3" className="text-center">
            Events Head
          </Typography>
          <p>Contact for event queries</p>
          <Typography variant="h6" className="text-center">
            Shriya S
          </Typography>
          <Typography variant="paragraph" className="text-center">
            Mobile: +91 9361789362
          </Typography>
        </div>
      </div>
      <div className="flex justify-evenly text-center flex-col md:flex-row gap-3 my-5">
        <div>
          <Typography variant="h3" className="text-center">
            Website
          </Typography>
          <p>Contact For website queries</p>
          <Typography variant="h6" className="text-center">
            Pragadesh BS
          </Typography>
          <Typography variant="paragraph" className="text-center">
            Mobile: +91 9443389893
          </Typography>
        </div>
        <div>
          <Typography variant="h3" className="text-center">
            Payments
          </Typography>
          <p>Contact for payment queries</p>
          <Typography variant="h6" className="text-center">
            Pradesh GV
          </Typography>
          <Typography variant="paragraph" className="text-center">
            Mobile: +91 8838644172
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default Contact;
