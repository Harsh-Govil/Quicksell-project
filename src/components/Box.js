import React from "react";

const Box = ({ heading, text, onEdit, onFeatureRequest, priority, status }) => {
  const isTicked = status === "Active"; // Check if the box should be ticked

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "250px",
        padding: "10px",
        margin: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Circle for status */}
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: isTicked ? "green" : "gray",
            marginRight: "10px",
          }}
        ></div>
        <div style={{ flex: 1, fontWeight: "bold" }}>{heading}</div>
      </div>
      <p>{text}</p>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={onEdit}>Edit</button>
        <button onClick={onFeatureRequest}>Feature Request</button>
      </div>
    </div>
  );
};

export default Box;
