// src/Modal.js
import React from 'react';

const EditDialog = ({ show, handleClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h4>Edit the question text</h4>
          <button className='btn btn-success col-2' onClick={handleClose} >Done</button>
        </div>
        <br />
        {children}

      </div>
    </div>
  );
};

export default EditDialog;
