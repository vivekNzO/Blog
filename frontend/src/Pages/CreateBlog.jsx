import React, { useState } from "react";
import API from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Ckeditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect } from "react";
import DropdownTreeSelect from "react-dropdown-tree-select";
import CategorySelector from "../components/CategorySelector";
import Tree from "../components/Tree";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const fetchCategories = async (req, res) => {
    try {
      const res = await API.get("/categories");
      console.log(res.data);
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(()=>{
    console.log(title)
    console.log(content)
    console.log(selectedCategory)
  },[title,content,selectedCategory])

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/blog/create", { title, content, categoryId : selectedCategory });
      alert("Blog creation request submitted for approval");
      navigate("/");
    } catch (error) {
      console.log("Error in Creating blog", error);
    }
  };
  return (
    <div className="edit-blog-container">
      <form className="edit-blog-form" onSubmit={handleCreate}>
      

        <div>
          <label>Title</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            maxLength={70}
          />
          <small>
            {title.length === 70 && (
              <span style={{ color: "Red" }}>
                Title can’t be longer than 70 characters.
              </span>
            )}
          </small>
        </div>

        <Tree  setSelectedCategory={setSelectedCategory}/>


        <div className="my-editor">
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

        <button type="submit">Post Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
