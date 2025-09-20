import pool from "../config/db.js";

export const getDeleteRequests = async (req, res) => {
  try {
    const [result] = await pool.query(`
            SELECT dr.id AS requestId, dr.blog_id, dr.reason, dr.status, dr.created_at,u.username AS requestedBy, 
            b.title AS blog_title
            FROM delete_requests dr
            JOIN users u ON dr.user_id = u.id
            JOIN blogs b ON dr.blog_id = b.id
            WHERE dr.status = 'pending'
            ORDER BY dr.created_at DESC
            `);

    if (result.length === 0)
      return res.status(404).json({ message: "No delete requests as of now" });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error in getDeleteRequests handler" });
  }
};

export const approveDeleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const [rows] = await pool.query(
      `
            SELECT * from delete_requests WHERE id = ? AND status = 'pending'
            `,
      [requestId]
    );
  console.log("URL:", req.originalUrl);
  console.log("Params:", req.params);
    if (rows.length === 0) {
      return res.status(404).json({ message: "request not found" });
    }

    const request = rows[0];
    await pool.query(
      `
            DELETE FROM blogs WHERE id = ?
            `,
      [request.blog_id]
    );

    await pool.query(
      `UPDATE delete_requests SET status = "approved" WHERE ID = ?`,
      [requestId]
    );
    res
      .status(200)
      .json({ message: "Blog deleted and request approved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in approvDeleteRequest handler" });
  }
};

export const rejectDeleteRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const [result] = await pool.query(
      `
            UPDATE delete_requests SET status = 'rejected' WHERE id = ? AND status = 'pending'
            `,
      [requestId]
    );

    console.log(requestId)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "delete request rejected" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in rejectDeleteRequests handler" });
  }
};
