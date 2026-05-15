-- 00000000000001_init_extensions_schemas.sql
-- Phase 1 Plan 02 — extensions + schemas (INFRA-06, INFRA-07)

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

CREATE SCHEMA IF NOT EXISTS ops;
CREATE SCHEMA IF NOT EXISTS stripe;

COMMENT ON SCHEMA ops IS 'Internal operations (audit_log, notifications_log, jobs)';
COMMENT ON SCHEMA stripe IS 'Stripe webhook idempotency + cached state';
