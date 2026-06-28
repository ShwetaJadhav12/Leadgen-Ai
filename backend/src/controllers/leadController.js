const pool = require("../config/db");

exports.createLead = async (req, res) => {
  try {
    const {
      name,
      role,
      company,
      industry,
      location,
      summary,
      skills,
      education,
      experience,
      score,
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO leads
      (
        name,
        role,
        company,
        industry,
        location,
        summary,
        skills,
        education,
        experience,
        score
      )
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING *;
      `,
      [
        name,
        role,
        company,
        industry,
        location,
        summary,
        JSON.stringify(skills),
        JSON.stringify(education),
        JSON.stringify(experience),
        score,
      ]
    );

    res.status(201).json({
      success: true,
      lead: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.getLeads = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM leads ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      leads: result.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM leads WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
      lead: result.rows[0],
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};