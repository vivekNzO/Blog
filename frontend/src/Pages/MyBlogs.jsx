import React, { useEffect, useState, useContext } from "react";
import API from "../utils/axios";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import "../styles/myblogs.css";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog/read");
        const myBlogs = res.data.filter(
          (blog) => blog.username === authUser.username
        );
        setBlogs(myBlogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    if (authUser) {
      fetchBlogs();
    }
  }, [authUser]);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await API.delete(`/blog/delete/${id}`);
      alert("Blog deleted successfully");
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong, please try again");
      }
    }
  };

  return (
    <div style={{ margin: "48px" }}>
      <h1>My Blogs</h1>
      <div className="blogs-list">
        {blogs.length === 0 ? (
          <p>You haven’t created any blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <div
              onClick={() => navigate(`/blog/${blog.id}`)}
              key={blog.id}
              className="blog-card"
            >
              <div className="card-content">
                <h2>{blog.title}</h2>
                <p>{parse(blog.content)}</p>
              </div>
              <div className="card-footer">
                {authUser?.role === 1 && (
                  <div className="editable">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/blog/update/${blog.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button onClick={(e) => handleDelete(e, blog.id)}>
                      Delete
                    </button>
                  </div>
                )}
                <div className="author">{`Author: ${blog.username}`}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
