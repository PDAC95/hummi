-- supabase/seed.sql
-- Staging-only seed. Runs after migrations on `supabase db reset` and locally.
-- Real data (services, FSAs, admin user) will be added when those tables exist (Phases 3-4).
-- This file is intentionally minimal in Phase 1.

-- Placeholder: no seedable data yet — schemas exist, tables do not.
SELECT 'Phase 1 seed: schemas created, awaiting Phase 3-4 tables' AS note;
