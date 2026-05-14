# Hummi

## What This Is

Hummi es una plataforma web de servicios de limpieza profesional en Kitchener, Waterloo, Cambridge y Guelph (Ontario), para clientes residenciales y comerciales (oficinas, locales, post-construcción). Los clientes crean cuenta, registran una o más propiedades (casa, departamento, oficina, local), contratan limpiezas de tres formas (one-shot, paquete pre-pagado o suscripción recurrente con cadencia custom), pagan en línea y ven todo su historial desde un dashboard. Hummi opera con un panel de administración interno para asignar cuadrillas, gestionar visitas y dar seguimiento a clientes.

## Core Value

Que un cliente de KW/Cambridge/Guelph — residencial o comercial — pueda agendar y pagar una limpieza para su propiedad en menos de 5 minutos, y que vuelva a contratar sin volver a capturar nada.

## Requirements

### Validated

<!-- Capacidades ya presentes en el codebase actual del template -->

- ✓ Landing page pública con marketing del servicio — existing (FreshFlow sections)
- ✓ Routing SPA (React Router 7) y layout base — existing
- ✓ Cliente Supabase inicializado y env vars validados — existing (`src/lib/supabase.ts`)
- ✓ Pipeline CI con lint + typecheck + build en GitHub Actions — existing
- ✓ Deploy a Vercel configurado — existing

### Active

<!-- Hipótesis v1 — todo esto se valida al shippear -->

**Autenticación y cuentas**
- [ ] Cliente puede crear cuenta con email + password (Supabase Auth)
- [ ] Cliente puede iniciar sesión con Google OAuth
- [ ] Cliente puede recuperar contraseña por email
- [ ] Cliente verifica su teléfono por SMS-OTP (Twilio Verify) **después de elegir fecha/hora, antes de pagar**
- [ ] Cliente puede capturar tipo de cuenta: personal (residencial) o business (comercial)
- [ ] Cliente business puede capturar nombre legal, Business Number, HST # para invoices

**Gestión de propiedades**
- [ ] Cliente puede registrar una propiedad (residencial o comercial)
- [ ] Sistema valida que la propiedad esté en zona (lista de postal codes de KW/Cambridge/Guelph)
- [ ] Cliente captura datos para cotizar:
  - Residencial: recámaras, baños (full + half), m² o rango de tamaño, mascotas, tipo (casa/depa/townhouse)
  - Comercial: m² del local, tipo (oficina/retail/post-construction), horario preferido, accesos
- [ ] Cliente puede registrar múltiples propiedades en su cuenta
- [ ] Cliente puede editar o eliminar propiedades guardadas
- [ ] Notas y instrucciones especiales por propiedad y por visita

**Catálogo de servicios y cotización**
- [ ] Catálogo de servicios v1:
  - Residencial: Standard, Deep, Move-In/Move-Out, Post-Construction
  - Comercial: Oficinas (regular), Locales/Retail, Post-Construction comercial
- [ ] Pricing residencial: calculado por atributos (recámaras × baños × m² × tipo de servicio) + add-ons
- [ ] Pricing comercial: calculado por m² × tipo de servicio
- [ ] Reglas de pricing editables desde admin panel (versionadas por `effective_from`)
- [ ] HST 13% itemizado en quote y checkout (Hummi registrado con CRA desde día 1)
- [ ] Cotización visible antes de crear cuenta (transparent pricing)

**One-shot bookings**
- [ ] Cliente solicita un servicio individual eligiendo propiedad, fecha y ventana de tiempo
- [ ] Cliente paga con tarjeta (Stripe Payment Element) — soporte para Apple Pay y Google Pay
- [ ] Cliente recibe email de confirmación con detalles
- [ ] Cliente business recibe invoice formal con su Business Number/HST #

**Paquetes pre-pagados**
- [ ] Cliente compra paquete de N visitas pre-pagadas (2–24 visitas)
- [ ] Paquetes son no-expiry (las visitas no caducan)
- [ ] Cliente agenda visitas del paquete cuando quiera (no obligatorio al momento de comprar)
- [ ] Sistema descuenta visitas del paquete conforme se usan

