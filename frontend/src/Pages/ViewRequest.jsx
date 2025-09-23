import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/axios";
import parse from "html-react-parser"

const ViewRequest = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  // console.log(requestId)
  const [manageRequestsData, setManageRequestsData] = useState({});
  const [content,setContent] = useState("")
  const fetchManageRequestsData = async () => {
    try {
      const res = await API.get("/admin/blog-requests");
      //   console.log(res.data)
      const blog = res.data.find(
        (item) => item.id === Number(requestId)
      );
      setManageRequestsData(blog);
      setContent(blog.content)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchManageRequestsData();
  }, [requestId]);

  useEffect(() => {
    // console.log(manageRequestsData);
    // console.log(typeof manageRequestsData.content, manageRequestsData.content);

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
        <div className="blog-detail">
          <h1>{manageRequestsData.title}</h1>
          <p>
            <span>Content: </span>
            {/* {parse(manageRequestsData?.new_content)} */}
            {parse(content)}
          </p>
          <div className="blog-footer">
            <div className="author">
              Author: {manageRequestsData.username}
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
    </div>
  );
};

export default ViewRequest;
