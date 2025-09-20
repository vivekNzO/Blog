import express from 'express'
import { approveDeleteRequest, getDeleteRequests, rejectDeleteRequest } from '../controllers/adminControllers.js'

const router = express.Router()

router.get("/delete-requests",getDeleteRequests)
router.post("/delete-requests/:requestId/approved",approveDeleteRequest)
router.post("/delete-requests/:requestId/rejected",rejectDeleteRequest)

export default router