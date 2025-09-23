import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import "../styles/card.css";

const Card = ({ blog, handleDelete }) => {
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);

  return (
    <div className="blog-card" onClick={() => navigate(`/blog/${blog.id}`)}>
      {/* Blog Title */}
      <h2>{blog.title}</h2>

      {/* Blog Content */}
      <div className="card-content">{parse(blog.content)}</div>

      {/* Footer: admin buttons + author */}
      <div className="card-footer">
        <div className="author">{`Author: ${blog.username}`}</div>
      </div>
      {authUser?.role === "admin" && (
        <div className="editable">
          <span
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/blog/update/${blog.id}`);
            }}
          >
            Edit
          </span>
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(blog.id);
            }}
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default Card;
