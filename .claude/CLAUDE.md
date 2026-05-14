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
