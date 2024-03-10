import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { formatDateTimeWithTimezone } from "../../../utils";
import { Typography } from "@material-tailwind/react";
import ExportToExcel from "../../../components/ExportToExcel";
import ReferralCodesTable from "./components/ReferralCodesTable";
import toast from "react-hot-toast";

const ReferralCodes = () => {
  const { token } = useAuthContext();
  const [referrals, setReferrrals] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  const columns = [
    { field: "referralCode", headerName: "Code" },
    { field: "active", headerName: "Status" },
    { field: "discount", headerName: "Discount" },
    { field: "applicableCollege", headerName: "College" },
    { field: "applicableDept", headerName: "Department" },
    { field: "applicableTicketTypes", headerName: "Ticket Types" },
    { field: "applicableCheckoutIds", headerName: "Tickets" },
    { field: "usageCount", headerName: "Usage" },
    { field: "createdAt", headerName: "Created At" },
  ];

  const handleActiveStatusToggle = (referralCode) => {
    const loadingToast = toast.loading("Updating status...");
    const referral = referrals.find(
      (referral) => referral.referralCode === referralCode
    );
    const status = referral.active === "Active" ? "Inactive" : "Active";
    axios
      .patch(
        `/api/referrals/set-active-status`,
        { active: status === "Active", referralCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setReferrrals(
          referrals.map((referral) => {
            if (referral.referralCode === referralCode) {
              referral.active = status;
            }
            return referral;
          })
        );
        toast.dismiss(loadingToast);
        toast.success("Status updated successfully");
      })
      .catch(() => {
        toast.dismiss(loadingToast);
        toast.error("Failed to update status");
      });
  };

  useEffect(() => {
    const fetchReferralCodes = () => {
      axios
        .get("/api/referrals/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          res.data.referrals.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setReferrrals(
            res.data.referrals.map((referral) => {
              referral.active = referral.active ? "Active" : "Inactive";
              referral.discount = referral.discountAmount
                ? "₹" + referral.discountAmount["$numberDecimal"]
                : referral.discountPercent["$numberDecimal"] + "%";
              referral.createdAt = formatDateTimeWithTimezone(
                referral.createdAt
              );
              referral.applicableCollege = referral.applicableCollege || "All";
              referral.applicableDept = referral.applicableDept || "All";
              referral.applicableTicketTypes = referral.applicableTicketTypes
                .length
                ? referral.applicableTicketTypes.join(", ")
                : "All";
              referral.applicableCheckoutIds = referral.applicableCheckoutIds
                .length
                ? referral.applicableCheckoutIds.join(",")
                : "All";
              return referral;
            })
          );
          setLoading(false);
        });
    };

    fetchReferralCodes();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredReferrals(referrals);
    } else {
      setFilteredReferrals(
        referrals.filter((referral) => {
          return category.toLowerCase() === referral.active.toLowerCase();
        })
      );
    }
  }, [category, referrals]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Typography variant="h5">Referral Codes</Typography>
      <div>
        Category:
        <select
          value={category}
          label="Category"
          color="light-blue"
          onChange={(e) => setCategory(e.target.value)}
          className="bg-primary p-5 rounded-md text-white"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <ExportToExcel data={filteredReferrals} fileName="Referral Codes" />
      <div className="my-3">
        <ReferralCodesTable
          rows={filteredReferrals}
          columns={columns}
          handleActiveStatusToggle={handleActiveStatusToggle}
        />
      </div>
    </div>
  );
};
export default ReferralCodes;
