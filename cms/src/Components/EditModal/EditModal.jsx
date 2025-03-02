/* eslint-disable react/prop-types */
import { IoMdClose } from "react-icons/io";
import { useEffect } from "react";
import "./EditModal.css";

export default function EditModal({ children, onClose, onSubmit }) {
  useEffect(() => {
    const checkKey = (event) => {
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });
  return (
    <div className="modal-parent active">
      <div className="edit-modal">
        <IoMdClose className="modal-close-icon" onClick={onClose} />
        <form action="#" className="edit-modal-form">
          <h1>اطلاعات را ویرایش کنید</h1>

          {children}

          <button className="edit-modal-btn" onClick={onSubmit}>
            ثبت اطلاعات
          </button>
        </form>
      </div>
    </div>
  );
}
