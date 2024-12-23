import React, { useEffect, useRef } from "react";

const Sidebar = ({ indices, onSelect, onLoadMore, loading }) => {
  const sidebarRef = useRef();

  const handleScroll = () => {
    if (
      sidebarRef.current.scrollTop + sidebarRef.current.clientHeight >=
      sidebarRef.current.scrollHeight
    ) {
      onLoadMore(); // Load more data when scrolled to the bottom
    }
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    sidebar.addEventListener("scroll", handleScroll);
    return () => {
      sidebar.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="d-flex flex-column vh-100 bg-dark text-white p-3"
      style={{ overflowY: "auto",minWidth:"250px" }}
    >
      {/* Sidebar Header */}
      <h2 className="text-center border-bottom pb-3 mb-3 text-uppercase">
        Companies
      </h2>

      {/* Sidebar List */}
      <ul
        style={{ listStyle: "none" }}
        className="px-3 d-flex flex-column"
      >
        {indices.map((index, idx) => (
          <li key={idx}>
            <a
              href="#!"
              className="nav-link text-white rounded py-2 px-3 mb-2 bg-secondary hover:bg-light"
              onClick={() => onSelect(index)}
            >
              {index}
            </a>
          </li>
        ))}
      </ul>

      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
};

export default Sidebar;
