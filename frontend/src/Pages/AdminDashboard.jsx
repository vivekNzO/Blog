import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import "../styles/adminDashboard.css";

import UpdateCard from "../components/UpdateCard";

const AdminDashboard = () => {
  const [manageRequestsData, setManageRequestsData] = useState([]);

  const fetchManageRequestsData = async () => {
    try {
      const res = await API.get("/admin/blog-requests");
      setManageRequestsData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchManageRequestsData();
  }, []);

  useEffect(() => {
    console.log(manageRequestsData);
  }, [manageRequestsData]);

  // const handleApprove = async (requestId) => {
  //   try {
  //     await API.post(`/admin/delete-requests/${requestId}/approved`);
  //     setRequests(manageRequestsData.filter((r) => r.requestId !== requestId));
  //     alert("Request approved and blog deleted");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleReject = async (requestId) => {
  //   try {
  //     await API.post(`/admin/delete-requests/${requestId}/rejected`);
  //     setRequests(manageRequestsData.filter((r) => r.requestId !== requestId));
  //     alert("Request rejected");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleBlogRequestApprove = async (requestId) => {
    try {
      const res = await API.post(`/admin/blog-requests/${requestId}/approved`);
      setManageRequestsData(
        manageRequestsData.filter((item) => item.id !== requestId)
      );
      alert("Blog approved successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const handleBlogRequestReject = async (requestId) => {
    try {
      const res = await API.post(`/admin/blog-requests/${requestId}/rejected`);
      setManageRequestsData(
        manageRequestsData.filter((item) => item.id !== requestId)
      );
      alert("Blog rejected successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        {manageRequestsData.length === 0 ? (
          <div>No Requests pending</div>
        ) : (
          <div className="requests-grid">
            {manageRequestsData.map((item) =>
                <UpdateCard key={item.id} item={item} handleBlogRequestApprove={handleBlogRequestApprove} handleBlogRequestReject={handleBlogRequestReject}/>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
