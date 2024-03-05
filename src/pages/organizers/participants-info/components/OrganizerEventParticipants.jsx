import { Typography } from "@material-tailwind/react";
import ExportToExcel from "../../../../components/ExportToExcel";
import DataTable from "../../../all-stats/components/DataTable";

const OrganizerEventParticipants = ({ eventName, eventParticipants }) => {
  const columns = [
    { field: "userName", headerName: "Name", width: 100 },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      width: 130,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "dept", headerName: "Department", width: 90 },
    { field: "college", headerName: "College", width: 300 },
    { field: "regNo", headerName: "Reg No", width: 130 },
  ];
  return (
    <div className="mb-10 py-3">
      <div className="flex justify-between">
        <Typography variant="h5">{eventName}</Typography>
        <ExportToExcel
          data={eventParticipants}
          fileName={eventName + " Participants"}
        />
      </div>
      <div className="my-3">
        <DataTable rows={eventParticipants} columns={columns} />
      </div>
    </div>
  );
};
export default OrganizerEventParticipants;
