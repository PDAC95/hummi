# Hummi — Planning Document

> **Marca:** Hummi (colibrí 🐦 como mascota — rápido, ligero, preciso, agradable)
> **Estado:** Ideación cerrada — listo para fase de identidad visual y arranque técnico
> **Última actualización:** 2026-05-14

---

## 1. Resumen ejecutivo

Hummi es una plataforma web para servicios de limpieza residencial y comercial en la región **Kitchener-Waterloo-Cambridge-Guelph (KWC + Guelph), Ontario**. Diferenciador: **experiencia digital superior** y **suscripciones flexibles**, posicionándose contra cadenas tradicionales (Molly Maid, Merry Maids, The Maids) que tienen procesos análogos y sitios anticuados.

**Modelo de negocio:** Hummi recibe pedidos bajo su marca y los ejecuta a través de **contratistas externos (outsourcing)** coordinados manualmente por admin. En MVP, los contratistas no existen como usuarios en la app. En Fase 2 se convierte en marketplace con perfil propio para contratistas.

**Modelo de propietario:** negocio nuevo, bootstrap, operador puro (no limpia personalmente).

---

## 2. Mercado y servicios

### Zona piloto
- Kitchener, Waterloo, Cambridge, Guelph (Ontario, Canadá)
- ~700k habitantes, alta densidad de tech workers + universidades + ingresos arriba del promedio
- Expansión futura: Hamilton, Mississauga, GTA

### Servicios ofrecidos
- **Residencial** (casas y departamentos)
- **Comercial** (oficinas, locales)
- **Profunda / post-construcción** (servicio puntual, más caro)
- **Especialidades** (alfombras, vidrios, tapicería, etc.)

> ⚠️ **Nota crítica**: ofrecer los 4 desde el día 1 es ambicioso. Probablemente residencial será el core y el resto complementos según validemos demanda.

### Idiomas
- **MVP**: solo inglés
- **Fase 2**: francés y español (arquitectura preparada con i18n desde el inicio)

---

## 3. Modelo de precios

**Estructura combinada: base por tamaño + add-ons opcionales**

### Base residencial (referencia industria Ontario)
| Tamaño | Precio aprox. CAD |
|---|---|
| 1 rec / 1 baño | $120-160 |
| 2 rec / 1-2 baños | $160-220 |
| 3 rec / 2 baños | $200-280 |
| 4+ rec | $280+ |

### Add-ons (ejemplos)
Interior de horno, refri, ventanas interiores, ropa lavada, etc. — cada uno $20-50 extra.

### Descuento por frecuencia (suscripción)
- Semanal: -20%
- Quincenal: -15%
- Mensual: -10%

### Deep clean / post-construction
1.5x - 2x el precio regular del tamaño.

### Comercial
Por sq ft de oficina + frecuencia: $0.05-0.15 CAD/sq ft por visita.

---

## 4. Modelo de cobros

Cuatro modalidades:
1. **One-time** (servicio único)
2. **Suscripción recurrente** (semanal/quincenal/mensual con auto-cobro)
3. **Paquetes prepagados** (ej. 4 servicios con descuento)
4. **Contratos comerciales** (mensual fijo para empresas)

---

## 5. Operación

### Quién hace la limpieza
- **Contratistas externos** (outsourcing) que facturan a Hummi
- **NO empleados** (evitamos payroll, CPP/EI, WSIB, T4s, etc.)
- Hummi se queda con ~20% como plataforma; el contratista factura el resto

### Cómo se asignan los pedidos
- **Admin (yo)** recibe el pedido y coordina manualmente con el contratista (WhatsApp/teléfono)
- La app **no** conoce a los contratistas en MVP
- El contratista no tiene acceso a la app — recibe instrucciones offline

### Por qué no marketplace desde el inicio
- Negocio nuevo + bootstrap: validar demanda antes de invertir en infraestructura de matching
- Coordinación manual = aprendizaje real del negocio
- Reduce alcance del MVP de 12 semanas a 6-8 semanas

---

## 6. Propuesta de valor única (PVU)

**"The easiest, most flexible way to keep your home spotless in KWC."**

Diferenciadores frente a competencia:

1. **Experiencia digital superior** — agendar en 2 minutos desde el teléfono, autoservicio total, sin llamadas
2. **Suscripciones flexibles** — pausar, cambiar fecha, agregar extras, cancelar sin contratos rígidos

Frente a la competencia (Molly Maid, Merry Maids, The Maids, Tidy/Handy, cleaners independientes en Kijiji):
- Cadenas grandes: sitios anticuados, agendar por teléfono
- Independientes: sin garantías, sin sistema, sin reviews
- **Hummi se posiciona como el cleaning más digital y más friendly de la región.**

---

## 7. Políticas de servicio

### Happiness Guarantee
> "If you're not happy with our work, we'll come back within 24 hours and re-clean the affected areas — at no cost. If it still doesn't meet your standards after re-cleaning, we'll refund that service."

**Reglas internas:**
- Cliente reporta dentro de 24h después del servicio (con fotos si posible)
- Re-clean gratis dentro de 24-48h
- Si persiste insatisfacción, reembolso 100%
- 3+ ocurrencias con mismo cliente → revisión interna

