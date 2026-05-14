# Hummi

## What This Is

Hummi es una plataforma web de servicios de limpieza residencial para Kitchener, Waterloo, Cambridge y Guelph (Ontario). Los clientes crean cuenta, registran una o más propiedades, contratan limpiezas de tres formas (one-shot, paquete pre-pagado o suscripción mensual), pagan en línea y ven todo su historial desde un dashboard. Hummi opera con un panel de administración interno para asignar cuadrillas, gestionar visitas y dar seguimiento a clientes.

## Core Value

Que un cliente de KW/Cambridge/Guelph pueda agendar y pagar una limpieza para su casa en menos de 5 minutos, y que vuelva a contratar sin volver a capturar nada.

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
- [ ] Cliente puede verificar su teléfono por SMS (OTP)
- [ ] Cliente puede recuperar contraseña por email

**Gestión de propiedades**
- [ ] Cliente puede registrar una propiedad (dirección + datos para cotizar: m², recámaras, baños)
- [ ] Sistema valida que la propiedad esté en zona (lista de postal codes de KW/Cambridge/Guelph)
- [ ] Cliente puede registrar múltiples propiedades en su cuenta
- [ ] Cliente puede editar o eliminar propiedades guardadas

**Cotización y servicios one-shot**
- [ ] Sistema calcula precio del servicio en función de los atributos de la propiedad
- [ ] Cliente puede elegir tipo de servicio (estándar, profunda, move-in/out, etc.)
- [ ] Cliente puede solicitar un servicio individual eligiendo propiedad, fecha y hora
- [ ] Cliente paga el servicio con tarjeta (Stripe)
- [ ] Cliente recibe email de confirmación con detalles

**Paquetes pre-pagados**
- [ ] Cliente puede comprar un paquete de N visitas pre-pagadas
- [ ] Cliente elige los días/fechas de las visitas del paquete (o las agenda después)
- [ ] Cliente paga el paquete completo de una vez
- [ ] Sistema descuenta visitas del paquete conforme se usan

**Suscripciones mensuales**
- [ ] Cliente puede contratar una suscripción con N servicios al mes
- [ ] Stripe Subscriptions cobra mensualmente
- [ ] Cliente puede pausar/cancelar suscripción desde su dashboard
- [ ] Renovación automática y aviso de cobro próximo

**Dashboard del cliente**
- [ ] Cliente ve visitas próximas
- [ ] Cliente ve historial de visitas pasadas
- [ ] Cliente ve métodos de pago guardados (con Stripe)
- [ ] Cliente ve y descarga invoices/recibos
- [ ] Cliente ve su suscripción/paquete activo y visitas restantes
- [ ] Cliente puede cancelar/reprogramar una visita si cumple con la política de cancelación

**Comunicación con el cliente**
- [ ] Email de confirmación al contratar/pagar
- [ ] Recordatorio (email/SMS) 24h antes de la visita
- [ ] Aviso de "equipo en camino" antes de la visita
- [ ] Email post-servicio pidiendo calificación/review

**Panel de administración (interno)**
- [ ] Admin login (separado del flujo de cliente)
- [ ] Admin ve cola de servicios solicitados pendientes de asignar
- [ ] Admin asigna cuadrilla a cada visita
- [ ] Admin marca estado de cada visita (asignada, en camino, completada, cancelada)
- [ ] Admin ve listado de clientes, propiedades y suscripciones
- [ ] Admin ve estado de pagos e invoices
- [ ] Admin gestiona el catálogo de servicios y reglas de pricing
- [ ] Admin gestiona política de cancelación (ventana, penalización)
- [ ] Admin gestiona zona de cobertura (postal codes)

**Plataforma**
- [ ] Web app en inglés (cliente final)
- [ ] Responsive (mobile-first es lo más usado en booking)

### Out of Scope

