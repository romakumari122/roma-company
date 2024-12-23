import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Sidebar from "./components/Sidebar";
import ChartContainer from "./components/ChartContainer";

const App = () => {
  const [indices, setIndices] = useState([]);
  const [offset, setOffset] = useState(0); // Track offset for fetching
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false); // Handle loading state

  const fetchIndices = (newOffset) => {
    setLoading(true);
    fetch(
      "https://raw.githubusercontent.com/shaktids/stock_app_test/refs/heads/main/dump.csv"
    )
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const start = newOffset;
            const end = newOffset + 20;
            const newData = result.data.slice(start, end);
            setIndices((prevIndices) => [...prevIndices, ...newData]); // Append data
            setLoading(false);
          },
        });
      });
  };

  useEffect(() => {
    fetchIndices(0); // Initial fetch
  }, []);

  const handleSelectIndex = (indexName) => {
    const selected = indices.find((row) => row.index_name === indexName);
    setSelectedIndex(selected);
  };

  const handleLoadMore = () => {
    const newOffset = offset + 20;
    setOffset(newOffset);
    fetchIndices(newOffset); // Fetch next set of data
  };

  return (
    <div style={{ overflow: "hidden" }} className="d-flex flex-row h-screen">
      {/* Sidebar */}
      <div className="w-full bg-gray-800 text-white">
        <Sidebar
          indices={indices.map((row) => row.index_name)}
          onSelect={handleSelectIndex}
          onLoadMore={handleLoadMore}
          loading={loading}
        />
      </div>

      {/* Chart Container */}
      <div className="flex-1 p-4 overflow-y-auto w-100">
        <ChartContainer selectedIndex={selectedIndex} />
      </div>
    </div>
  );
};

export default App;
