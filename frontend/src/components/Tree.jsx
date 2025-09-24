import React from "react";
import { TreeSelect } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import API from "../utils/axios";
const Tree = ({ setSelectedCategory }) => {
  const [treeData, setTreeData] = useState([]);
  const [value, setValue] = useState(null);

  const handleTree = async () => {
    const res = await API.get("/categories");
    const data = res.data;
    const formatTree = (nodes) =>
      nodes.map((node) => ({
        label: node.category,
        value: node.id,
        children: formatTree(node.subCategories || []),
      }));
    setTreeData(formatTree(data));
  };

  const handleChange = (newValue) => {
    console.log("Selected value:", newValue);
    setSelectedCategory(newValue)
    setValue(newValue);
  };
  useEffect(() => {
    handleTree();
  }, []);
  return (
    <TreeSelect
    placeholder={"Select Category"}
      value={value}
      treeData={treeData}
      onChange={handleChange}
    />
  );
};

export default Tree;
