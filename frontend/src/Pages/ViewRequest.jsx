import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/axios";

const ViewRequest = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  // console.log(requestId)
  const [manageRequestsData, setManageRequestsData] = useState({});
  const fetchManageRequestsData = async () => {
    try {
      const res = await API.get("/admin/blog-requests");
      //   console.log(res.data)
      const blog = res.data.find(
        (item) => item.requestId === Number(requestId)
      );
      setManageRequestsData(blog);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchManageRequestsData();
  }, [requestId]);

  useEffect(() => {
    console.log(manageRequestsData);
  }, [manageRequestsData]);

  const handleApprove = async(requestId)=>{
    try {
         await API.post(`/admin/blog-requests/${requestId}/approved`);
         alert("Request approved successfully")
         navigate("/admin/dashboard")
    } catch (error) {
        console.log(error)
    }
  }
  const handleReject = async(requestId)=>{
    try {
         await API.post(`/admin/blog-requests/${requestId}/rejected`);
         alert("Request rejected successfully")
         navigate("/admin/dashboard")
    } catch (error) {
        console.log(error)
    }
  }

  if(!manageRequestsData){
    return <div>Unable to fetch requests</div>
  }

  return (
    <div>
      {manageRequestsData.request_type === "delete" ? (
        <div className="blog-detail">
          <h1
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/blog/${manageRequestsData.blog_id}`)}
          >
            {manageRequestsData.blog_title}
          </h1>
          <p>
            <span>Reason : </span>
            {manageRequestsData.reason}
          </p>
          <div className="blog-footer">
            <div className="author">
              Author: {manageRequestsData.requested_by}
            </div>
          </div>

          <div className="actions">
            <button onClick={(e)=>{
                e.stopPropagation()
                handleApprove(requestId)
            }}>Approve</button>
            <button onClick={(e)=>{
                e.stopPropagation()
                handleReject(requestId)
            }}>Reject</button>
          </div>
        </div>
      ) : (
        <div className="blog-detail">
          <h1>{manageRequestsData.new_title}</h1>
          <p>
            <span>Content: </span>
            {manageRequestsData.new_content}
          </p>
          <div className="blog-footer">
            <div className="author">
              Author: {manageRequestsData.requested_by}
            </div>
          </div>
          <div className="actions">
            <button onClick={(e)=>{
                e.stopPropagation()
                handleApprove(requestId)
            }}>Approve</button>
            <button onClick={(e)=>{
                e.stopPropagation()
                handleReject(requestId)
            }}>Reject</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRequest;
