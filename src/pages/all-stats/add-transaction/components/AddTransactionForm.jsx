import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../../hooks/useAuthContext";

const AddTransactionForm = ({ mobile }) => {
  const { token } = useAuthContext();
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [checkoutIds, setCheckoutIds] = useState("");
  const [loading, setLoading] = useState(false);
  const addTransaction = (e) => {
    e.preventDefault();
    const checkoutIdsArray = checkoutIds.split(",");
    const trimmedCheckoutIds = checkoutIdsArray.map((id) => id.trim());
    setLoading(true);
    axios
      .post(
        "/api/transactions/admin",
        {
          upiTransactionId,
          checkoutIds: trimmedCheckoutIds,
          mobile,
          referralCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        toast.success("Transaction added successfully");
        setUpiTransactionId("");
        setReferralCode("");
        setCheckoutIds("");
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="my-3">
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
          <Input
            type="text"
            label="Checkout Ids"
            color="white"
            placeholder="comma separated list of checkout ids"
            value={checkoutIds}
            onChange={(e) => setCheckoutIds(e.target.value)}
          />
        </div>
        <div className="my-3">
          <Button
            color="deep-purple"
            variant="gradient"
            type="submit"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Transaction"}
          </Button>
        </div>
      </form>
    </div>
  );
};
export default AddTransactionForm;
