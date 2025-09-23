import express from 'express'
import {  approveManageRequests,  getManageRequests,  rejectManageRequests } from '../controllers/adminControllers.js'

const router = express.Router()

// router.get("/delete-requests",getDeleteRequests)
// router.post("/delete-requests/:requestId/approved",approveDeleteRequest)
// router.post("/delete-requests/:requestId/rejected",rejectDeleteRequest)
router.get("/blog-requests",getManageRequests)
router.post("/blog-requests/:requestId/approved",approveManageRequests)
router.post("/blog-requests/:requestId/rejected",rejectManageRequests)

export default router