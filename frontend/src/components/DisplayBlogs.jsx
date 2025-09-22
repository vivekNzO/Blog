import React, { useContext, useEffect, useState } from "react";
import API from "../utils/axios.js";
import "../styles/blogs.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../store/AuthContext.jsx";
import Card from "./Card.jsx";
import Pagination from "./Pagination.jsx";

const DisplayBlogs = () => {
  const [blogsData, setBlogsData] = useState([]);
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedBlogs = [...blogsData].sort(
    (a, b) => b.id-a.id
  );

  const blogsPerPage = 12;
  const totalPage = Math.ceil(blogsData.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = sortedBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleDelete = async (id) => {
    try {
      await API.delete(`/blog/delete/${id}`);
      setBlogsData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.log("Error deleting blog", error);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog/read");
        // console.log(res.data)
        setBlogsData(res.data);
      } catch (error) {
        console.log("error fetching blogs", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <>
      <div className="blogs-list">
        {currentBlogs?.length > 0 ? (
          currentBlogs.map((blog) => (
            <Card key={blog.id} blog={blog} handleDelete={handleDelete} />
          ))
        ) : (
          <p>No Blogs Found</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default DisplayBlogs;
