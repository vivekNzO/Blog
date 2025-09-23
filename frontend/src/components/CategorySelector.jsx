import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import "react-dropdown-tree-select/dist/styles.css";
import API from '../utils/axios';

const CategorySelector = () => {
    const [treeData,setTreeData] = useState([])

    const handleTree = async()=>{
        const res = await API.get("/categories")
        const data = res.data
        const formatTree = (nodes) =>
          nodes.map(node => ({
            label: node.category,
            value: node.id,
            children: formatTree(node.subCategories || [])
          }));
        setTreeData(formatTree(data));
    }

    const handleChange = (currentNode,selectedNode)=>{
        console.log("Selected nodes:", selectedNodes);
    }
    useEffect(()=>{
        handleTree()
    },[])
  return (
    <div style={{width:"1005"}}>


    <DropdownTreeSelect data={treeData} onChange={handleChange}/>
        </div>
  )
}

export default CategorySelector