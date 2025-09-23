import pool from "../config/db.js"

export const getCategories= async(req,res)=>{
    try {
        const [rows] = await pool.query(`
            SELECT * FROM categories
            `)

            const buildTree = (parentId = null)=>{
                return rows.filter(row=>row.parent_id===parentId)
                .map((cat)=>({
                    id:cat.id,
                    category:cat.category,
                    subCategories:buildTree(cat.id)
                }))
            }

            const categories = buildTree()
        res.status(200).json(categories)
    } catch (error) {
        console.log("error in getCategories handler",error)
    }
}