const pool = require("../config/db");

const emptyProfile = {
  business: {},
  services: [],
  targeting: {
    industries: [],
    companySizes: [],
    decisionMakers: [],
  },
  problems: [],
  portfolio: [],
  sources: {},
};

async function ensureBusinessProfileTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS business_profiles (
      id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      business JSONB NOT NULL DEFAULT '{}'::jsonb,
      services JSONB NOT NULL DEFAULT '[]'::jsonb,
      targeting JSONB NOT NULL DEFAULT '{}'::jsonb,
      problems JSONB NOT NULL DEFAULT '[]'::jsonb,
      portfolio JSONB NOT NULL DEFAULT '[]'::jsonb,
      sources JSONB NOT NULL DEFAULT '{}'::jsonb,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

function normalizeProfile(profile = {}) {
  return {
    business: profile.business || {},
    services: Array.isArray(profile.services) ? profile.services : [],
    targeting: {
      industries: Array.isArray(profile.targeting?.industries)
        ? profile.targeting.industries
        : [],
      companySizes: Array.isArray(profile.targeting?.companySizes)
        ? profile.targeting.companySizes
        : [],
      decisionMakers: Array.isArray(profile.targeting?.decisionMakers)
        ? profile.targeting.decisionMakers
        : [],
    },
    problems: Array.isArray(profile.problems) ? profile.problems : [],
    portfolio: Array.isArray(profile.portfolio) ? profile.portfolio : [],
    sources: profile.sources || {},
  };
}

async function saveBusinessProfileRecord(profile) {
  await ensureBusinessProfileTable();

  const normalized = normalizeProfile(profile);

  const result = await pool.query(
    `
    INSERT INTO business_profiles
    (
      id,
      business,
      services,
      targeting,
      problems,
      portfolio,
      sources,
      updated_at
    )
    VALUES
    (1, $1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    ON CONFLICT (id)
    DO UPDATE SET
      business = EXCLUDED.business,
      services = EXCLUDED.services,
      targeting = EXCLUDED.targeting,
      problems = EXCLUDED.problems,
      portfolio = EXCLUDED.portfolio,
      sources = EXCLUDED.sources,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *;
    `,
    [
      JSON.stringify(normalized.business),
      JSON.stringify(normalized.services),
      JSON.stringify(normalized.targeting),
      JSON.stringify(normalized.problems),
      JSON.stringify(normalized.portfolio),
      JSON.stringify(normalized.sources),
    ]
  );

  return result.rows[0];
}

function rowToProfile(row) {
  if (!row) {
    return emptyProfile;
  }

  return {
    id: row.id,
    business: row.business || {},
    services: row.services || [],
    targeting: row.targeting || emptyProfile.targeting,
    problems: row.problems || [],
    portfolio: row.portfolio || [],
    sources: row.sources || {},
    updatedAt: row.updated_at,
  };
}

exports.saveBusinessProfileRecord = saveBusinessProfileRecord;

exports.getBusinessProfile = async (req, res) => {
  try {
    await ensureBusinessProfileTable();

    const result = await pool.query(
      "SELECT * FROM business_profiles WHERE id = 1"
    );

    res.json({
      success: true,
      profile: rowToProfile(result.rows[0]),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.saveBusinessProfile = async (req, res) => {
  try {
    const row = await saveBusinessProfileRecord(req.body);

    res.json({
      success: true,
      profile: rowToProfile(row),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