### Cancelación
| Cuándo cancela | Cargo |
|---|---|
| 48+ horas antes | Gratis (100% reembolso/crédito) |
| 24-48 horas antes | 50% del servicio |
| Menos de 24 horas | 100% del servicio |
| Lock-out (no hay nadie) | 100% del servicio |

**Suscripciones:** cancelar la suscripción es gratis siempre. El próximo servicio agendado sigue las reglas de arriba. Puede pausarse hasta X meses (a definir, sugerido: 3 meses).

### Reviews / Ratings
- Después de cada servicio: rating 1-5 estrellas + comentario opcional
- **Privado al inicio** (solo admin lo ve) — para mejora interna
- **Público en Fase 2** cuando tengamos 50+ reviews positivos (para social proof en landing)

---

## 8. Alcance MVP vs Fases posteriores

### 🚀 MVP V1 (~6-8 semanas)

**Sitio público (FreshFlow + customización):**
- Landing con propuesta de valor (hero + valor + cómo funciona + testimonios placeholder)
- Página de servicios (los 4 tipos)
- Página "How it works"
- Página de precios / pricing estimator
- FAQ
- Contact / Get a quote

**Quote Builder (sin registro):**
- Tipo de propiedad
- # recámaras / # baños
- Frecuencia
- Add-ons
- Muestra precio en vivo

**Cliente:**
- Sign up / login (email + Google)
- Agendar one-time service
- Agendar suscripción recurrente
- Pago con Stripe (one-time + Stripe Subscriptions)
- Dashboard: próximos servicios, historial, perfil, direcciones
- Pausar / reagendar / cancelar suscripción
- Reportar problema (happiness guarantee)
- Calificar servicio (rating + comentario)

**Admin (solo yo):**
- Lista de pedidos entrantes con estado (`pending`, `scheduled`, `in_progress`, `completed`, `cancelled`)
- Marcar manualmente cuándo se completa
- Lista de clientes (CRUD básico)
- Vista de finanzas básica (ingresos del mes, próximos cobros recurrentes, MRR)
- Gestión de cancelaciones / reembolsos / créditos
- Atender tickets de happiness guarantee

### 🌱 FASE 2 (mes 4-6, post-validación)

Convertir a marketplace con perfil de contratista:
- Onboarding de contratistas (aplicación + verificación)
- Dashboard móvil del contratista
- Asignación digital admin → contratista
- Fotos obligatorias antes/después
- Stripe Connect para pagos automatizados a contratistas
- Notificaciones SMS / push

### 🌳 FASE 3 (mes 6+)

- Tracking en vivo (mapa con contratista)
- Multi-idioma (FR + ES)
- Mapa/ubicaciones para admin (rutas optimizadas)
- Programa de referidos
- Reviews públicos en sitio
- App nativa (React Native, reusa código React)
- Analytics dashboard avanzado

---

## 9. Stack técnico

| Capa | Tecnología | Razón |
|---|---|---|
| Frontend | React 19 + Vite + TypeScript | Lo que ya tenemos con FreshFlow |
| Routing | react-router 7 | Ya en el template |
| State | Zustand | Simple, suficiente, ligero |
| UI base | FreshFlow template (sitio público) + shadcn/ui (dashboards) | Reutilizar diseño existente + componentes pro para dashboard |
| Forms | react-hook-form + zod | Validación robusta type-safe |
| i18n | react-i18next | Preparado desde MVP aunque solo activemos EN |
| Backend | **Supabase** (Postgres + Auth + Storage + Edge Functions + Realtime) | All-in-one, escala a millones, free tier generoso |
| Auth | Supabase Auth (email/password + Google OAuth) | Incluido |
| Base de datos | PostgreSQL (vía Supabase) | Relaciones complejas (clientes, pedidos, suscripciones, pagos) |
| Pagos | **Stripe** + Stripe Subscriptions | Estándar industria. Stripe Connect en Fase 2. |
| Email transaccional | Resend | 3k emails/mes gratis |
| Mapas (Fase 3) | Google Maps Platform | Estándar, free tier mensual |
| Hosting frontend | **Vercel** | Free tier, deploy automático desde GitHub |

**Costo mensual inicial: $0** (todo free tier). A escala (~50-100 servicios/mes): $30-80 CAD/mes.

**Es un stack profesional, moderno, escalable, sin lock-in fuerte.** Usado por Mozilla, 1Password, GitHub Next, Vercel, Stripe, Shopify, etc.

---

## 10. Identidad de marca

### Nombre
**Hummi** — del colibrí (hummingbird). Atributos comunicados: rápido, ligero, preciso, agradable, no invasivo.

### Dominio
**hummi.ca** (registrado). Suficiente para piloto en Ontario. `.com` y `gethummi.com` se pueden registrar después si hay expansión a EEUU.

### Logo
✅ Logo creado y aprobado. Guardado en `.claude/brand/`.