**Suscripciones recurrentes (cadencia custom)**
- [ ] Cliente contrata una suscripción con cadencia custom (cliente elige el intervalo — ej: cada 7 días, cada 14, cada 21, cada 30)
- [ ] Stripe Checkout subscription mode cobra automáticamente
- [ ] `proration_behavior: "none"` para evitar prorrateos confusos
- [ ] Cliente puede pausar, cancelar o cambiar método de pago desde Stripe Customer Portal
- [ ] Renovación automática con aviso 7 días antes via `invoice.upcoming`
- [ ] Cancelación de suscripción en un click (compliance Ontario CPA)

**Dashboard del cliente**
- [ ] Cliente ve próxima visita (hero card) + lista de próximas
- [ ] Cliente ve historial de visitas pasadas con opción "rebook this visit"
- [ ] Cliente ve métodos de pago (vía Stripe Customer Portal)
- [ ] Cliente ve y descarga invoices/recibos (Stripe-hosted)
- [ ] Cliente ve su suscripción/paquete activo y visitas restantes
- [ ] Cliente puede cancelar/reprogramar una visita si cumple política de cancelación
- [ ] Cliente puede gestionar preferencias de notificación (CASL-compliant)

**Política de cancelación**
- [ ] Cancelación >24h antes: sin costo
- [ ] Cancelación <24h antes: cobra 50% o forfeit de una visita del paquete
- [ ] No-show: cobra 100%
- [ ] Admin puede aplicar override manual de la política
- [ ] Política configurable desde admin panel

**Comunicación con el cliente**
- [ ] Email de confirmación al contratar/pagar (Resend + React Email)
- [ ] Recordatorio email + SMS 24h antes de la visita (cron `pg_cron` + `pg_net`)
- [ ] Aviso "equipo en camino" SMS cuando admin marca status (Postgres trigger)
- [ ] Email post-servicio pidiendo review (T+24h)
- [ ] Email de renovación próxima 7 días antes (suscripciones)
- [ ] Email de pago fallido con link para retry
- [ ] Reviews se guardan internamente (no se publican en landing en v1)

**Panel de administración (interno)**
- [ ] Admin login con role en `app_metadata` (separado del flujo de cliente)
- [ ] Admin panel en `/admin/*` (lazy-loaded, role-gated)
- [ ] Cola de servicios solicitados pendientes de asignar
- [ ] Vista de calendario con todas las visitas
- [ ] Admin asigna cuadrilla a cada visita
- [ ] Admin marca estado de cada visita (asignada, en camino, completada, cancelada)
- [ ] Customer 360: ver clientes, propiedades, suscripciones, paquetes, pagos
- [ ] Gestión de pricing rules (con `effective_from` versioning)
- [ ] Gestión de catálogo de servicios
- [ ] Gestión de política de cancelación
- [ ] Gestión de zona de cobertura (postal codes)
- [ ] Gestión de cuadrillas (crews)
- [ ] Refund + comp-visit credits con un click
- [ ] Cola de pagos fallidos
- [ ] Audit log append-only (Postgres trigger)
- [ ] RBAC con roles `admin` y `staff`

**Plataforma**
- [ ] Web app en inglés (cliente final)
- [ ] Responsive (mobile-first es lo más usado en booking)
- [ ] Stripe Tax habilitado (HST itemizado en checkout)
- [ ] Stripe live mode antes de launch
- [ ] Stripe + Supabase webhooks con verificación de firma + idempotencia
- [ ] Two Supabase projects: staging (previews) + prod (production only)
- [ ] Twilio toll-free verification iniciada en Fase 1 (lead time 2–3 semanas)

### Out of Scope

