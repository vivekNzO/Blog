import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/axios";
import "../styles/BlogDetail.css"

const BlogDetail = ({ blogsData }) => {
  const { id } = useParams();
  console.log(id)
  const [data,setData] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog/read");
        const blog = res.data.find((item) => item.id === Number(id));
        if (blog) {
            setData(blog)
        }
      } catch (error) {
        console.log("Error fetching blog", error);
      }
    };
    fetchBlogs();
  }, [id]);

  if (!data) return <p>Blog not found</p>;

  return (
    <div className="blog-detail">
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <div className="author">Author: {data.username}</div>
    </div>
  );
};

export default BlogDetail;
