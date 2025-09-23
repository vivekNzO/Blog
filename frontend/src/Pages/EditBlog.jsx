import React, { useEffect, useState } from "react";
import API from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/createblog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blog/read");
        // console.log(res)
        const blog = res.data.find((item) => item.id == id);
        if (blog) {
          setTitle(blog.title);
          setContent(blog.content);
        }
      } catch (error) {
        console.log("Error fetching blog", error);
      }
    };
    fetchBlogs();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/blog/update/${id}`, { title, content });
      alert("Blog updated successfully");
      navigate("/");
    } catch (error) {
    //   if (
    //     error.response.data.message ===
    //     "You already have a pending request for this blog"
    //   ) {
    //     alert("You already have a pending request for this blog");
    //   }
      console.log("Error updating blog", error);
    }
  };
  return (
    <div className="edit-blog-container">
      <form className="edit-blog-form" onSubmit={handleUpdate}>
        <div>
          <label>Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div style={{ "min-height": "400px" }}>
          <label>Content</label>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => {
              const data = editor.getData();
              setContent(data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "|",
                "numberedList",
                "bulletedList",
                "|",
                "blockQuote",
                "|",
                "insertTable",
                "|",
                "undo",
                "redo",
              ],
              table: {
                contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
              },
            }}
          />
        </div>

        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
