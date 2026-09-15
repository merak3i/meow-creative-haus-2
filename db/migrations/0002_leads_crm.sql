-- Migration: 0002_leads_crm
-- Created: 2026-04-09
-- Target: Supabase (PostgreSQL 15+)
-- Purpose: Leads table for the acquisition funnel. Run this when the site
--          needs to track qualified prospects beyond raw contact submissions.
--
-- Depends on: 0001_initial_schema (for _migrations table)

CREATE TABLE IF NOT EXISTS leads (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT        NOT NULL UNIQUE,
  name            TEXT,
  company         TEXT,
  linkedin_url    TEXT,
  source          TEXT        NOT NULL DEFAULT 'organic',  -- 'organic', 'apollo', 'referral', 'paid'
  stage           TEXT        NOT NULL DEFAULT 'new'
                              CHECK (stage IN ('new', 'contacted', 'qualified', 'proposal', 'closed_won', 'closed_lost')),
  notes           TEXT,
  contacted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for pipeline stage queries (Kanban-style admin view)
CREATE INDEX IF NOT EXISTS leads_stage_idx ON leads (stage);

-- Index for source attribution reporting
CREATE INDEX IF NOT EXISTS leads_source_idx ON leads (source);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Leads are internal only: no anon access
-- All reads/writes go through service role (backend API or Supabase dashboard)
