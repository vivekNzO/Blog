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

    console.log(requestId);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "delete request rejected" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in rejectDeleteRequests handler" });
  }
};

export const getManageRequests = async (req, res) => {
  try {
    const [result] = await pool.query(`
      SELECT br.id AS requestId, br.blog_id, br.request_type, br.new_title, br.new_content, br.status, br.requested_at,br.reason, u.username as requested_by,b.title as blog_title
      FROM manage_requests as br
      JOIN 
      users u ON br.requested_by = u.id
      LEFT JOIN blogs b ON br.blog_id = b.id
      WHERE br.status = 'pending'
      ORDER BY requested_at DESC
      `);

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No pending blog requests found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in get ManageRequests handler" });
  }
};

export const approveManageRequests = async (req, res) => {
  const conn = await pool.getConnection();
  try {
    const { requestId } = req.params;
    await conn.beginTransaction();

    const [rows] = await conn.query(
      `
      SELECT * FROM manage_requests WHERE id = ? AND status = 'pending'
      `,
      [requestId]
    );
    if (rows.length === 0) {
      conn.rollback();
      return res.status(404).json({ message: "No request found" });
    }
    const request = rows[0];
    if (request.request_type === "create") {
      await conn.query(
        `
        INSERT INTO blogs (title,content,author_id)
        VALUES (?,?,?)
        `,
        [request.new_title, request.new_content, request.requested_by]
      );
    } else if (request.request_type === "update") {
      await conn.query(
        `
        UPDATE blogs SET title = ?, content = ? WHERE id = ?
        `,
        [request.new_title, request.new_content, request.blog_id]
      );
    }else if(request.request_type==='delete'){
      await conn.query(`
        DELETE from blogs where id = ?
        `,[request.blog_id])
    }

    await conn.query(
      `
      UPDATE manage_requests SET status = 'approved' WHERE id = ?
      `,
      [requestId]
    );

    await conn.commit();
    res.status(200).json({ message: "Request approved successfully" });
  } catch (error) {
    await conn.rollback();
    console.log(error);
    res.status(500).json({ message: "error in approveManageRequests handler" });
  } finally {
    conn.release();
  }
};

export const rejectManageRequests = async (req, res) => {
  try {
    const { requestId } = req.params;
    const [result] = await pool.query(
      `
      UPDATE manage_requests SET status = 'rejected' WHERE id = ?
      `,
      [requestId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json({ message: "Request rejected successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error in rejectManageRequests handler" });
  }
};
