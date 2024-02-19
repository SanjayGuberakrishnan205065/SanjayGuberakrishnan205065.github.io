import { Typography } from "@material-tailwind/react";

const Schedule = () => {
  return (
    <div className="page-view mx-auto container">
      <Typography color="white" variant="h1">
        Schedule
      </Typography>
      <div>
        <Typography color="white" variant="h3">
          Day 1 (16 Mar 2024)
        </Typography>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
          <div className="my-3">
            <Typography color="white" variant="h6">
              10:00 - 11:00
            </Typography>
            <Typography color="white" variant="paragraph">
              Opening Ceremony
            </Typography>
          </div>
          <div className="my-3">
            <Typography color="white" variant="h6">
              11:00 - 12:00
            </Typography>
            <Typography color="white" variant="paragraph">
              Keynote
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <Typography color="white" variant="h3">
          Day 2 (17 Mar 2024)
        </Typography>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
          <div className="my-3">
            <Typography color="white" variant="h6">
              10:00 - 11:00
            </Typography>
            <Typography color="white" variant="paragraph">
              Workshop 1
            </Typography>
          </div>
          <div className="my-3">
            <Typography color="white" variant="h6">
              11:00 - 12:00
            </Typography>
            <Typography color="white" variant="paragraph">
              Workshop 2
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Schedule;
