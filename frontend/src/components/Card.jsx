import React, { useContext } from "react";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";

const Card = ({blog,handleDelete}) => {
  const navigate = useNavigate()
  const { authUser } = useContext(AuthContext);
  return (
    <div className="blog-card" key={blog.id}
    onClick={()=>navigate(`/blog/${blog.id}`)}>
      <div className="blog-content">
        <div>
          <h2>{blog.title}</h2>
          <p>
          {blog.content.length>500 ? (
            <>
              {blog.content.slice(0,500)} <span
                style={{color:"blue",cursor:"pointer"}}> Read more...</span>
            </>
          ):
          (
            blog.content
          )}
          </p>
        </div>
      </div>


      <div>
            {authUser?.role === "admin" && (
        <div className="editable">
          <span
            style={{ color: "red" }}
            onClick={() => navigate(`/blog/update/${blog.id}`)}
          >
            Edit
          </span>
          <span style={{ color: "red" }} onClick={() => handleDelete(blog.id)}>
            Delete
          </span>
        </div>
      )}
      <div className="author">{`Author : ${blog.username}`}</div>
      </div>
      
    </div>
  );
};

export default Card;
