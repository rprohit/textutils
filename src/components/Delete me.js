import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import Switch from "@material-ui/core/Switch";

export default function App() {
  const [initialUserGroup, setInitialUserGroup] = useState("");
  const [userGroup, setUserGroup] = useState("");
  const [data, setData] = useState([]);
  const [viewAllRequests, setViewAllRequests] = useState(false);

  const fetchData = () => {
    // make API call with group parameter
    // example API call URL: https://example.com/data?group={group}
    // replace this with your own API call
    const group = viewAllRequests ? "" : userGroup;
    const completed = viewAllRequests ? "false" : "true";
    const url = `https://jsonplaceholder.typicode.com/todos?completed=${completed}&userId=${group}`;
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
      });
  };

  useEffect(() => {
    // fetch initial user group
    // replace this with your own API call
    fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then((response) => response.json())
      .then((result) => {
        setInitialUserGroup(result[0].userId);
      });
  }, []);

  useEffect(() => {
    // fetch data whenever userGroup or any of the other dependent variables change
    fetchData();
  }, [userGroup, viewAllRequests]);

  const handleToggleViewAllRequests = () => {
    setViewAllRequests(!viewAllRequests);
  };

  const handleRefresh = () => {
    fetchData();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      <br />
      <br />
      <div style={{ display: "flex", alignItems: "center" }}>
        <span style={{ marginRight: "16px" }}>View All Requests</span>
        <Switch checked={viewAllRequests} onChange={handleToggleViewAllRequests} />
        <span style={{ marginLeft: "16px" }}>View My Requests</span>
      </div>
      <br />
      <MaterialTable
        title={`Requests (${viewAllRequests ? "All" : "My"})`}
        columns={[
          { title: "ID", field: "id" },
          { title: "Title", field: "title" },
          { title: "Status", field: "completed", render: (rowData) => (rowData.completed ? "Completed" : "Not Completed") },
        ]}
        data={data}
      />
    </div>
  );
}
