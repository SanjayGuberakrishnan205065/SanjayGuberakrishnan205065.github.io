import { Button } from "@material-tailwind/react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ConfirmationModal = ({ isOpen, title, text, confirm, close }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    close();
  }
  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="p-3">
          <div style={{ display: "flex", alignItems: "start", gap: "2rem" }}>
            <span className="text-black font-bold">{title}</span>
          </div>
          <div className="my-3 text-gray-800">{text}</div>
          <div className="container text-center">
            <span className="mx-3">
              <Button
                color="red"
                onClick={() => {
                  confirm();
                  close();
                }}
              >
                Yes
              </Button>
            </span>
            <span className="mx-3">
              <Button color="green" onClick={() => close()}>
                No
              </Button>
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmationModal;