- App nativa para clientes (iOS/Android) — web responsive cubre v1
- Vista/app propia para cleaners — la operación con cleaners se maneja vía WhatsApp/teléfono en v1
- Auto-asignación de cuadrillas — admin lo hace manual hasta validar volumen
- Tracking GPS en vivo de la cuadrilla — el aviso de "en camino" basta para v1
- Versión en español del frontend — clientes objetivo son anglo-canadienses
- Cobertura fuera de KW/Cambridge/Guelph — validar postal codes restringe el alcance
- Programa de referidos / cupones — feature de growth para v1.5
- Reviews públicos visibles en la landing — review se pide pero no se publica todavía
- Google Places autocomplete de direcciones — input manual en v1, autocomplete en v1.1
- Net-30 / invoicing diferido — todos los clientes pagan upfront en v1
- Cancellation windows distintas a 24h — 24h fijo en v1 (configurable después)
- Chat in-app con cleaner — comunicación por SMS/teléfono
- Marketplace de cleaners independientes — Hummi opera con sus propias cuadrillas
- Servicios de carpetas / ventanas / pressure-wash — equipment-heavy, subcontratar si surge
- Más de 3 tiers de plan — decisión paralysis
- Magic-link como único método de login — confunde demografía 35-65
- Cadencias fijas semanales/bisemanales — v1 soporta cadencia custom y eso cubre todos los casos

## Context

**Stack actual ya en el repo:**
- React 19.1 + TypeScript 5.9 + Vite 7
- React Router 7 (createBrowserRouter)
- Supabase JS 2.105 (cliente inicializado, sin tablas todavía)
- Stripe preparado (env var configurado, paquete NPM aún no instalado)
- Deploy automático a Vercel desde main
- CI con lint + typecheck + build

**Stack a sumar (decidido por research):**
- TanStack Query v5 (data fetching/caching)
- React Hook Form v7 + Zod v3 (forms y validación)
- Radix UI primitives à la carte + `clsx` + `sonner` (UI app, sin Tailwind/shadcn full)
- `date-fns` v4 + `@date-fns/tz` + `react-day-picker` v9 (fechas con tz Toronto)
- `@stripe/stripe-js` + `@stripe/react-stripe-js` (Payment Element + Customer Portal + Checkout subscription mode)
- Resend + `@react-email/components` (transactional email)
- Twilio (SMS via Edge Functions; nunca en browser)
- Sentry + Vercel Web Analytics
- Vitest + Testing Library + MSW + Playwright

**Segmentos de mercado:**
- Residencial: casa/depa/townhouse en KW + Cambridge + Guelph. Pago anticipado con tarjeta.
- Comercial: oficinas, locales, post-construction. Pago anticipado con tarjeta + invoice formal con Business Number/HST #.

**Template visual:**
- Construido sobre FreshFlow (React/Vite). Aplanado a la raíz del repo.
- Convenciones: `pages/` solo ensambla, `sections/` tiene la UI.
- Bootstrap 5 grid + CSS module-specific. Animaciones con Swiper, lucide-react, sweetalert2.
- Mantener Bootstrap grid en marketing; Radix primitives solo en app surfaces (modales, popovers).

**Comunicaciones:**
- Email transaccional: Resend + React Email components. Postmark como runner-up si deliverability falla.
- SMS: Twilio (toll-free CA con CSCA verification, lead time 2–3 semanas).

**Pagos:**
- Stripe es la apuesta. Tres modos: Payment Element (one-shot y package), Stripe Checkout subscription mode (mensual), Customer Portal (métodos de pago, invoices, cancel).
- Stripe Tax con product code `txcd_20030000`, `tax_behavior: "exclusive"`, persistir `tax_amount` y `tax_jurisdiction`.
- Stripe webhooks en Supabase Edge Functions, con verificación de firma sobre raw body + idempotencia via PK `stripe.stripe_events.id`.

**Geografía:**
- Cobertura: KW (Kitchener N2, Waterloo N2L/N2J/N2K/N2T/N2V), Cambridge (N1R/N1S/N1T/N3C/N3E/N3H), Guelph (N1E/N1G/N1H/N1K/N1L). FSA-only en v1, LDU opcional luego.

**Compliance Ontario:**
- HST 13% itemizado desde día 1 (Hummi registrado con CRA antes de Fase 6).
- CASL: opt-in explícito para emails de marketing, unsubscribe en 10 días.
- PIPEDA: privacy policy + breach notification process.
- Ontario CPA: one-click subscription cancel, 10-day cooling-off, renewal disclosure.

## Constraints

