import { Typography } from "@material-tailwind/react";

const Contact = () => {
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">Contact Us</Typography>
      <div className="flex justify-evenly my-3 text-center flex-col md:flex-row gap-3">
        <div>
          <Typography variant="h3">ITA Chairman</Typography>
          <Typography variant="h6">Madeshwaran K</Typography>
          <Typography variant="paragraph">Mobile: +91 7868008688</Typography>
        </div>
        <div>
          <Typography variant="h3">Events Head</Typography>
          <Typography variant="h6">Shriya S</Typography>
          <Typography variant="paragraph">Mobile: +91 93617789362</Typography>
        </div>
      </div>
      <div className="flex justify-evenly text-center flex-col md:flex-row gap-3 my-5">
        <div>
          <Typography variant="h3">Website</Typography>
          <p>For website related queries please contact:</p>
          <Typography variant="h6">Pragadesh BS</Typography>
          <Typography variant="paragraph">Mobile: +91 9443389893</Typography>
        </div>
        <div>
          <Typography variant="h3">Payments</Typography>
          <p>For payment related queries please contact:</p>
          <Typography variant="h6">Pradesh GV</Typography>
          <Typography variant="paragraph">Mobile: +91 8838644172</Typography>
        </div>
      </div>
    </div>
  );
};
export default Contact;
