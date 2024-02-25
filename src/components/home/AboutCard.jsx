import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

function AboutCard({
  title,
  description,
  subTitle,
  href,
  gridAreaName,
  comingSoon,
}) {
  return (
    <Card shadow={false} className={`${gridAreaName} rounded-3xl h-full`}>
      <CardBody className="rounded-2xl bg-gray-900 h-full">
        <div className="py-2 px-1 flex flex-col justify-center items-center bg-gray-900/90">
          <Typography variant="h6" className="mb-4 text-center" color="white">
            {subTitle}
          </Typography>
          <Typography variant="h4" className="text-center" color="white">
            {title}
          </Typography>
          <Typography
            color="white"
            className="mt-2 mb-10 text-base w-full lg:w-8/12 text-center font-normal"
          >
            {description}
          </Typography>
          {comingSoon ? (
            <Button disabled className="bg-primaryLight text-white" size="sm">
              Coming soon
            </Button>
          ) : (
            <Link to={href}>
              <Button
                className="bg-primaryLight hover:bg-primaryDark text-white"
                size="sm"
              >
                View details
              </Button>
            </Link>
          )}
        </div>
      </CardBody>
    </Card>
  );
}

export default AboutCard;
