import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/axios";
import "../styles/BlogDetail.css"
import parse from "html-react-parser";

const BlogDetail = ({ blogsData }) => {
  const { id } = useParams();
  console.log(id)
  const [data,setData] = useState(null)
  const navigate = useNavigate()

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
    <div>
    <div className="blog-detail">
      <h1>{data.title}</h1>
      <p>{parse(data.content)}</p>
      <div className="blog-footer">
      <div className="author">Author: {data.username}</div>
      <button onClick={()=>navigate(`/blog/update/${data.id}`)}>Edit</button>
      </div>
    </div>
    </div>
  );
};

export default BlogDetail;
