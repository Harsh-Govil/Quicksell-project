import React from "react";
import TicketCard from "./TicketCard";

function TicketGroup({
  group,
  tickets,
  users,
  toggleDetailsVisibility,
  detailsVisible,
}) {
  return (
    <div className="ticket-group">
      <div className="group-heading">
        <strong>{group}</strong>
      </div>
      <div className="ticket-boxes">
        {tickets.map((ticket) => {
          const user = users.find((user) => user.id === ticket.userId);
          return (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              user={user}
              toggleDetailsVisibility={toggleDetailsVisibility}
              detailsVisible={detailsVisible}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TicketGroup;
