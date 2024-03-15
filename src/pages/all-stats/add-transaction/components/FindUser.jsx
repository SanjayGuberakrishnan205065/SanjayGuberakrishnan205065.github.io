import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useAuthContext } from "../../../../hooks/useAuthContext";
import toast from "react-hot-toast";
import { useState } from "react";

const FindUser = ({ mobile, setMobile, setValidUser }) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!mobile) return toast.error("Mobile is required");
    if (mobile.length !== 10) return toast.error("Mobile should be 10 digits");
    setLoading(true);
    axios
      .post(
        "/api/users/mobile",
        { mobile },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data);
        setValidUser(true);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        setValidUser(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="my-3">
      <div className="my-3">
        <Typography variant="h4">Find User</Typography>
      </div>
      <form onSubmit={handleFormSubmit}>
        <Input
          type="text"
          label="Mobile no."
          color="white"
          placeholder="User's mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <Button
          color="deep-purple"
          type="submit"
          className="my-3"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      {user && (
        <div className="my-3">
          <Alert color="deep-purple">
            REMEMBER TO VERIFY THE BELOW DETAILS WITH THE PARTICIPANT'S ID CARD
            TO AVOID ANY DISCREPANCIES
          </Alert>
          <div className="flex flex-col my-5">
            <div>
              Name
              <Typography variant="h5">{user.userName}</Typography>
            </div>
            <div>
              College
              <Typography variant="h5">{user.college}</Typography>
            </div>
            <div>
              Department
              <Typography variant="h5">{user.dept}</Typography>
            </div>
            <div>
              College Registration Number
              <Typography variant="h5">{user.regNo}</Typography>
            </div>
            <div>
              Email
              <Typography variant="h5">{user.email}</Typography>
            </div>
            <div>
              Phone Number
              <Typography variant="h5">{user.mobile}</Typography>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default FindUser;
