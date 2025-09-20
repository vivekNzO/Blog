import React, { useEffect, useState, useContext } from "react";
import API from "../utils/axios";
import { AuthContext } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/blogs.css";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const { authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog/read");
        // filter blogs where author._id === logged in user
        console.log(res);
        console.log(authUser);
        const myBlogs = res.data.filter(
          (blog) => blog.username === authUser.username
        );
        setBlogs(myBlogs);
        console.log(myBlogs);
      } catch (error) {
        console.error("Error fetching blogs", error);
      }
    };
    if (authUser) {
      fetchBlogs();
    }
  }, [authUser]);

  const handleDelete = async (id) => {
    try {

      if(authUser?.role==='admin'){
        await API.delete(`/blog/delete/${id}`)
        setBlogs(blogs.filter((b)=>b.id!==id))
        return
      }
      const reason = window.prompt(
        "Please enter a reason for deleting this blog"
      );
      if (!reason) return;
      const res = await API.post(`/blog/${id}/requestDelete`, { reason });
      alert("Delete request sent");
      navigate("/");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong please try again");
      }
    }
  };

  return (
    <div>
      <h1>My Blogs</h1>
      <div className="blogs-list">
        {blogs.length === 0 ? (
          <p>You haven’t created any blogs yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h2>{blog.title}</h2>
              <p>{blog.content}</p>
              <div className="editable">
                <button onClick={() => navigate(`/blog/update/${blog.id}`)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBlogs;
