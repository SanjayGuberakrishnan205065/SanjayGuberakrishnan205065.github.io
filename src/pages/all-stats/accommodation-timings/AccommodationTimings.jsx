import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Typography } from "@material-tailwind/react";
import ExportToExcel from "../../../components/ExportToExcel";
import DataTable from "../components/DataTable";
import { formatDateTimeWithTimezone } from "../../../utils";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";

const AccommodationTimings = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [accommodationTimings, setAccommodationTimings] = useState([]);
  const columns = [
    { field: "checkIn", headerName: "Check in", width: 170 },
    { field: "checkOut", headerName: "Check out", width: 170 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "gender", headerName: "Gender", width: 130 },
    { field: "tickets", headerName: "Purchased Tickets", width: 150 },
    { field: "count", headerName: "Tickets Count", width: 100 },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      width: 130,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "department", headerName: "Department", width: 90 },
    { field: "college", headerName: "College", width: 300 },
  ];
  useEffect(() => {
    const fetchAccommodationTimings = () => {
      axios
        .get("/api/accommodation-timings/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data.accommodationTimings);
          const accommodationTimings = res.data.accommodationTimings;
          setAccommodationTimings(
            accommodationTimings.map((accommodationTiming) => {
              accommodationTiming.id = accommodationTiming._id;
              accommodationTiming.name = accommodationTiming.user.userName;
              accommodationTiming.tickets =
                accommodationTiming.verifiedAccommodationTickets.join(", ");
              accommodationTiming.count =
                accommodationTiming.verifiedAccommodationTickets.length;
              accommodationTiming.mobile = accommodationTiming.user.mobile;
              accommodationTiming.email = accommodationTiming.user.email;
              accommodationTiming.department = accommodationTiming.user.dept;
              accommodationTiming.college = accommodationTiming.user.college;
              accommodationTiming.gender = accommodationTiming.user.gender;
              accommodationTiming.checkIn = formatDateTimeWithTimezone(
                accommodationTiming.checkIn.slice(0, 16)
              );
              accommodationTiming.checkOut = formatDateTimeWithTimezone(
                accommodationTiming.checkOut.slice(0, 16)
              );
              return accommodationTiming;
            })
          );
          setAccommodationTimings(res.data.accommodationTimings);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to fetch accommodation timings");
          setLoading(false);
        });
    };

    fetchAccommodationTimings();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Typography variant="h3">Accommodation Timings</Typography>
      <ExportToExcel
        data={accommodationTimings}
        fileName="Accommodation Timings"
      />
      <div className="my-3">
        <DataTable rows={accommodationTimings} columns={columns} />
      </div>
    </div>
  );
};
export default AccommodationTimings;
