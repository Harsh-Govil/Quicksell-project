import React, { useState } from "react";

function TicketCard({ ticket, user }) {
  // State to toggle the visibility of ticket details
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  // Toggle the details visibility
  const toggleDetailsVisibility = () => {
    setIsDetailsVisible((prevState) => !prevState);
  };

  return (
    <div
      className="ticket-card"
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        margin: "10px",
        borderRadius: "5px",
      }}
    >
      <div
        className="ticket-header"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div
          className={`status-indicator ${ticket.status.toLowerCase()}`}
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: ticket.status === "Open" ? "green" : "red",
            marginRight: "10px",
          }}
        ></div>
        <div className="ticket-heading">{ticket.id}</div>
      </div>
      <p>{ticket.title}</p>

      <div className="ticket-footer" style={{ marginTop: "10px" }}>
        {/* The '...' button to toggle ticket details */}
        <div
          style={{
            padding: "5px 10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
            backgroundColor: "#f0f0f0",
            color: "#888",
            cursor: "pointer",
          }}
          onClick={toggleDetailsVisibility}
        >
          ...
        </div>

        {/* Ticket details that will show when 'isDetailsVisible' is true */}
        {isDetailsVisible && (
          <div
            style={{
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
            }}
          >
            <div>
              <strong>Status:</strong> {ticket.status}
            </div>
            <div>
              <strong>Priority:</strong> {ticket.priority}
            </div>
            <div>
              <strong>Assigned to:</strong> {user ? user.name : "Unassigned"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketCard;