- **Tech stack**: Debe construirse encima del template FreshFlow ya aplanado en el repo — React 19, Vite, Supabase. No reescribir base.
- **Backend**: Supabase como única fuente. Edge Functions para lógica sensible (webhooks Stripe, envío de SMS, OTP). Nada de servidor Node separado.
- **Deploy**: Vercel (frontend) + Supabase (backend). Sin contenedores ni infra adicional.
- **Pagos**: Stripe, no otros gateways. Customer Portal donde sea posible para ahorrar UI propia.
- **Idioma**: Solo inglés para cliente final. Documentación interna en español está bien.
- **Geografía**: Servicio restringido a postal codes de KW/Cambridge/Guelph. Bloquear registros fuera de zona.
- **Compatibilidad**: ES2022+, navegadores modernos. Sin soporte IE/legacy.
- **CI**: Toda la rama main debe pasar lint + typecheck + build antes de mergear.
- **Seguridad**: Service-role key nunca en el browser. RLS forced en todas las tablas. CI grep falla build en `VITE_.*SERVICE` strings en `src/`.
- **HST**: Hummi se registra con CRA antes de launch — no esperar al threshold de $30k.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Calcular precio por propiedad (no fijo) | El costo real varía mucho por m²/atributos. Cotizar por reglas da márgenes consistentes sin manual review en cada job. | — Pending |
| Pricing residencial = atributos; comercial = m² | Modelos distintos: residencial es complejo (rec/baños/sqft), comercial es simple por m². | — Pending |
| Asignación manual de cuadrillas en v1 | Validar volumen primero. Auto-asignación es complejidad antes de tener demanda. | — Pending |
| Sin app de cleaners en v1 | La operación interna por WhatsApp funciona con pocas cuadrillas. | — Pending |
| Web app solo en inglés | Mercado objetivo es Ontario anglo. | — Pending |
| Validar zona por postal code FSA | Estricto y previene servicios fuera de cobertura desde el inicio. | — Pending |
| MVP completo: one-shot + paquete + suscripción + admin | Lanzas el producto entero, no el wedge. | — Pending |
| Stripe + Supabase como única infra | Ya está parcialmente integrado, evita backend custom. | — Pending |
| Email + Google como auth primario; SMS-OTP como verificación de teléfono | Auth principal es fricción baja; SMS confirma teléfono real para reminders. | — Pending |
| OTP timing: después de elegir fecha/hora, antes de pagar | Reduce friction de signup y solo verifica clientes con intención real. | — Pending |
| HST: registrar con CRA desde día 1 | Stripe Tax simple, sin retro-ajustes; mejor para scale-oriented launch. | — Pending |
| Apple Pay + Google Pay en checkout | Sube conversión mobile, cero costo adicional con Payment Element. | — Pending |
| Direcciones: input manual + postal code en v1, Google Places en v1.1 | Sale v1 sin costo extra; si fricción duele, agregamos Places. | — Pending |
| Referidos: v1.5, no v1 | Reduce scope. Aplicar cuando ya tengamos clientes contentos. | — Pending |
| Reviews: guardar internamente, no publicar | Coincide con visión inicial. Publicar después de validar quality. | — Pending |
| Cancellation: 24h libre / <24h 50% / no-show 100% | Estándar de la industria, balance entre flexibilidad y operación. | — Pending |
| Recurring cadence: custom (cliente elige intervalo) | Cubre semanal/bi/mensual y casos comerciales únicos en un solo modelo. | — Pending |
| Atender residencial Y comercial desde v1 | Doble mercado vale la complejidad extra de catalogos y pricing distintos. | — Pending |
| B2B: pago anticipado + invoice con Business Number/HST # | Simple cobranza (sin Net-30), pero invoicing formal para deducción. | — Pending |
| Admin panel en mismo Vite SPA bajo /admin/*, lazy-loaded | Ahorra build pipeline aparte. Lazy chunk no carga en customer bundle. | — Pending |
| Stripe Payment Element + Checkout subscription + Customer Portal | Ahorra semanas de UI propia (cancel, invoice download, card update). | — Pending |
| Resend + React Email para transactional | Mejor DX. Postmark fallback si deliverability falla. | — Pending |
| pg_cron + pg_net para scheduled jobs | Todo en Postgres, sin Inngest/QStash extra. | — Pending |
| Two Supabase projects (staging + prod) | Previene preview deploys golpeando prod DB. | — Pending |

---
*Last updated: 2026-05-14 after scope expansion (residential + commercial) and decision gates*
