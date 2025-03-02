import ReactDom from "react-dom";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import "./DeleteModal.css";

export default function DeleteModal({ title, submitAction, cancelAction }) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode === 27) {
        cancelAction();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });

  return ReactDom.createPortal(
    <div className="modal-parent active">
      <div className="delete-modal">
        <IoMdClose className="modal-close-icon" onClick={cancelAction} />
        <div className="modal-content">
          <h1>آیا از {title} اطمینان دارید؟</h1>
          <div className="delet-modal-bts">
            <button
              className="delet-modal-btn delet-modal-accept-btn"
              onClick={submitAction}
            >
              بله
            </button>
            <button
              className="delet-modal-btn delet-modal-reject-btn"
              onClick={cancelAction}
            >
              خیر
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("modal-parent")
  );
}
