import { Typography } from "@material-tailwind/react";

const ErrorPage = () => {
  return (
    <div className="page-view container mx-auto">
      <Typography variant="h1">Something went wrong</Typography>
      <Typography variant="h6">
        Please try again later or contact us if the problem persists.
      </Typography>
    </div>
  );
};

export default ErrorPage;
