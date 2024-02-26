import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Loader from "../../loader/Loader";

Modal.setAppElement("#root");

const PaymentModal = ({ isOpen, close }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      height: "80vh",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      zIndex: 100,
    },
  };

  function closeModal() {
    close();
  }

  if (loading) {
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {loading ? (
        <Loader />
      ) : (
        <div className="text-center text-gray-700">
          <Typography variant="h4" color="black">
            Pay using UPI
          </Typography>
          <div>
            Please scan the QR code and complete the payment using your UPI app
          </div>
          <div className="flex justify-center">
            <img src="/images/qr.png" className="max-w-48" alt="qr" />
          </div>
          <div className="my-3">
            Or, you can use the following link to complete the payment
            <div>
              <a
                href=""
                target="_blank"
                className="text-blue-500 underline"
                rel="noreferrer"
              >
                Click here to pay ₹500
              </a>
            </div>
          </div>
          <div>
            Once done, please enter the 12 digit UPI transaction ID below
          </div>
          <div className="mt-3 max-w-96 mx-auto">
            <Input
              type="text"
              label="UPI Transaction ID"
              placeholder="123456789012"
            />
            <div className="flex justify-center gap-2 items-center">
              <Button
                color="red"
                className="mt-3"
                variant="gradient"
                size="sm"
                onClick={close}
              >
                Cancel
              </Button>
              <Button
                color="deep-purple"
                className="mt-3"
                variant="gradient"
                size="lg"
              >
                Confirm Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
