# Design system

## Visual world

The suite is a living reference library: orderly, calm, and quick to scan. It should feel like a well-indexed collection of useful knowledge rather than a generic dashboard or a catalogue of ad tiles.

## Mode

Operate. The home route helps visitors find and start a task; individual routes help them complete it with familiar controls.

## Direction contract

- **Cultural reference:** public reference libraries and carefully annotated field guides.
- **Product translation:** a calm, information-rich shell with standard web navigation, search, filters, inputs, and buttons.
- **Signature move:** related tools connect through a small, semantic “next useful tool” path. It is never a decorative network or a replacement for navigation.
- **Guardrail:** the reference informs type, palette, density, and the relationship treatment only. It never turns controls or layouts into a costume.

## Tokens

- **Ink:** `#102A43`, for hierarchy and primary text.
- **Canvas:** `#F6F8FB`, for the application background.
- **Paper:** `#FFFFFF`, for focused work surfaces.
- **Mist:** `#E8EEF5`, for quiet grouping and inactive controls.
- **Signal:** `#C76716`, for primary action, selection, and warning emphasis.
- **Positive:** `#1F7A62`, for successful states.
- **Danger:** `#B42318`, for destructive or invalid states.
- **Typography:** Geist Sans for UI and body, Geist Mono for values, formulas, and compact metadata.
- **Shape rule:** work surfaces use 16px corners; inputs use 10px; compact tags are pill-shaped. No other radius families.
- **Motion:** brief transform and opacity transitions only (120–220ms). Motion never communicates information by itself, and collapses under reduced-motion.

## Layout

- A responsive, 12-column container on wide screens collapses to a single reading column on small screens.
- The header is a stable top bar; navigation is an accessible dialog on mobile.
- Tool discovery uses an asymmetric grid: a primary search/workspace region and compact category navigation, not repeated equal cards.
- Tool pages keep the tool beside its explanation at desktop, then stack with results first on mobile.

## Accessibility and themes

Every color pair must meet WCAG 2.2 AA where used for text. Focus rings use a high-contrast ink outline. Light and dark themes share semantic tokens rather than inverting arbitrary values. Reduced motion removes movement while retaining state feedback through color and opacity.
