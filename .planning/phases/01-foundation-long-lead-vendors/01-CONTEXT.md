# Phase 1: Foundation & Long-Lead Vendors - Context

**Gathered:** 2026-05-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Establecer la disciplina de infraestructura para Hummi: dos proyectos Supabase, CI guardrails que bloquean merges inseguros, gitleaks + npm audit cleanup, Sentry hookup en SPA + Edge Functions, y arrancar las 4 lead-time clocks externas (Twilio toll-free, Stripe Canadian banking, Resend DKIM warmup, CRA HST registration).

Phase 1 NO entrega features de usuario (auth, properties, bookings) — esas viven en fases 2 en adelante. Esta fase entrega la cancha y los árbitros para que las fases siguientes jueguen seguro.

</domain>

<decisions>
## Implementation Decisions

### Supabase setup & migrations
- Dos proyectos: `hummi-staging` (preview/dev) y `hummi-prod` (producción)
- Single-owner por ahora: solo el founder tiene acceso a Studio + service_role en prod
- Migration flow: developer corre `supabase migration new` local → `supabase db push` contra staging → CI aplica a prod automáticamente al mergear a `main`
- Zero edición directa en Studio en prod (INFRA-02)
- Seed mínimo realista en staging: 2-3 servicios, 5-10 FSAs de KW/Cambridge/Guelph, 1 usuario admin
- Postgres extensions habilitadas desde Phase 1: `pgcrypto`, `pg_cron`, `pg_net` (INFRA-06)
- Schemas `ops` y `stripe` creados en ambos proyectos (INFRA-07)

### CI/CD pipeline & guardrails
- **CI provider**: GitHub Actions (free tier, integración nativa)
- **PR checks que bloquean merge** (los 5 completos):
  1. `npm run lint`
  2. `tsc -b` (type check)
  3. `vite build`
  4. `supabase db push --dry-run` contra staging
  5. Secret-leak grep en `src/`
