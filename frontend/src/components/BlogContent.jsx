import parse from "html-react-parser";

const BlogContent = ({ content }) => {
  return <div className="blog-content">{parse(content)}</div>;
};
