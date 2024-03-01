import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import DataTable from "../components/DataTable";
import { formatDateTimeWithTimezone } from "../../../utils";
import { Typography } from "@material-tailwind/react";
import ExportToExcel from "../../../components/ExportToExcel";

const Users = () => {
  const { token } = useAuthContext();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  const columns = [
    { field: "userName", headerName: "Name", width: 120 },
    { field: "regNo", headerName: "Reg No", width: 130 },
    {
      field: "mobile",
      headerName: "Mobile",
      type: "number",
      width: 130,
    },
    { field: "email", headerName: "Email", width: 200 },
    { field: "dept", headerName: "Department", width: 90 },
    { field: "college", headerName: "College", width: 300 },
    { field: "createdAt", headerName: "Signed Up", width: 170 },
  ];

  useEffect(() => {
    const fetchTransactions = () => {
      axios
        .get("/api/logs/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUsers(
            res.data.users.map((user, index) => {
              user.id = index + 1;
              user.createdAt = formatDateTimeWithTimezone(user.createdAt);
              return user;
            })
          );
          setLoading(false);
        });
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers(
        users.filter((user) => {
          if (category === "mit") {
            return user.college === "MIT";
          } else if (category === "nonMit") {
            return user.college !== "MIT";
          }
        })
      );
    }
  }, [category, users]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      <Typography variant="h5">Users</Typography>
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
          <option value="nonMit">Non MIT</option>
          <option value="mit">MIT</option>
        </select>
      </div>
      <ExportToExcel data={filteredUsers} fileName="Users" />
      <div className="my-3">
        <DataTable rows={filteredUsers} columns={columns} />
      </div>
    </div>
  );
};
export default Users;