- App nativa para clientes (iOS/Android) — web responsive cubre v1, validar demanda primero
- Vista/app propia para cleaners — la operación con cleaners se maneja vía WhatsApp/teléfono en v1
- Auto-asignación de cuadrillas — admin lo hace manual hasta que valide volumen
- Tracking GPS en vivo de la cuadrilla — el aviso de "en camino" basta para v1
- Versión en español del frontend — clientes objetivo son anglo-canadienses
- Cotización manual / negociada — precio se calcula por reglas de la propiedad
- Servicios no residenciales (comercial, oficinas) — foco residencial primero
- Cobertura fuera de KW/Cambridge/Guelph — validar postal codes restringe el alcance
- Programa de referidos / cupones — feature de growth para después de v1
- Reviews públicos visibles en la landing — review se pide pero no se publica todavía

## Context

**Stack actual ya en el repo:**
- React 19.1 + TypeScript 5.9 + Vite 7
- React Router 7 (createBrowserRouter)
- Supabase JS 2.105 (cliente inicializado, sin tablas todavía)
- Stripe preparado (env var configurado, paquete NPM aún no instalado)
- Deploy automático a Vercel desde main
- CI con lint + typecheck + build

**Template visual:**
- Construido sobre FreshFlow (React/Vite). Aplanado a la raíz del repo.
- Convenciones: `pages/` solo ensambla, `sections/` tiene la UI.
- Bootstrap 5 grid + CSS module-specific. Animaciones con Swiper, lucide-react, sweetalert2.

**Comunicaciones:**
- Email transaccional necesario desde v1 (confirmaciones, recordatorios, reviews). Proveedor por decidir (Resend / Postmark / SendGrid).
- SMS necesario para OTP de signup + recordatorios. Proveedor por decidir (Twilio típicamente).

**Pagos:**
- Stripe es la apuesta. Tres modos: charge único (one-shot y paquete), Subscription (mensual). Customer Portal de Stripe puede ayudar para métodos de pago e invoices.
- Stripe webhooks se manejan en Supabase Edge Functions (Stripe secret nunca en el browser).

**Geografía:**
- Cobertura: KW (Kitchener N2, Waterloo N2L/N2J/N2K/N2T/N2V), Cambridge (N1R/N1S/N1T/N3C/N3E/N3H), Guelph (N1E/N1G/N1H/N1K/N1L). Lista exacta a confirmar.

## Constraints

- **Tech stack**: Debe construirse encima del template FreshFlow ya aplanado en el repo — React 19, Vite, Supabase. No reescribir base.
- **Backend**: Supabase como única fuente. Edge Functions para lógica sensible (webhooks Stripe, envío de SMS). Nada de servidor Node separado.
- **Deploy**: Vercel (frontend) + Supabase (backend). Sin contenedores ni infra adicional.
- **Pagos**: Stripe, no otros gateways. Customer Portal donde sea posible para ahorrar UI propia.
- **Idioma**: Solo inglés para cliente final. Documentación interna en español está bien.
- **Geografía**: Servicio restringido a postal codes de KW/Cambridge/Guelph. Bloquear registros fuera de zona.
- **Compatibilidad**: ES2022+, navegadores modernos. Sin soporte IE/legacy.
- **CI**: Toda la rama main debe pasar lint + typecheck + build antes de mergear.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Calcular precio por propiedad (no fijo) | El costo real de limpiar varía mucho por m²/recámaras/baños. Cotizar por propiedad da márgenes consistentes sin pedir manual review en cada job. | — Pending |
| Asignación manual de cuadrillas en v1 | Validar volumen primero. Auto-asignación es complejidad antes de tener demanda. | — Pending |
| Sin app de cleaners en v1 | La operación interna por WhatsApp funciona con pocas cuadrillas. Cuando crezca, se evalúa. | — Pending |
| Web app solo en inglés | Mercado objetivo es Ontario anglo. Bilingüe agrega complejidad sin payoff claro todavía. | — Pending |
| Validar zona por postal code | Más estricto que ciudad y previene servicios fuera de cobertura desde el inicio. | — Pending |
| MVP completo (one-shot + paquete + suscripción + admin) | Quieres lanzar el producto entero, no el wedge. Asumimos plazo y scope mayor. | — Pending |
| Stripe + Supabase como única infra | Ya está parcialmente integrado, evita backend custom. | — Pending |
| Email + Google + SMS-OTP como auth | Email/Google bajan fricción de signup; SMS-OTP confirma teléfono real, clave para recordatorios y "en camino". | — Pending |

---
*Last updated: 2026-05-14 after initialization*
