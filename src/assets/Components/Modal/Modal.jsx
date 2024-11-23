import React from 'react';
import './Modal.css'; // Asegúrate de crear el archivo CSS para el modal

function Modal({ imageSrc, alt, closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt={alt} className="modal-image" />
        <button className="close-btn" onClick={closeModal}>
          &times; {/* Botón de cerrar */}
        </button>
      </div>
    </div>
  );
}

export default Modal;
