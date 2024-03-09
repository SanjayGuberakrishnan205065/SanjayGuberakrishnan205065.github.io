import { useForm } from "react-hook-form";
import ProfileStyles from "./ProfileStyles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loader from "../../loader/Loader";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useLogout } from "../../../hooks/useLogout";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import AccommodationTimeForm from "./components/AccomodationTimeForm";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [purchasedAccommodationTickets, setPurchasedAccommodationTickets] =
    useState(false);
  const [gender, setGender] = useState("");
  const [accommodationHours, setAccommodationHours] = useState(0);
  const [userAccommodationInfo, setUserAccommodationInfo] = useState({
    checkIn: "",
    checkOut: "",
  });
  const { token } = useAuthContext();
  const { logout } = useLogout();

  const {
    register,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const fetchUserAccommodationInfo = () => {
      axios
        .get("/api/accommodation-timings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setPurchasedAccommodationTickets(
            res.data.purchasedAccommodationTickets
          );
          setAccommodationHours(res.data.hours);
          if (res.data.accommodationTimings) {
            setUserAccommodationInfo(res.data.accommodationTimings);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    };

    const fetchUserInfo = () => {
      axios
        .get("/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLoading(false);
          setGender(res.data.gender);
          reset({
            userName: res.data.userName,
            regNo: res.data.regNo,
            mobile: res.data.mobile,
            dept: res.data.dept,
            email: res.data.email,
            college: res.data.college,
            gender: res.data.gender,
          });
          fetchUserAccommodationInfo();
        })
        .catch(() => {
          toast.error("Something went wrong");
          setLoading(false);
        });
    };

    fetchUserInfo();
  }, [token, reset]);

  const handleSave = () => {
    if (gender === "" || gender === "Not Specified") {
      return toast.error("Please select your gender");
    }
    const loadingToast = toast.loading("Saving...");
    axios
      .post(
        "/api/users/gender",
        {
          gender,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => toast.success("Saved"))
      .catch(() => toast.error("Something went wrong"))
      .finally(() => toast.dismiss(loadingToast));
  };

  if (loading) {
    return (
      <div className="container page-view mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto page-view">
      <Typography variant="h1">Profile</Typography>
      <div>
        <Typography variant="h3" color="white">
          Quick Links
        </Typography>
        <div className="flex flex-col md:flex-row justify-center my-3 gap-5 items-center">
          <div>
            <Link to="/my-tickets">
              <Button
                color="deep-purple"
                variant="gradient"
                size="lg"
                ripple={true}
              >
                My Tickets
              </Button>
            </Link>
          </div>
          <div>
            <Link to="/my-transactions">
              <Button
                color="deep-purple"
                variant="gradient"
                size="lg"
                ripple={true}
              >
                My Transactions
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        {purchasedAccommodationTickets && (
          <div>
            <Typography variant="h3" color="white">
              Accommodation Timings
            </Typography>
            <AccommodationTimeForm
              userAccommodationInfo={userAccommodationInfo}
              hoursPermitted={accommodationHours}
            />
          </div>
        )}
        <div className="flex-grow lg:max-w-96 mt-3">
          <Typography variant="h3" color="white">
            Your Info
          </Typography>
          <form>
            <div className="my-3">
              <Input
                type="text"
                {...register("userName", {
                  required: "Name is Required",
                })}
                label="Name"
                color="white"
                readOnly
              ></Input>
              {errors.userName && (
                <span className={`${ProfileStyles.error} `}>
                  {errors.userName.message}
                </span>
              )}
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="Register Number"
                color="white"
                {...register("regNo")}
                readOnly
              ></Input>
            </div>
            <div className="my-3">
              <Input
                type="number"
                label="Mobile Number"
                color="white"
                {...register("mobile", {
                  required: "Mobile Number is Required",
                })}
                readOnly
              ></Input>
            </div>
            <div className="my-3">
              <select
                className="bg-primary p-3 w-full border border-white rounded-lg text-white"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select your gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="Department"
                color="white"
                {...register("dept")}
                readOnly
              ></Input>
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="College"
                color="white"
                {...register("college")}
                readOnly
              ></Input>
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="Email"
                color="white"
                {...register("email", { required: "Email is required" })}
                readOnly
              ></Input>
            </div>
            <Button color="deep-purple" onClick={handleSave}>
              Save
            </Button>
          </form>
        </div>
      </div>
      <div className="text-center">
        <button
          className="bg-primary text-white px-6 py-2 rounded-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default Profile;
