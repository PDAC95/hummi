# Reglas del proyecto Hummi

## Proyecto
Web app de servicios de limpieza para Kitchener-Waterloo-Cambridge + Guelph (Ontario), construida a partir del template **FreshFlow** (React 19 + TypeScript + Vite). El template original fue aplanado a la raíz del repo — ya no vive en una subcarpeta.

## Tono y estilo de comunicación
- Siempre en **español mexicano**, conversacional, directo y franco.
- Nada de respuestas tipo reporte corporativo con muchos headers, tablas y listas numeradas a menos que se pida explícitamente.
- Párrafos cortos, como si platicáramos. Tutear siempre ("tú", no "usted").
- Cero frases tipo "¡Excelente pregunta!", "Por supuesto", "Estaré encantado de ayudarte". Al grano.
- No ser cheesy ni verbose. Si bastan 2 frases, no escribir 8.
- Headers y tablas solo cuando el contenido lo amerita (código, comparativas reales, análisis técnico solicitado a fondo).
- Inglés únicamente para términos técnicos sin traducción común (bundle, deploy, build, commit, etc.).

## Stack del proyecto
- React 19 + TypeScript 5.9
- Vite 7
- react-router 7 (createBrowserRouter)
- Swiper, lucide-react, sweetalert2, yet-another-react-lightbox
- Context API para estado de UI (no hay store global de datos todavía)

## Convenciones de código
- Mantener la separación `pages/` vs `sections/` del template: las páginas solo ensamblan secciones.
- TypeScript estricto.
- No agregar comentarios obvios; solo cuando el "porqué" no se ve en el código.

## Workflow de Git (GitHub Flow — branch por plan)
- **`main` siempre verde**: nunca commits directos, todo entra vía PR con CI pasando.
- **Una branch por plan de GSD**, no por fase completa. Naming: `phase-XX/YY-slug` (ej: `phase-01/03-ci-guardrails`, `phase-01/04-sentry`).
- **Un PR = un cambio coherente que puede mergear solo**. Si el PR no se puede revisar en <15 min, está demasiado grande — divídelo.
- **Flujo por plan**:
  1. `git checkout -b phase-XX/YY-slug` desde `main` actualizada
  2. Trabajar el plan, commits atómicos
  3. Push → abrir PR a `main` → CI corre los 5 checks
  4. Merge cuando CI pasa Y el plan verifica su `<done>`
  5. Borrar la branch local y remota
- **Respetar las dependencias entre planes**: si el plan B depende de A (vía `depends_on`), no abras la branch de B hasta que A esté mergeada en `main`.
- **Reverts vía PR revert**, nunca `git push --force` a `main`. Branch protection lo bloquea de cualquier forma.
- **Commits**: mensaje en inglés técnico, formato Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`). El cuerpo del PR puede ir en español.
