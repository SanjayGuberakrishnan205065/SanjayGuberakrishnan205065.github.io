import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSignup } from "../../../hooks/useSignup";
import { Button, Input, Typography } from "@material-tailwind/react";
import Danger from "../../../components/alerts/Danger";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import Success from "../../../components/alerts/Success";

const Signup = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { signup, isLoading, error: signUpError } = useSignup();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setError(signUpError);
  }, [signUpError]);

  const addUser = async (data) => {
    // setError("");
    // if (data.password !== data.confirmPassword) {
    //   setError("Passwords do not match");
    //   return;
    // }
    // const recaptchaToken = await executeRecaptcha("signup");
    // data = { ...data, captchaValue: recaptchaToken };
    // await signup(data);
  };

  return (
    <div className="container mx-auto page-view">
      <div className="pb-5">
        <Typography variant="h1" color="white">
          Signup
        </Typography>
        <div className="my-3 py-4 px-5 shadow rounded lg:w-8/12">
          <form className="pt-3" onSubmit={handleSubmit(addUser)}>
            <div className="my-3">
              <Input
                type="text"
                label="Name"
                color="white"
                required
                {...register("userName", {
                  required: "Name is Required",
                })}
              />
              {errors.userName && <Danger>{errors.userName.message}</Danger>}
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="College Register Number"
                color="white"
                required
                {...register("regNo", {
                  required: "Register Number is Required",
                })}
              ></Input>
              {errors.regNo && <Danger>{errors.regNo.message}</Danger>}
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="Department"
                color="white"
                required
                {...register("dept", {
                  required: "Department is Required",
                })}
              ></Input>
              {errors.dept && <Danger>{errors.dept.message}</Danger>}
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="College Name"
                color="white"
                required
                {...register("college", {
                  required: "College Name is Required",
                })}
              ></Input>
              {errors.college && <Danger>{errors.college.message}</Danger>}
            </div>
            <div className="my-3">
              <select
                className="bg-primary p-3 w-full border border-white rounded-lg text-white"
                required
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="my-3">
              <Input
                type="number"
                label="Mobile Number"
                color="white"
                required
                {...register("mobile", {
                  required: "Mobile Number is Required",
                })}
              ></Input>
              {errors.mobile && <Danger>{errors.mobile.message}</Danger>}
            </div>
            <div className="my-3">
              <Input
                type="text"
                label="Email"
                color="white"
                required
                {...register("email", { required: "Email is required" })}
              ></Input>
              {errors.email && <Danger>{errors.email.message}</Danger>}
            </div>
            <div className="my-3">
              <Input
                type="password"
                label="Password"
                color="white"
                required
                {...register("password", {
                  required: "Password is required",
                })}
              ></Input>
              {errors.password && <Danger>{errors.password.message}</Danger>}
            </div>
            <div className="my-3">
              <Input
                type="password"
                label="Confirm Password"
                color="white"
                required
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
              ></Input>
              {errors.confirmPassword && (
                <Danger>{errors.confirmPassword.message}</Danger>
              )}
            </div>
            {error && <Danger>{error}</Danger>}
            {isLoading && (
              <Success>
                Strap in, we're about to blast off into the world of tech and
                culture...
              </Success>
            )}
            <div className="my-3  text-center">
              <Button
                type="submit"
                variant="gradient"
                className="rounded-full"
                color="deep-purple"
                disabled={isLoading}
              >
                {isLoading ? "Signing Up" : "Sign Up"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
