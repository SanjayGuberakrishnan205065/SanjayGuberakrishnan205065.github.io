import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import DataTable from "../components/DataTable";
import { formatDateTimeWithTimezone } from "../../../utils";
import { Chip, Typography } from "@material-tailwind/react";
import ExportToExcel from "../../../components/ExportToExcel";
import { HomeIcon } from "@heroicons/react/24/solid";

const ReferralCodes = () => {
  const { token } = useAuthContext();
  const [referrals, setReferrrals] = useState([]);
  const [filteredReferrals, setFilteredReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  const columns = [
    { field: "referralCode", headerName: "Code", width: 120 },
    { field: "active", headerName: "Status", width: 90 },
    { field: "discount", headerName: "Discount", width: 80 },
    { field: "applicableCollege", headerName: "College", width: 300 },
    { field: "createdAt", headerName: "Created At", width: 200 },
  ];

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
            res.data.referrals.map((referral, index) => {
              referral.id = index + 1;
              referral.active = referral.active ? "Active" : "Inactive";
              referral.discount = referral.discountAmount
                ? "₹" + referral.discountAmount["$numberDecimal"]
                : referral.discountPercent["$numberDecimal"] + "%";
              referral.createdAt = formatDateTimeWithTimezone(
                referral.createdAt
              );
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
        <DataTable rows={filteredReferrals} columns={columns} />
      </div>
    </div>
  );
};
export default ReferralCodes;
