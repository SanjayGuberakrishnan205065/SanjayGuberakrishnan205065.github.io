import { CardBody, Typography } from "@material-tailwind/react";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

const WorkshopCardBody = () => {
  return (
    <CardBody className="p-0">
      <ul className="flex flex-col gap-4">
        <li className="flex items-center gap-4">
          <span className="rounded-full border border-white/20 bg-white/20 p-1">
            <CheckIcon />
          </span>
          <Typography className="font-normal">
            Workshops by industry experts
          </Typography>
        </li>
        <li className="flex items-center gap-4">
          <span className="rounded-full border border-white/20 bg-white/20 p-1">
            <CheckIcon />
          </span>
          <Typography className="font-normal">Top companies</Typography>
        </li>
        <li className="flex items-center gap-4">
          <span className="rounded-full border border-white/20 bg-white/20 p-1">
            <CheckIcon />
          </span>
          <Typography className="font-normal">
            Savings with combo tickets
          </Typography>
        </li>
      </ul>
    </CardBody>
  );
};
export default WorkshopCardBody;
