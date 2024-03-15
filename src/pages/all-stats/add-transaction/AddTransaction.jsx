import { useState } from "react";
import FindUser from "./components/FindUser";
import AddTransactionForm from "./components/AddTransactionForm";

const AddTransaction = () => {
  const [mobile, setMobile] = useState("");
  const [validUser, setValidUser] = useState(false);
  return (
    <div>
      <FindUser
        mobile={mobile}
        setMobile={setMobile}
        setValidUser={setValidUser}
      />
      {validUser && <AddTransactionForm mobile={mobile} />}
    </div>
  );
};
export default AddTransaction;
