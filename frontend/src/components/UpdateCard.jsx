import React from "react";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser"

const UpdateCard = ({
  item,
  handleBlogRequestApprove,
  handleBlogRequestReject,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/viewRequest/${item.id}`)}
      className="request-card"
      key={item.id}
    >
    <div>
      {/* <div className={`badge ${item.request_type}`}>
        {item.request_type.toUpperCase()}
      </div> */}
      {/* <br /> */}
      <strong>Blog:</strong> {item.title} <br />
      <strong>Content: </strong>
      {item.content?.length > 30 ? (
        <span>{parse(item.content.slice(0, 30))} ...</span>
      ) : (
        <span>{parse(item.content)}</span>
      )}
      <br />
      <strong>Requested by:</strong> {item.username} <br />
      </div>
      <div className="request-actions">
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleBlogRequestApprove(item.id);
          }}
        >
          Approve
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleBlogRequestReject(item.id);
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default UpdateCard;
