import React from "react";

function DisplaySection({
  setDisplayOpen,
  displayOpen,
  setGroupingOpen,
  groupingOpen,
  handleSortByStatus,
  setOrderingOpen,
  orderingOpen,
  handleSortByPriority,
}) {
  return (
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
                <button onClick={handleSortByPriority}>Sort by Priority</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplaySection;
