# Epic2077 — Portfolio Todo List

## 🔴 Critical Bugs

- [x] **`next.config.mjs`** — Remove `ignoreBuildErrors: true` and `ignoreDuringBuilds: true`. TypeScript and ESLint errors are silently swallowed on every build.
- [x] **`next.config.mjs`** — Set `productionBrowserSourceMaps` to `false`. Currently exposes full source code in production DevTools.
- [x] **`page.tsx`** — Remove `'use client'` from the root page. Forces the entire tree client-side, disabling SSR and breaking SEO / social link previews.
- [x] **`ContactSection.tsx`** — Replace the mock `setTimeout` with a real email service (Resend, Formspree, or EmailJS). Messages currently go nowhere. _(Resend wired via `/api/contact`; set `RESEND_API_KEY` in env)_
- [ ] **`ProjectsSection.tsx` / `ContactSection.tsx`** — Replace all `href="#"` placeholders with real URLs for project demos, GitHub repos, LinkedIn, and Twitter/X. _(needs your URLs)_

---

## 🟠 Medium Bugs

- [x] **`Header.tsx`** — Wire up `activeSection` state with an IntersectionObserver. It's initialized to `''` and never updated, so the active nav highlight never fires.
- [x] **`CustomCursor.tsx`** — Add `mouseenter`/`mouseleave` cleanup in the `useEffect` return. Currently only `mousemove` is removed, causing a memory leak on long sessions.
- [x] **`CustomCursor.tsx`** — Hide the cursor elements on touch/mobile devices. They render at `(0,0)` when no mouse is present.
- [x] **`Footer.tsx`** — Guard `window.scrollTo` behind a client-side check or convert to `'use client'`. Will throw a hydration error as-is.
- [x] **`not-found.tsx`** — Replace `text-onBackground` with `text-foreground`. `--on-background` is not defined in the theme and the class does nothing.

---

## 🟡 Minor Bugs

- [x] **`LoadingScreen.tsx`** — Add a `sessionStorage` flag so the loading animation is skipped on repeat visits within the same session.
- [ ] **`public/`** — Add a real `favicon.ico`. `layout.tsx` references it but it doesn't exist; the browser tab shows a broken icon.
- [ ] **`layout.tsx`** — Replace the Open Graph image (`app_logo.png`) with a proper 1200×630 banner image for correct social media previews.
- [x] **Root** — Add a `.env.example` file documenting `NEXT_PUBLIC_SITE_URL` and any other env variables.

---

## 🟢 Features to Add

### High Impact

- [x] **Resume download** — Added "Download CV" button in Hero CTAs, links to `/assets/Ashkan-resume.pdf`.
- [x] **Real contact form backend** — Resend API route at `/api/contact` with rate limiting, server-side validation, and honeypot.
- [x] **`prefers-reduced-motion` support** — `useReducedMotion` hook gates the canvas animation, parallax, and count-up stats.
- [x] **Active nav tracking** — Complete the `activeSection` IntersectionObserver in `Header.tsx`.

### Medium Impact

- [x] **Real profile photo** — `AboutSection` now uses `/assets/images/Ashkan.png`.
- [x] **`⌘K` command palette** — `CommandPalette` with section jumps, copy email, open GitHub/LinkedIn, download resume.
- [x] **Skip / one-time loading screen** — Press `Escape` to skip; persisted in `sessionStorage`.
- [x] **Testimonials section** — `TestimonialsSection` with 3 placeholder quotes _(replace with real ones when you have them)_.
- [x] **Animated stat counters** — `AnimatedNumber` count-up triggered on scroll into view.

### Polish

- [ ] **ARIA accessibility** — Add proper `role`, `aria-label`, and keyboard support to the Experience timeline, project cards, and Skills tabs.
- [x] **Scroll-to-top button** — `ScrollToTop` button bottom-left, appears after 600px scroll.
- [x] **Project filter by tech stack** — Tag-based filtering chips in `ProjectsSection`.
- [ ] **`/blog` or `/writing` route** — A placeholder writing section improves SEO surface area and signals depth.
