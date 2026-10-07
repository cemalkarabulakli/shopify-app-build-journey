-- Feature board (public roadmap + changelog). Idempotent: safe to re-run.
--   psql "$DATABASE_URL" -f scripts/roadmap-schema.sql
CREATE TABLE IF NOT EXISTS feature_requests (
  id           TEXT PRIMARY KEY,
  title        TEXT        NOT NULL,
  body         TEXT        NOT NULL,
  status       TEXT        NOT NULL DEFAULT 'considering',
  author_email TEXT        NOT NULL,
  author_tier  TEXT,
  note         TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  shipped_at   TIMESTAMPTZ
);
CREATE INDEX IF NOT EXISTS feature_requests_status_idx ON feature_requests (status);
CREATE INDEX IF NOT EXISTS feature_requests_author_idx ON feature_requests (lower(author_email));

-- One row per (request, voter): the primary key *is* the one-vote-per-person rule.
CREATE TABLE IF NOT EXISTS feature_votes (
  request_id  TEXT        NOT NULL REFERENCES feature_requests (id) ON DELETE CASCADE,
  voter_email TEXT        NOT NULL,
  weight      INT         NOT NULL DEFAULT 1,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (request_id, voter_email)
);
CREATE INDEX IF NOT EXISTS feature_votes_request_idx ON feature_votes (request_id);
