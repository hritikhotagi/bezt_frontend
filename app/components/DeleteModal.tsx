import React from "react";

interface DeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteModal({ show, onClose, onDelete }: DeleteModalProps) {
  if (!show) return null; // Don't render the modal if 'show' is false

  const overlayStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Transparent black background
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  };

  const modalStyles: React.CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "5px",
    width: "300px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  };

  const buttonContainerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "20px",
  };

  const dangerButtonStyles: React.CSSProperties = {
    backgroundColor: "#FF6347", // Tomato
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  const cancelButtonStyles: React.CSSProperties = {
    backgroundColor: "#ccc",
    color: "black",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete?</p>
        <div style={buttonContainerStyles}>
          <button style={dangerButtonStyles} onClick={onDelete}>
            Yes, Delete
          </button>
          <button style={cancelButtonStyles} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
