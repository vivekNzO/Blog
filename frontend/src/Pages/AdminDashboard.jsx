import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/admin/delete-requests");
      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(()=>{
    console.log(requests)
  },[requests])

  const handleApprove = async (requestId) => {
    try {
      await API.post(`/admin/delete-requests/${requestId}/approved`);
      setRequests(requests.filter((r) => r.requestId !== requestId));
      alert("Request approved and blog deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await API.post(`/admin/delete-requests/${requestId}/rejected`);
      await fetchRequests()
      setRequests(requests.filter((r) => r.requestId !== requestId));
      alert("Request rejected");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {requests.length === 0 ? (
        <div>No Requests pending</div>
      ) : (
        <div className="requests-grid">
          {requests.map((item) => (
            <div className="request-card" key={item.created_at}>
              <strong>Blog:</strong> {item.blog_title} <br />
              <strong>Requested by:</strong> {item.requestedBy} <br />
              <strong>Reason:</strong> {item.reason} <br />
              <div className="request-actions">
                <button
                  onClick={() => {
                    handleApprove(item.requestId);
                  }}
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    handleReject(item.requestId);
                  }}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
