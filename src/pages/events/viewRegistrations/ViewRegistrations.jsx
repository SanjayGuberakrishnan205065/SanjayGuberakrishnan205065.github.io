import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loader from "../../loader/Loader";
import { Typography } from "@material-tailwind/react";
import { DataGrid } from "@mui/x-data-grid";

const ViewRegistrations = () => {
  const [event, setEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [participants, setParticipants] = useState([]);
  const [rows, setRows] = useState([]);
  const { token } = useAuthContext();

  const columns = [
    { field: "id", headerName: "#", width: 70 },
    { field: "regNo", headerName: "Register no.", width: 130 },
    { field: "name", headerName: "Name", width: 130 },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      width: 130,
    },
    { field: "department", headerName: "Department", width: 90 },
    { field: "college", headerName: "College", width: 130 },
  ];

  useEffect(() => {
    axios.get("/api/events/" + id).then((res) => {
      setEvent(res.data);
      axios
        .get("/api/events/participants/" + id, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setParticipants(res.data);
          setRows(
            res.data.map((participant, idx) => ({
              id: idx + 1,
              regNo: participant.regNo,
              name: participant.userName,
              mobile: participant.mobile,
              department: participant.dept,
              college: participant.college,
            }))
          );
          setLoading(false);
        });
    });
  }, [id, token]);

  if (loading) {
    return (
      <div className="page-view container mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto page-view">
      <div className="my-3">
        <Typography variant="h1">Registrations</Typography>
        <Typography variant="h5">{event.eventName}</Typography>
      </div>
      {participants.length === 0 && (
        <div className="text-center my-3 pb-2">
          <h6 className="display-6">No participants yet</h6>
        </div>
      )}
      <div style={{ height: 640, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          className="bg-gray-300"
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10, 20, 50, 100]}
          checkboxSelection
        />
      </div>
    </div>
  );
};
export default ViewRegistrations;