- **Patrones del secret-leak grep**: `VITE_.*SERVICE`, `service_role`, `SUPABASE_SERVICE` (ampliado más allá del exacto de INFRA-04 para cubrir variantes)
- **Red test del secret-grep**: branch dedicada `test/secret-leak-red` con un commit intencional que mete `service_role` en `src/`, y se verifica que CI falla. La branch nunca se mergea; es prueba viva del guardrail (satisface success criterion #2 de Phase 1)
- En `main`: además de los PR checks, se corre `supabase db push` real contra prod

### Vendor lead-times (Twilio / Stripe / Resend / CRA)
- **Tracking doc**: `.planning/VENDORS.md` versionado en repo, con fila por vendor: fecha de aplicación, status, evidencia, contacto/ticket, blocker downstream phase
- **Owner**: el founder hace todas las aplicaciones (requieren business info real: HST, banking, identidad). Claude provee templates/checklists por vendor para acelerar
- **Evidencia mínima por vendor**: screenshot del portal + fecha de submission + email confirmation de cada vendor. Guardado en `.planning/vendors/` o referenciado desde VENDORS.md
- **Definition of "done" para Phase 1**: cada vendor "in flight con fecha de inicio documentada" (NO requiere aprobación final). Las 4 aplicaciones submitidas + evidencia archivada cierran INFRA-10/11/12/13 para Phase 1. La aprobación final se verifica en Phase 5 (Twilio), Phase 6 (Stripe + Resend) y Phase 12 (CRA HST live cutover)

### Sentry & monitoring
- **Plan**: Free tier (5k events/mes alcanza para v1)
- **Sample rate**: 100% en dev/staging, 25% en prod (previene picos al excederse del free tier)
- **Source maps**: upload via CI step después del build (sin esto los stack traces no sirven)
- **Cobertura**: SPA (React) + Edge Functions, ambos con DSN propio en env vars
- **Alerts inicial**: email al founder (Slack/Discord se agrega cuando haya equipo)
- **Synthetic error verification**: una vez instalado, se dispara error sintético desde SPA y desde una Edge Function de prueba; ambos visibles en dashboard satisface success criterion #5

### Secrets management & gitleaks
- **Storage**: 3 lugares aislados según contexto:
  - **GitHub Actions secrets** → para CI (Supabase service_role, Stripe test keys, Sentry auth token)
  - **Supabase Edge Function env vars** → para runtime de Edge Functions (Twilio, Stripe webhook secret, Resend API key)
  - **`.env.local`** → para dev local (en `.gitignore`)
- **`.env.example`** versionado en repo con nombres de variables pero SIN valores
- **Gitleaks**:
  - Pre-commit hook con gitleaks instalado en setup script (INFRA-05)
  - History scan ejecutado una vez antes de cualquier launch
  - **Si se encuentran secrets en history**: rotar la key inmediatamente, documentar la rotación en VENDORS.md (o un audit doc), NO reescribir git history. Reescribir es destructivo en repos colaborativos y una key rotada en history es inofensiva
- **Service-role key**: solo en GH Actions secrets + Supabase Edge Function env (SEC-07 estricto). Nunca aparece en `src/`

### Baseline-debt cleanup scope
- **npm audit**: target = cero high/critical findings antes de cerrar Phase 1. Las 12 vulnerabilidades listadas en `.planning/research/CONCERNS.md` se resuelven en este Phase
- **Template FreshFlow heredado**: scope mínimo. Solo se toca código del template si:
  - Falla lint o tsc
  - Aparece en npm audit
  - Está claramente roto
- **NO se hace refactor preventivo** ni se eliminan componentes/assets "por si acaso". Phase 12 (Lighthouse + accessibility pass) decidirá qué cortar para optimizar bundle. Hasta entonces el código del template que funciona se queda
- **Pre-commit hooks beyond gitleaks**: solo gitleaks por ahora; no se agrega husky/lint-staged en Phase 1 (se evalúa si la velocidad lo justifica más adelante)

### Claude's Discretion
- Estructura exacta de `.github/workflows/*.yml` (un solo workflow vs múltiples)
- Versión específica de Node/npm para CI (usar la del `package.json` engines)
- Formato exacto de `.planning/VENDORS.md` (tabla vs sección por vendor — Claude propone, founder valida)
- Detalles de las Edge Functions de prueba para el synthetic error
- Plantillas de communicación con vendors (Claude las genera para que el founder las use)
- Decisión de implementar pre-commit hook de gitleaks via `pre-commit` framework vs script bash custom

</decisions>

<specifics>
## Specific Ideas

- "Aplicar Twilio toll-free y CRA HST en la primera semana de Phase 1" — son los dos vendors con lead time más largo (2-3 semanas Twilio, varias semanas CRA). Stripe y Resend pueden iniciarse semana 2 sin riesgo
- La doc de vendors (`VENDORS.md`) debe ser tan clara que un futuro colaborador o el contador/abogado pueda verificar el status de cumplimiento sin pedir contexto
- El template FreshFlow es el punto de partida visual — no se toca su estética en Phase 1, solo se asegura que no rompa los guardrails

</specifics>

<deferred>
## Deferred Ideas

- **Husky/lint-staged pre-commit framework** — evaluar en Phase 7 u 8 si el flujo de PR checks se vuelve lento
- **1Password/Bitwarden shared vault** — cuando haya segundo colaborador, agregar como capa sobre GH Actions secrets
- **Slack/Discord alerts de Sentry** — Phase 10 cuando haya equipo de ops
- **Backups + point-in-time recovery custom** — Supabase trae backups diarios en free tier; PITR se evalúa antes de live launch (Phase 12)
- **Cleanup completo del template FreshFlow (código no usado)** — Phase 12 durante el Lighthouse pass
- **Issue/Project board en GitHub** — si VENDORS.md se vuelve insuficiente, migrar a Project board

</deferred>

---

*Phase: 01-foundation-long-lead-vendors*
*Context gathered: 2026-05-14*
