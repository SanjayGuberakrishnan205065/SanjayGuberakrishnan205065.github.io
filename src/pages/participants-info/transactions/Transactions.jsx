import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import DataTable from "../components/DataTable";
import { formatDateTimeWithTimezone } from "../../../utils";
import { Typography } from "@material-tailwind/react";
import ExportToExcel from "../../../components/ExportToExcel";

const Transactions = () => {
  const { token } = useAuthContext();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  const columns = [
    { field: "upiTransactionId", headerName: "UPI Txn Id", width: 120 },
    { field: "transactionAmount", headerName: "Amount", width: 80 },
    { field: "transactionStatus", headerName: "Status", width: 90 },
    { field: "referralCode", headerName: "Referral Code", width: 130 },
    { field: "name", headerName: "Name", width: 100 },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      width: 130,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "department", headerName: "Department", width: 90 },
    { field: "college", headerName: "College", width: 300 },
    { field: "regNo", headerName: "Reg No", width: 130 },
    { field: "createdAt", headerName: "Date", width: 170 },
    { field: "purchasedTickets", headerName: "Purchased Tickets", width: 200 },
  ];

  useEffect(() => {
    const fetchTransactions = () => {
      axios
        .get("/api/transactions/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTransactions(
            res.data.transactions.map((transaction, index) => {
              transaction.id = index + 1;
              transaction.transactionAmount =
                transaction.transactionAmount["$numberDecimal"];
              transaction.referralCode =
                transaction.referral?.referralCode || "N/A";
              transaction.name = transaction.userId.userName;
              transaction.mobile = transaction.userId.mobile;
              transaction.email = transaction.userId.email;
              transaction.department = transaction.userId.dept;
              transaction.college = transaction.userId.college;
              transaction.regNo = transaction.userId.regNo;
              transaction.purchasedTickets = transaction.purchasedTickets
                .map((ticket) => ticket.ticketName)
                .join(", ");
              transaction.createdAt = formatDateTimeWithTimezone(
                transaction.createdAt
              );
              return transaction;
            })
          );
          setLoading(false);
        });
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(
          (transaction) => transaction.transactionStatus === category
        )
      );
    }
  }, [category, transactions]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Typography variant="h5">Transactions</Typography>
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
          <option value="Success">Success</option>
          <option value="Failed">Failed</option>
          <option value="Pending Verification">Pending Verification</option>
        </select>
      </div>
      <ExportToExcel data={filteredTransactions} fileName="Transactions" />
      <div className="my-3">
        <DataTable rows={filteredTransactions} columns={columns} />
      </div>
    </div>
  );
};
export default Transactions;
