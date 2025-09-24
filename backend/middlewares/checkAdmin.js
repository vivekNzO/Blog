export const checkAdmin=async(req,res,next)=>{
    if(req.user.role!==1)return res.status(403).json({message:"Forbidden Admins Only"})
    next()
}