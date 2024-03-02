import { Alert, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import MyTransactionsTable from "./components/MyTransactionsTable";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";
import { Link } from "react-router-dom";

const MyTransactions = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [myTransactions, setMyTransactions] = useState([]);
  useEffect(() => {
    const fetchMyTransactions = () => {
      axios
        .get("/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLoading(false);
          setMyTransactions(response.data.transactions);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Failed to fetch tickets");
        });
    };
    fetchMyTransactions();
  }, []);
  if (loading) {
    return (
      <div className="mx-auto container page-view">
        <Loader />
      </div>
    );
  }
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">My Transactions</Typography>
      <Alert variant="gradient" color="deep-purple" className="my-3">
        <div>
          It may take upto 24 hours for the transaction verification process.
          For any payment related queries, please contact:
        </div>
        <div>
          Pradesh GV{" "}
          <a href="tel:+918838644172" className="underline">
            +91 88386 44172
          </a>{" "}
        </div>
      </Alert>
      <Typography variant="lead" className="my-3">
        To view tickets from verified transactions, click{" "}
        <Link to="/my-tickets">
          <span className="underline">here</span>
        </Link>
      </Typography>
      {myTransactions.length > 0 ? (
        <MyTransactionsTable myTransactions={myTransactions} />
      ) : (
        <div style={{ position: "relative", height: "50vh" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
            }}
            className="text-3xl text-center"
          >
            Transactions that you make will appear here
          </div>
        </div>
      )}
    </div>
  );
};
export default MyTransactions;
