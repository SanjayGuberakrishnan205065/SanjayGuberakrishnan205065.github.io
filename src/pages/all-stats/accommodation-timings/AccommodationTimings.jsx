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
  const [
    accommodationCategoryParticipantsMap,
    setAccommodationCategoryParticipantsMap,
  ] = useState({});
  const columns = [
    { field: "checkIn", headerName: "Check in", width: 170 },
    { field: "checkOut", headerName: "Check out", width: 170 },
    { field: "name", headerName: "Name", width: 100 },
    { field: "gender", headerName: "Gender", width: 130 },
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
        .get("/api/tickets/accommodation-participants", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const data = res.data.checkoutOutIdParticipantsMap;
          const accommodationCategories = Object.keys(data);
          const tempAccommodationCategoryParticipantsMap = {};

          accommodationCategories.forEach((category) => {
            if (!tempAccommodationCategoryParticipantsMap[category]) {
              tempAccommodationCategoryParticipantsMap[category] = [];
            }
            tempAccommodationCategoryParticipantsMap[category] = data[
              category
            ].map((participant, index) => {
              participant.id = participant._id + index;
              participant.name = participant.userName;
              participant.mobile = participant.mobile;
              participant.email = participant.email;
              participant.department = participant.dept;
              participant.college = participant.college;
              participant.checkIn = participant?.accommodationTiming?.checkIn
                ? formatDateTimeWithTimezone(
                    participant.accommodationTiming.checkIn.slice(0, 16)
                  )
                : "Not specified";
              participant.checkOut = participant?.accommodationTiming?.checkOut
                ? formatDateTimeWithTimezone(
                    participant.accommodationTiming.checkOut.slice(0, 16)
                  )
                : "Not specified";
              return participant;
            });
          });

          setAccommodationCategoryParticipantsMap(
            tempAccommodationCategoryParticipantsMap
          );
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
      {Object.keys(accommodationCategoryParticipantsMap).map(
        (category, index) => {
          return (
            <div key={index} className="my-10">
              <div className="flex justify-between items-center">
                <Typography variant="h5" className="my-5">
                  {category.replaceAll("_", " ")}
                </Typography>
                <ExportToExcel
                  data={accommodationCategoryParticipantsMap[category]}
                  fileName="Accommodation Timings"
                />
              </div>
              <DataTable
                rows={accommodationCategoryParticipantsMap[category]}
                columns={columns}
              />
            </div>
          );
        }
      )}
    </div>
  );
};
export default AccommodationTimings;
