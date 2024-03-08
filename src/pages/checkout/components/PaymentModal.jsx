import { Alert, Button, Input, Typography } from "@material-tailwind/react";
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
  handlePayment,
  referralCode,
  cartItems,
}) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [referralApplied, setReferralApplied] = useState(false);
  const [upiTransactionId, setUpiTransactionId] = useState("");
  const [qrLoading, setQrLoading] = useState(true);
  const [finalAmount, setFinalAmount] = useState(amount);
  const upiLink = `upi://pay?mode=02&pa=Q178991944@ybl&am=${finalAmount}&purpose=00&mc=0000&pn=PhonePeMerchant&orgid=180001&sign=MEUCIEoxiCYhFrpF2oZDnWtkGInpkF3dAJbe4oSXSq0HGThUAiEA8RGaio5MA0/x0FQx9RvZxF1tJp2UwEQKkEsVC8mYXBY=`;
  const qrCodeSrc = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    upiLink
  )}`;
  useEffect(() => {
    const fetchReferral = () => {
      if (!isOpen) return;
      setFinalAmount(amount);
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
            if (
              referral.applicableTicketTypes &&
              referral.applicableTicketTypes.length > 0
            ) {
              const applicableTicketTypes = referral.applicableTicketTypes;
              const isApplicable = cartItems.every((item) =>
                applicableTicketTypes.includes(item.type)
              );
              if (!isApplicable) {
                toast.error(
                  "Referral code not applicable for the selected tickets"
                );
                setLoading(false);
                return;
              }
            }
            if (referral.discountPercent) {
              const discountAmount =
                (amount * referral.discountPercent["$numberDecimal"]) / 100;
              toast.success(
                "You saved ₹" + discountAmount + " using referral!"
              );
              setFinalAmount(amount - discountAmount);
              setReferralApplied(true);
            } else if (referral.discountAmount) {
              toast.success(
                "You saved ₹" +
                  referral.discountAmount["$numberDecimal"] +
                  " using referral!"
              );
              setFinalAmount(
                amount - referral.discountAmount["$numberDecimal"]
              );
              setReferralApplied(true);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
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
          {/* <div className="my-3">
            Or, you can use the following link to complete the payment
            <div>
              <a
                href={upiLink}
                target="_blank"
                className="text-blue-500 underline"
                rel="noreferrer"
              >
                Click here to pay
                <span className="font-bold"> ₹{finalAmount} </span>
                using an UPI app on your phone
              </a>
            </div>
          </div> */}
          {referralApplied && referralCode ? (
            <div>Referral code used: {referralCode}</div>
          ) : (
            <div className="font-extrabold text-red-800 text-2xl">
              NO REFERRAL CODE USED
            </div>
          )}
          <div className="text-2xl font-bold">
            After paying, please enter the 12 digit UPI transaction ID below
            <br />
            Only then your ticket will be confirmed
          </div>
          <div className="text-center text-red-900 font-bold">
            Make sure the entered UPI transaction ID is correct and is for the
            exact amount of ₹{finalAmount}.<br />
            <span className="uppercase">
              Payments made for any amount other than ₹{finalAmount} will not be
              considered
            </span>
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
                <div>
                  Confirm Payment of ₹{finalAmount} <br />
                  {!referralApplied && "with NO referral code"}
                </div>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default PaymentModal;
