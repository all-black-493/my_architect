# UI Context

## Theme

Supports both light and dark mode via CSS variables, with `.dark` class overrides. The design system is driven entirely by semantic tokens defined in `globals.css` and mapped into Tailwind via `@theme inline`.

All styling must use these tokens — no hardcoded hex values or raw Tailwind colors (e.g. `zinc-*`). This ensures consistent theming and easy extensibility.

### Core Color Tokens

| Role                  | CSS Variable              |
|-----------------------|---------------------------|
| Background            | `--background`            |
| Foreground            | `--foreground`            |
| Card                  | `--card`                  |
| Card text             | `--card-foreground`       |
| Popover               | `--popover`               |
| Popover text          | `--popover-foreground`    |
| Primary               | `--primary`               |
| Primary text          | `--primary-foreground`    |
| Secondary             | `--secondary`             |
| Secondary text        | `--secondary-foreground`  |
| Muted                 | `--muted`                 |
| Muted text            | `--muted-foreground`      |
| Accent                | `--accent`                |
| Accent text           | `--accent-foreground`     |
| Destructive           | `--destructive`           |
| Destructive text      | `--destructive-foreground`|
| Border                | `--border`                |
| Input                 | `--input`                 |
| Ring                  | `--ring`                  |

Additional semantic tokens exist for charts and sidebar UI.

### Tailwind Token Usage

Mapped via `@theme inline`, used as:

- `bg-background`
- `text-foreground`
- `bg-card`
- `text-muted-foreground`
- `border-border`
- `bg-accent`
- `text-primary`

Never reference raw variables or hex values in components.

---

## Typography

Fonts are defined in `layout.tsx` using `next/font/google` and applied as CSS variables on `<body>`.

| Role      | Font            | CSS Variable     |
|-----------|------------------|------------------|
| Sans/UI   | Outfit           | `--font-sans`    |
| Serif     | Alegreya         | `--font-serif`   |
| Mono/code | JetBrains Mono   | `--font-mono`    |

- Base UI uses `font-sans`
- Code blocks and technical UI use `font-mono`
- Serif is optional for long-form content

---

## Border Radius

Radius is tokenized and scales with component hierarchy:

| Context           | Token         |
|------------------|--------------|
| Small UI         | `rounded-md` |
| Default surfaces | `rounded-lg` |
| Containers       | `rounded-xl` |

Values derive from `--radius` and its computed variants.

---

## Canvas

### Node Color Palette

Defined in `types/canvas.ts` as `NODE_COLORS`.

| Node fill | Text color | Meaning                |
|----------|-----------|------------------------|
| `#1F1F1F` | `#EDEDED` | Neutral (default)      |
| `#10233D` | `#52A8FF` | Blue                   |
| `#2E1938` | `#BF7AF0` | Purple                 |
| `#331B00` | `#FF990A` | Orange                 |
| `#3C1618` | `#FF6166` | Red                    |
| `#3A1726` | `#F75F8F` | Pink                   |
| `#0F2E18` | `#62C073` | Green                  |
| `#062822` | `#0AC7B4` | Teal                   |

Default node: neutral dark.

---

### Edge Style

- Smooth-step curve
- Arrow marker
- Thin stroke
- Uses light foreground color

Edges are visually secondary to nodes.

---

### Node Shapes

Defined in `NODE_SHAPES`:

- `rectangle` — default
- `diamond` — decision
- `circle` — event
- `pill` — process
- `cylinder` — database
- `hexagon` — external system

Complex shapes use inline SVG.

---

### Connection Handles

- Circular
- Positioned on all sides
- Hidden by default
- Visible on hover

---

### Canvas Background

Uses React Flow `<Background>`.

Background color = `bg-background`.

---

## Component Library

- Built on **shadcn/ui**
- Tailwind-based
- Components live in `components/ui/`
- Always use CLI (`shadcn add`) for consistency

Avoid custom primitives unless necessary.

---

## Layout Patterns

### Editor Workspace

- Full viewport layout
- Left: floating sidebar
- Center: canvas
- Right: AI panel (slide-over)

### Sidebars

- Floating overlay
- `bg-card`
- Subtle border (`border-border`)

### Modals / Dialogs

- Centered
- `rounded-xl`
- Backdrop blur
- Elevated surface (`bg-popover`)

### Navbar

- Top-aligned
- `bg-background`
- Bottom border

---

## Icons

Using Lucide React:

- Stroke-only icons
- Sizes:
  - Inline: `h-4 w-4`
  - Buttons: `h-5 w-5`
  - Feature: `h-8 w-8`