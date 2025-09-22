import React from "react";
import { useNavigate } from "react-router-dom";

const UpdateCard = ({
  item,
  handleBlogRequestApprove,
  handleBlogRequestReject,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/viewRequest/${item.requestId}`)}
      className="request-card"
      key={item.requestId}
    >
      <div className={`badge ${item.request_type}`}>
        {item.request_type.toUpperCase()}
      </div>
      <br />
      <strong>Blog:</strong> {item.new_title} <br />
      <strong>Content: </strong>
      {item.new_content?.length > 30 ? (
        <span>{item.new_content.slice(0, 30)}+" ..."</span>
      ) : (
        <span>{item.new_content}</span>
      )}
      <br />
      <strong>Requested by:</strong> {item.requested_by} <br />
      <div className="request-actions">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleBlogRequestApprove(item.requestId);
          }}
        >
          Approve
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleBlogRequestReject(item.requestId);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default UpdateCard;
