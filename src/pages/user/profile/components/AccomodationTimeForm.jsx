import { Alert, Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const AccomodationTimeForm = ({ userAccommodationInfo, hoursPermitted }) => {
  console.log(userAccommodationInfo, hoursPermitted);
  const [checkIn, setCheckIn] = useState(
    userAccommodationInfo.checkIn
      ? userAccommodationInfo.checkIn.slice(0, 16)
      : ""
  );
  const [checkOut, setCheckOut] = useState(
    userAccommodationInfo.checkOut
      ? userAccommodationInfo.checkOut.slice(0, 16)
      : ""
  );
  console.log(checkIn, checkOut);
  const { token } = useAuthContext();

  const handleFormSubmit = () => {
    const checkInTime = new Date(checkIn);
    const checkOutTime = new Date(checkOut);
    if (isNaN(checkInTime) || isNaN(checkOutTime)) {
      toast.error("Invalid date & time");
      return;
    }
    if (checkInTime > checkOutTime) {
      toast.error("Check out time should be greater than check in time");
      return;
    }
    const diff = checkOutTime - checkInTime;
    const hours = diff / (1000 * 60 * 60);
    if (hours > hoursPermitted) {
      toast.error(
        `You can only stay for ${hoursPermitted} hours. You have selected ${Math.round(
          hours
        )} hours`
      );
      return;
    }
    axios
      .post(
        "/api/accommodation-timings",
        {
          checkIn: checkIn + "z",
          checkOut: checkOut + "z",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Accommodation timings saved successfully");
      })
      .catch(() => {
        toast.error("Error saving accommodation timings");
      });
  };
  return (
    <div>
      <div className="my-5">
        <Alert color="purple">
          {userAccommodationInfo.checkIn && userAccommodationInfo.checkOut
            ? "You can stay for a maximum of " + hoursPermitted + " hours"
            : "Please enter your check in and check out time"}
        </Alert>
      </div>
      <div className="my-3">
        <Input
          required={true}
          type="datetime-local"
          color="white"
          label="Check In Time"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          min="2024-03-15T00:00"
          max="2024-03-17T23:59"
        ></Input>
      </div>
      <div className="my-3">
        <Input
          required={true}
          type="datetime-local"
          color="white"
          label="Check Out Time"
          min="2024-03-15T00:00"
          max="2024-03-17T23:59"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        ></Input>
      </div>
      <div className="my-3">
        <Button color="deep-purple" onClick={handleFormSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};
export default AccomodationTimeForm;
