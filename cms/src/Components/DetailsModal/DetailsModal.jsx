import ReactDOM from "react-dom"
import { IoMdClose } from "react-icons/io";
import "./DetailsModal.css"
import { useEffect } from "react";

export default function DetailsModal({ onHide, children }) {

    useEffect(() => {
        const checkKey =(event) =>{
            
            if(event.keyCode === 27){
                onHide()
            }
        }

        window.addEventListener("keydown", checkKey)
        
        return() => window.removeEventListener("keydown", checkKey)
        
    })

    return ReactDOM.createPortal(
        <div className="modal-parent active">
            <div className="details-modal">
                <IoMdClose className="modal-close-icon" onClick={onHide} />
                {children}
            </div>
        </div>, document.getElementById("modal-parent")
    )
}
