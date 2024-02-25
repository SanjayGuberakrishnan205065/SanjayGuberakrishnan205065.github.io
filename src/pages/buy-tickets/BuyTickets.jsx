import { Typography } from "@material-tailwind/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BuyTickets = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="page-view container mx-auto">
      <Typography variant="h1">Buy Tickets</Typography>
    </div>
  );
};
export default BuyTickets;
