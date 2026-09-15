-- Migration: 0001_initial_schema
-- Created: 2026-04-09
-- Target: Supabase (PostgreSQL 15+)
-- Purpose: Foundation tables for contact form submissions and waitlist sign-ups.
--          Run this when a contact form or newsletter CTA is added to the site.

-- ─── Tracking Table ───────────────────────────────────────────────────────────
-- Records which migrations have been applied. Created first.
CREATE TABLE IF NOT EXISTS _migrations (
  id         SERIAL PRIMARY KEY,
  filename   TEXT        NOT NULL UNIQUE,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Contact Submissions ──────────────────────────────────────────────────────
-- Stores form submissions when a "Book a Call" or contact form is added.
CREATE TABLE IF NOT EXISTS contacts (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  company      TEXT,
  message      TEXT        NOT NULL,
  service_type TEXT        CHECK (service_type IN ('gtm', 'performance_marketing', 'ai_automation', 'abm', 'general')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for lookups by email (admin queries)
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);

-- ─── Waitlist / Newsletter ────────────────────────────────────────────────────
-- Stores email sign-ups from CTA sections.
CREATE TABLE IF NOT EXISTS waitlist (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT        NOT NULL UNIQUE,
  source          TEXT,                            -- e.g. 'hero_cta', 'footer'
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ                      -- NULL = active
);

-- Index for active subscriber queries
CREATE INDEX IF NOT EXISTS waitlist_active_idx
  ON waitlist (email)
  WHERE unsubscribed_at IS NULL;

-- ─── Row-Level Security (Supabase) ────────────────────────────────────────────
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anon (frontend) to insert only: never read
CREATE POLICY "anon_insert_contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_insert_waitlist"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service role (backend/admin) gets full access via default Supabase grants
