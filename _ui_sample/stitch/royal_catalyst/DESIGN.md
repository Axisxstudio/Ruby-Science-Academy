```markdown
# Design System Specification: The Academic Curator

## 1. Overview & Creative North Star
This design system is built upon the **"Academic Curator"** philosophy. In a digital landscape cluttered with generic educational "dashboards," our goal is to present information with the authority of a high-end editorial journal and the fluidity of a modern immersive experience. 

We move beyond the "boxed-in" feeling of traditional LMS platforms. This system utilizes **Intentional Asymmetry** and **Tonal Depth** to guide the student’s eye. By breaking the rigid 12-column grid with overlapping elements and dramatic typography scales, we transform "studying" into a premium "viewing" experience. This is not just a tool; it is a high-value environment that signals prestige and results.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in "Strong Academic Blue" but elevated through luminous accents. We use color not just for branding, but as a functional tool for navigation and cognitive load reduction.

### The Color Tokens (Material Design Mapping)
*   **Primary:** `#002868` (The Anchor) / **Primary Container:** `#0A3D91` (The Surface)
*   **Secondary:** `#006688` / **Secondary Container:** `#00C2FD` (The Luminous Accent)
*   **Tertiary (Subject Accents):**
    *   **Chemistry:** `#802900` (On-Tertiary-Fixed-Variant) / `#FF6B2C`
    *   **Physics:** `#FFA726`
    *   **Maths:** `#00A99D`
*   **Neutral Surfaces:**
    *   **Surface Lowest:** `#FFFFFF` (For high-focus cards)
    *   **Surface (Base):** `#F8F9FF` (The canvas)
    *   **Surface Container High:** `#DBE9FE` (For sidebars and structural depth)

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be achieved through:
1.  **Tonal Shifts:** Placing a `surface-container-lowest` card on a `surface-container-low` background.
2.  **Negative Space:** Using the Spacing Scale to create "islands" of content.

### Glassmorphism & Signatures
To inject "soul" into the academic structure, use **Glassmorphism** for floating navigation and overlay modals.
*   **Effect:** Surface Color + 60% Opacity + 20px Backdrop Blur.
*   **Glow Accents:** For high-priority CTAs, use a subtle `secondary-container` outer glow (8px blur, 30% opacity) to signify energy and momentum.

---

## 3. Typography: The Editorial Voice
We use two distinct typefaces to balance academic authority with modern accessibility.

*   **Display & Headlines:** *Plus Jakarta Sans*. This is our "Editorial" voice. It must be bold and tightly kerned (-0.02em) to feel high-end and authoritative.
*   **Body & UI Labels:** *Manrope*. This is our "Functional" voice. Its geometric clarity ensures legibility during long study sessions.

### Typography Scale
| Role | Font | Size | Weight | Intent |
| :--- | :--- | :--- | :--- | :--- |
| **Display-LG** | Plus Jakarta Sans | 3.5rem | 800 | Hero/Landing Statements |
| **Headline-MD** | Plus Jakarta Sans | 1.75rem | 700 | Section Headers |
| **Title-LG** | Manrope | 1.375rem | 600 | Card Titles |
| **Body-LG** | Manrope | 1rem | 400 | Long-form Course Content |
| **Label-MD** | Manrope | 0.75rem | 500 | Tags and Metadata |

---

## 4. Elevation & Depth: The Layering Principle
We reject the "flat" web. This design system treats the screen as a physical workspace with stacked layers.

*   **Tonal Layering:** Hierarchy is achieved by nesting. 
    *   *Level 0:* `surface-dim` (Background)
    *   *Level 1:* `surface-container-low` (Content Areas)
    *   *Level 2:* `surface-container-lowest` (Active Cards/Modals)
*   **Ambient Shadows:** Traditional drop shadows are forbidden. Use **Ambient Soft-Shadows**:
    *   `Box-shadow: 0 20px 40px rgba(13, 27, 42, 0.06);` (Tinted with Dark Navy).
*   **Ghost Borders:** If a boundary is strictly required for accessibility, use `outline-variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components & Interaction

### Buttons (The "Result" Drivers)
*   **Primary:** Solid `primary` fill. Roundedness: `full`. Subtle `secondary-container` glow on hover.
*   **Secondary:** `surface-container-lowest` fill with a `ghost-border`.
*   **Tertiary:** Text-only in `primary-fixed-variant` with an animated underline on hover.

### The "Curated" Cards
*   **Style:** `2xl` (1rem) rounded corners. No borders.
*   **Padding:** Generous (2rem) to allow content to breathe.
*   **Imagery:** Use "Polished Framing"—all images inside cards must have a `md` (1.5rem) corner radius and a subtle inner shadow to look inset into the surface.

### Inputs & Fields
*   **Style:** Minimalist. `surface-container-low` background. 
*   **Active State:** Transitions to `surface-container-lowest` with a 2px `secondary` bottom-accent line. No full-frame focus rings.

### Specific Educational Components
*   **Progress Orbs:** Instead of flat bars, use circular "Electric Cyan" gradients to show course completion, mimicking a "loading" energy.
*   **Subject Badges:** Pill-shaped, using high-contrast subject accents (e.g., Chemistry Orange) with `on-tertiary` text.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Overlapping Elements:** Let an image "break" the container of a card to create 3D depth.
*   **Embrace Whitespace:** If you think there is enough space, add 20% more. Premium equals breathing room.
*   **Use Subtle Gradients:** Apply a faint gradient from `primary` to `primary-container` on large buttons to avoid a "flat" plastic look.

### Don’t:
*   **Don't use 100% black text:** Use `on-surface` (`#0F1C2C`). Pure black breaks the premium "ink-on-paper" feel.
*   **Don't use Divider Lines:** Never use horizontal rules (`<hr>`). Use a 48px or 64px vertical gap to separate thoughts.
*   **Don't use Default Grids:** Avoid perfectly symmetrical rows of 3 cards. Offset the middle card by 24px vertically to create a curated, gallery-style rhythm.
*   **Don't use "Hard" Corners:** Everything must feel approachable. Even the smallest chip must have at least a `sm` (0.5rem) radius.

---
**Director's Note:** Remember, we are building an academy, not a website. Every interaction should feel intentional, quiet, and high-value. If a component feels "standard," it isn't finished.```