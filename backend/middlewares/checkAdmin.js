export const checkAdmin=async(req,res,next)=>{
    if(req.user.role!=='admin')return res.status(403).json({message:"Forbidden Admins Only"})
    next()
}