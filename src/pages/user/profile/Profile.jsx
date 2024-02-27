import { useForm } from "react-hook-form";
import ProfileStyles from "./ProfileStyles.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loader from "../../loader/Loader";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useLogout } from "../../../hooks/useLogout";
import { Link } from "react-router-dom";

const Profile = () => {
  const [loading, setLoading] = useState(true);
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
    axios
      .get("/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLoading(false);
        reset({
          userName: res.data.userName,
          regNo: res.data.regNo,
          mobile: res.data.mobile,
          dept: res.data.dept,
          email: res.data.email,
          college: res.data.college,
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [token, reset]);

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
      <Typography variant="h3" color="white">
        Quick Links
      </Typography>
      <div className="flex flex-col md:flex-row justify-evenly my-3 gap-5 items-center">
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
          <Link to="/participated-events">
            <Button
              color="deep-purple"
              variant="gradient"
              size="lg"
              ripple={true}
            >
              Participated Events
            </Button>
          </Link>
        </div>
      </div>
      <div className="lg:max-w-96 mt-3">
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
        </form>
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
