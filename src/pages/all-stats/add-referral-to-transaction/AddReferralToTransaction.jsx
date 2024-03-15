import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../hooks/useAuthContext";

const AddReferralToTransaction = () => {
  const { token } = useAuthContext();
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const addTransaction = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "/api/transactions/add-referral",
        {
          upiTransactionId,
          referralCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast.success("Referral added successfully");
        setUpiTransactionId("");
        setReferralCode("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <div className="my-3">
      <Typography variant="h3">Add Referral to Transaction</Typography>
      <form onSubmit={addTransaction}>
        <div className="my-3">
          <Input
            type="text"
            label="UPI Txn Id"
            color="white"
            placeholder="12 digit UPI txn id"
            value={upiTransactionId}
            onChange={(e) => setUpiTransactionId(e.target.value)}
          />
        </div>
        <div className="my-3">
          <Input
            type="text"
            label="Referral Code (optional)"
            color="white"
            placeholder="Referral code"
            value={referralCode}
            onChange={(e) => setReferralCode(e.target.value)}
          />
        </div>
        <div className="my-3">
          <Button color="deep-purple" variant="gradient" type="submit">
            {loading ? "Adding..." : "Add Referral"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddReferralToTransaction;
