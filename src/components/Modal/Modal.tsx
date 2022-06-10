import type { FC } from "react";
import { IModal } from "../../types/Modal";
import "./Modal.css";

const Modal: FC<IModal> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal" onClick={() => onClose()}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-row justify-end">
          <button onClick={() => onClose()}>close</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
