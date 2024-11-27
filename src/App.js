import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [detailsVisible, setDetailsVisible] = useState({});
  const [sortOption, setSortOption] = useState(false); // To control sorting
  const [sortByStatus, setSortByStatus] = useState(false); // For sorting by status
  const [displayOpen, setDisplayOpen] = useState(false);
  const [groupingOpen, setGroupingOpen] = useState(false);
  const [orderingOpen, setOrderingOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDetailsVisibility = (ticketId) => {
    setDetailsVisible((prevState) => ({
      ...prevState,
      [ticketId]: !prevState[ticketId],
    }));
  };

  // Group tickets by status
  const groupedByStatus = {
    backlog: [],
    todo: [],
    inprogress: [],
    done: [],
    cancelled: [],
  };

  tickets.forEach((ticket) => {
    groupedByStatus[ticket.status.toLowerCase()]?.push(ticket);
  });

  // Group tickets by priority
  const groupedByPriority = {
    Urgent: [],
    High: [],
    Medium: [],
    Low: [],
    "No Priority": [],
  };

  tickets.forEach((ticket) => {
    if (ticket.priority === 1) {
      groupedByPriority["Urgent"].push(ticket);
    } else if (ticket.priority === 2) {
      groupedByPriority["High"].push(ticket);
    } else if (ticket.priority === 3) {
      groupedByPriority["Medium"].push(ticket);
    } else if (ticket.priority === 4) {
      groupedByPriority["Low"].push(ticket);
    } else {
      groupedByPriority["No Priority"].push(ticket);
    }
  });

  const shuffleTickets = (arr) => {
    const shuffledArr = [...arr];
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  };

  const handleSortByPriority = () => {
    setSortByStatus(false);
    setSortOption(true);
  };

  const handleSortByStatus = () => {
    setSortOption(false);
    setSortByStatus(true);
  };

  const renderTickets = () => {
    if (sortByStatus) {
      return Object.keys(groupedByStatus).map((status) => (
        <div key={status} className="ticket-group">
          <div className="group-heading">
            <strong>{status.charAt(0).toUpperCase() + status.slice(1)}</strong>
          </div>
          <div className="ticket-boxes">
            {groupedByStatus[status].map((ticket) => {
              const user = users.find((user) => user.id === ticket.userId);
              return (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <div
                      className={`status-indicator ${ticket.status.toLowerCase()}`}
                    ></div>
                    <div className="ticket-heading">{ticket.id}</div>
                  </div>
                  <p>{ticket.title}</p>
                  <div
                    className="ticket-footer"
                    style={{
                      padding: "15px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div>
                      <button
                        onClick={() => toggleDetailsVisibility(ticket.id)}
                      >
                        ...
                      </button>
                      <button>Feature Request</button>
                    </div>
                    {detailsVisible[ticket.id] && (
                      <>
                        <div>
                          <strong>Status:</strong> {ticket.status}
                        </div>
                        <div>
                          <strong>Priority:</strong> {ticket.priority}
                        </div>
                        <div>
                          <strong>Assigned to:</strong>{" "}
                          {user ? user.name : "Unassigned"}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ));
    }

    if (sortOption) {
      return Object.keys(groupedByPriority).map((priority) => (
        <div key={priority} className="ticket-group">
          <div className="group-heading">
            <strong>{priority}</strong>
          </div>
          <div className="ticket-boxes">
            {groupedByPriority[priority].map((ticket) => {
              const user = users.find((user) => user.id === ticket.userId);
              return (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <div
                      className={`status-indicator ${ticket.status.toLowerCase()}`}
                    ></div>
                    <div className="ticket-heading">{ticket.id}</div>
                  </div>
                  <p>{ticket.title}</p>
                  <div
                    className="ticket-footer"
                    style={{
                      padding: "15px",
                      backgroundColor: "white",
                      borderRadius: "5px",
                    }}
                  >
                    <div>
                      <button
                        onClick={() => toggleDetailsVisibility(ticket.id)}
                      >
                        ...
                      </button>
                      <button>Feature Request</button>
                    </div>
                    {detailsVisible[ticket.id] && (
                      <>
                        <div>
                          <strong>Status:</strong> {ticket.status}
                        </div>
                        <div>
                          <strong>Priority:</strong> {ticket.priority}
                        </div>
                        <div>
                          <strong>Assigned to:</strong>{" "}
                          {user ? user.name : "Unassigned"}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ));
    }

    // Default: render shuffled tickets
    return shuffleTickets(tickets).map((ticket) => {
      const user = users.find((user) => user.id === ticket.userId);
      return (
        <div key={ticket.id} className="ticket-card">
          <div className="ticket-header">
            <div
              className={`status-indicator ${ticket.status.toLowerCase()}`}
            ></div>
            <div className="ticket-heading">{ticket.id}</div>
          </div>
          <p>{ticket.title}</p>
          <div className="ticket-footer">
            <div>
              <button onClick={() => toggleDetailsVisibility(ticket.id)}>
                ...
              </button>
              <button>Feature Request</button>
            </div>
            {detailsVisible[ticket.id] && (
              <>
                <div>
                  <strong>Status:</strong> {ticket.status}
                </div>
                <div>
                  <strong>Priority:</strong> {ticket.priority}
                </div>
                <div>
                  <strong>Assigned to:</strong>{" "}
                  {user ? user.name : "Unassigned"}
                </div>
              </>
            )}
          </div>
        </div>
      );
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ticket-board">
      <div className="display-container">
        <div className="display-title">
          Display
          <button
            onClick={() => setDisplayOpen(!displayOpen)}
            className="dropdown-btn"
          >
            ▼
          </button>
        </div>
        {displayOpen && (
          <div className="display-sections">
            <div className="grouping-container">
              <span>Grouping</span>
              <button
                onClick={() => setGroupingOpen(!groupingOpen)}
                className="dropdown-btn"
              >
                Status ▼
              </button>
              {groupingOpen && (
                <div className="dropdown-content">
                  <button onClick={handleSortByStatus}>Sort by Status</button>
                </div>
              )}
            </div>

            <div className="ordering-container">
              <span>Ordering</span>
              <button
                onClick={() => setOrderingOpen(!orderingOpen)}
                className="dropdown-btn"
              >
                Priority ▼
              </button>
              {orderingOpen && (
                <div className="dropdown-content">
                  <button onClick={handleSortByPriority}>
                    Sort by Priority
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {renderTickets()}
    </div>
  );
}

export default App;