**Características visuales:**
- Mascota: colibrí estilizado con alas extendidas (transmite movimiento, velocidad)
- Paleta principal: teal/turquesa + azul oscuro + acento amarillo (pico)
- Wordmark "HUMMI" en sans-serif bold mayúsculas
- Disponible en composición vertical (logo arriba + wordmark abajo) y horizontal (logo a la izquierda + wordmark a la derecha)

**Pendientes de logo:**
- [ ] Conseguir versión SVG (vector) para web
- [ ] Variante en fondo claro
- [ ] Variante monocromática (1 color)
- [ ] Favicon (versión simplificada para 32x32 px)

### Paleta de colores (derivada del logo, a refinar)
- **Primario (teal)**: tono fresco, comunica limpieza
- **Secundario (azul oscuro / navy)**: profesionalismo, confianza
- **Acento (amarillo cálido)**: del pico del colibrí — call-to-action, alegría
- **Neutros**: blancos, grises suaves
- Documentar tokens de color exactos en CSS variables / Tailwind config

### Tagline (drafts a iterar)
- "Cleaning, in a flash"
- "Quick. Quiet. Spotless."
- "Your home, brighter"

### Vibe
- **Friendly / cercano** (no corporativo, no aspiracional premium)
- Mobile-first
- Inspiración: Mailchimp, Trello, Notion (warm tech)

### Pendientes
- [ ] Trademark search en CIPO (Canadian Intellectual Property Office)
- [ ] Definir tipografía oficial (la del wordmark + tipografía complementaria para UI)
- [ ] Sistema de design tokens (colores, spacing, radius, shadows)

---

## 11. Cronograma estimado

| Fase | Duración | Entregable |
|---|---|---|
| **Pre-build** | 1-2 semanas | Identidad visual, dominio, registro de negocio (sole proprietorship Ontario), insurance |
| **MVP build** | 6-8 semanas | App funcionando: landing + quote + agendar + pagar + dashboard cliente + admin básico |
| **Pre-launch** | 1-2 semanas | Beta con 5-10 clientes amigos, ajustes |
| **Soft launch** | mes 3 | Lanzamiento en KWC, marketing ligero (Google Ads + SEO local) |
| **Fase 2** | mes 4-6 | Convertir a marketplace (perfil contratista) |
| **Fase 3** | mes 6+ | Tracking, multi-idioma, app nativa, etc. |

---

## 12. Pendientes / acción inmediata

### Negocio
- [ ] Investigar requisitos legales en Ontario (sole proprietorship vs corporation)
- [ ] GST/HST registration (obligatorio al superar $30k/año, opcional antes)
- [ ] Liability insurance ($1-2M de cobertura, ~$50-100/mes)
- [ ] Contratos con contratistas (independent contractor agreement)
- [ ] Revisar clasificación CRA (independent contractor vs employee) para evitar problemas
- [ ] Definir terms of service y privacy policy (CASL compliance para emails)
- [ ] Validar política de pausar suscripción (¿hasta cuántos meses?)

### Marca
- [ ] Validar dominio (`hummi.com` vs `hummi.ca` vs `gethummi.com`)
- [ ] Trademark search CIPO
- [ ] Brief de identidad visual con un diseñador (logo + branding)
- [ ] Definir paleta y tipografía final

### Producto
- [ ] Crear repo de proyecto (separar del template, nueva estructura)
- [ ] Setup Supabase project + Stripe account
- [ ] Wireframes/mockups del cliente y admin dashboards
- [ ] Setup CI/CD con Vercel + GitHub
- [ ] Definir esquema de base de datos (schema SQL)

### Operación
- [ ] Identificar y reclutar 1-2 contratistas para piloto
- [ ] Definir SOP (standard operating procedures) de cómo asignar trabajos
- [ ] Definir checklist de calidad para cada tipo de limpieza
- [ ] Definir flujo de soporte al cliente (canal: email? chat?)

---

## 13. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Pocos contratistas confiables al inicio | Empezar muy pequeño (1-2), no aceptar más jobs de los que pueden cubrir |
| Cancelaciones de último minuto | Política clara + fee de cancelación tardía + buffer en agenda |
| Insatisfacción del cliente | Happiness guarantee robusta + ratings + admin proactivo |
| Competencia barata (Kijiji) | Diferenciar por experiencia y consistencia, no por precio |
| Mal clima (invierno Ontario) | Política de reagendar gratis por causas de fuerza mayor |
| CRA reclasifica contratistas como empleados | Contratos sólidos + asegurar contratistas tienen su business + asesoría contable |
| Stripe dispute / chargeback alto | Documentar bien servicios + happiness guarantee proactiva |

---

## 14. Métricas de éxito MVP

Para considerar el MVP exitoso a los 90 días post-lanzamiento:
- **20+ clientes activos** (al menos 5 con suscripción recurrente)
- **MRR (Monthly Recurring Revenue): ≥$1,500 CAD**
- **CSAT (customer satisfaction): ≥4.5/5 average**
- **Churn mensual: <10%**
- **Re-clean rate (happiness guarantee triggered): <5% de servicios**
- **Tiempo agendar primera vez: <3 minutos**

---

> **Documento vivo.** Este es el plan al cierre de la ideación inicial. Se actualizará conforme decidamos identidad visual, validemos dominio, y arranquemos build.
