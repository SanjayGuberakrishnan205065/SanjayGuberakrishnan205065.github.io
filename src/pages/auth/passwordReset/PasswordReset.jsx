import { useState } from "react";
import Header from "../../../components/events/Header";
import { Navigate, useSearchParams, Link } from "react-router-dom";
import axios from "axios";
import { Typography, Input, Button } from "@material-tailwind/react";
import Danger from "../../../components/alerts/Danger";
import Success from "../../../components/alerts/Success";

const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  if (!token) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    axios
      .post("/api/auth/reset-password", { token, password })
      .then(() => {
        setLoading(false);
        setError("");
        setSuccess("Your password has been reset");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        setLoading(false);
        setSuccess("");
        setError(err.response.data.error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="page-view">
        <Typography variant="h1" className="mb-3">
          Reset your Password
        </Typography>
        {success && <Success>{success}</Success>}
        {error && <Danger>{error}</Danger>}
        <div>
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="my-3 max-w-xl">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
                color="white"
                required={true}
              />
            </div>
            <div className="my-3 max-w-xl">
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                label="Confirm Password"
                color="white"
                required={true}
              />
            </div>
            <div className="my-3">
              <Button
                type="submit"
                className="bg-primaryLight rounded-full"
                disabled={loading}
              >
                {loading ? "Loading..." : "Reset Password"}
              </Button>
            </div>
            <div>
              <Link to="/login">
                <span className="text-muted small">Back to login</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;
