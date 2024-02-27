import { Button, Input, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Loader from "../../loader/Loader";
import axios from "axios";
import { useAuthContext } from "../../../hooks/useAuthContext";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

const PaymentModal = ({
  isOpen,
  close,
  amount,
  setAmount,
  handlePayment,
  referralCode,
}) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [qrLoading, setQrLoading] = useState(true);
  const upiLink = `upi://pay?mode=02&pa=Q178991944@ybl&am=${amount}&purpose=00&mc=0000&pn=PhonePeMerchant&orgid=180001&sign=MEUCIEoxiCYhFrpF2oZDnWtkGInpkF3dAJbe4oSXSq0HGThUAiEA8RGaio5MA0/x0FQx9RvZxF1tJp2UwEQKkEsVC8mYXBY=`;
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    upiLink
  )}`;
  useEffect(() => {
    const fetchReferral = () => {
      if (!isOpen) return;
      console.log(referralCode);
      if (!referralCode) {
        setLoading(false);
        return;
      }
      axios
        .get("/api/referrals/" + referralCode, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          if (response.data.referral) {
            const referral = response.data.referral;
            if (referral.discountPercent) {
              const discountAmount =
                (amount * referral.discountPercent["$numberDecimal"]) / 100;
              toast.success(
                "You saved ₹" + discountAmount + " using referral!"
              );
              setAmount(amount - discountAmount);
            } else if (referral.discountAmount) {
              toast.success(
                "You saved ₹" +
                  referral.discountAmount["$numberDecimal"] +
                  " using referral!"
              );
              setAmount(amount - referral.discountAmount["$numberDecimal"]);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    };
    fetchReferral();
  }, [referralCode, isOpen]);

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
            <div>
              Please scan the QR code and complete the payment using your UPI
              app
            </div>
            <div className="text-xs">Our payment partner: SRI DEVI STORE</div>
          </div>
          <div className="flex justify-center">
            {qrLoading && (
              <div>
                <Loader />
                Generating QR code...
              </div>
            )}
            <img
              src={qrCodeSrc}
              className="max-w-48"
              alt="qr"
              onLoad={() => setQrLoading(false)}
            />
          </div>
          <div className="my-3">
            Or, you can use the following link to complete the payment
            <div>
              <a
                href={upiLink}
                target="_blank"
                className="text-blue-500 underline"
                rel="noreferrer"
              >
                Click here to pay
                <span className="font-bold"> ₹{amount} </span>
                using an UPI app on your phone
              </a>
            </div>
          </div>
          {referralCode && <div>Referral code used: {referralCode}</div>}
          <div>
            Once done, please enter the 12 digit UPI transaction ID below
          </div>
          <div className="mt-3 max-w-96 mx-auto">
            <Input
              type="text"
              label="UPI Transaction ID"
              value={upiTransactionId}
              onChange={(e) => setUpiTransactionId(e.target.value)}
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
                onClick={() => handlePayment(upiTransactionId)}
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
