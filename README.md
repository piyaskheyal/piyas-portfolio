# Piyas Ahmed Kheyal — Robotics & Physical AI Portfolio

A modern, high-performance creative portfolio web application engineered for **Piyas Ahmed Kheyal** (Robotics, Physical AI & Simulation Engineer). Built on **Astro 4**, **React 18**, **Tailwind CSS**, and **Framer Motion**, following the **Swiss-grid editorial design system** with warm off-white Light Mode as default, vibrant vermilion `#EB4618` accents, exposed 1px structural gridlines with `+` crosshair markers, scroll blur-to-clear reveals, and interactive technical telemetry inspectors.

---

## 📑 Table of Contents
1. [Tech Stack & Architecture](#-tech-stack--architecture)
2. [Directory Structure](#-directory-structure)
3. [How to Add a New Project (Content Collections)](#-how-to-add-a-new-project)
4. [How to Scale & Customize the Website (`site.ts`)](#-how-to-scale--customize-the-website)
   - [Adding / Editing Core Disciplines (Services)](#1-adding--editing-core-disciplines-services)
   - [Adding / Publishing Research Articles (Blogs)](#2-adding--publishing-research-articles-blogs)
   - [Updating Animated Telemetry Counters](#3-updating-animated-telemetry-counters)
   - [Customizing Engineering Process Phases](#4-customizing-engineering-process-phases)
   - [Managing Lab Endorsements & Testimonials](#5-managing-lab-endorsements--testimonials)
   - [Adding / Editing Engineering FAQs](#6-adding--editing-engineering-faqs)
   - [Updating Contact Info & Socials](#7-updating-contact-info--socials)
5. [Managing Images & Assets](#-managing-images--assets)
6. [Theme Customization (Light vs. Dark)](#-theme-customization)
7. [Commands & Workflow](#-commands--workflow)
8. [Deployment Guide](#-deployment-guide)

---

## ⚡ Tech Stack & Architecture

- **Static Site Engine:** [Astro 4](https://astro.build/) — Ultra-fast static site generator (SSG) with 0-KB runtime JavaScript where static.
- **Interactive Islands:** [React 18](https://react.dev/) — Isolated client components (`client:load`, `client:visible`) for the Slide-Over Inspector Drawer, Command Palette (`⌘K`), and live interactive widgets.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with extended Swiss editorial color tokens (`#EB4618` vermilion, `#F6F6F4` warm off-white canvas, `#111111` ink, `#0F0F0F` carbon).
- **Icons:** [Lucide React](https://lucide.dev/).
- **Content Collections:** Astro type-safe markdown collections backed by [Zod](https://zod.dev/) validation.

---

## 📂 Directory Structure

```text
piyas-portfolio/
├── public/
│   └── images/
│       ├── headshot_noBG.png        # Transparent cutout portrait (Hero background)
│       ├── profile.png              # Standard profile portrait
│       └── ...                      # Project screenshots & diagrams
├── src/
│   ├── components/
│   │   ├── AnimatedCounter.tsx      # Smooth scroll-triggered metric number counter
│   │   ├── BentoShowcase.astro      # 3-column bento grid & telemetry showcase
│   │   ├── BlogPreview.astro        # Asymmetric article preview on Home page
│   │   ├── CommandMenu.tsx          # ⌘K / Ctrl+K instant fuzzy search menu
│   │   ├── ContactBanner.astro      # Global full-width contact banner with form
│   │   ├── DualImageSwitcher.tsx    # Interactive [ ■ • ] dual-photo crossfade toggle
│   │   ├── EngineeringProcess.astro # 4-column dark phase cards with + crosshairs
│   │   ├── ExpandingButton.astro    # Vermilion square expanding CTA button (↗)
│   │   ├── FAQAccordion.tsx         # Interactive +/- numbered FAQ accordion
│   │   ├── HeaderBar.astro          # Sticky vermilion header bar with dividers
│   │   ├── ImpactMetrics.astro      # Impact statistics, asterisk & bio
│   │   ├── MarqueeStrip.astro       # Infinite horizontal toolchain marquee
│   │   ├── NavigationDrawer.tsx     # Fullscreen espresso slide-out menu drawer
│   │   ├── ProjectExplorer.tsx      # Filterable project cards + Inspector Drawer
│   │   ├── ScrollBlurReveal.tsx     # Blur-to-clear text heading unblur on scroll
│   │   ├── ScrollRevealEngine.astro # IntersectionObserver scroll reveal engine
│   │   ├── SelectedProjects.astro   # Selected works section wrapper
│   │   ├── ServiceList.astro        # 3-column engineering disciplines list
│   │   ├── StickyServiceStack.tsx   # Sticky stacking cards on /service page
│   │   ├── SwissFooter.astro        # Global Swiss editorial footer
│   │   └── SwissHero.astro          # 4x3 grid hero with cutout & full name
│   ├── config/
│   │   └── site.ts                  # Central source-of-truth for all modular content
│   ├── content/
│   │   ├── config.ts                # Zod schema definitions for content collections
│   │   └── projects/                # Type-safe project markdown files (.md)
│   │       ├── amr-slam-nav.md
│   │       ├── bipedal-isaaclab.md
│   │       └── so101-vla.md
│   ├── pages/
│   │   ├── index.astro              # Page 1: Home
│   │   ├── about.astro              # Page 2: About Me
│   │   ├── service.astro            # Page 3: Services & Disciplines
│   │   ├── blog.astro               # Page 4: Research Articles
│   │   └── contact.astro            # Page 5: Contact Me & Rig Telemetry
│   └── styles/
│       └── global.css               # Swiss grid lines, typography, animations
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

---

## 🚀 How to Add a New Project

Adding a new project is **100% type-safe and automatic**. When you add a markdown file, it will automatically populate:
1. The **Selected Works Explorer** on the Home page (`/`).
2. The category filtering tabs (`All Systems`, `Bipedal & Isaac Lab`, `VLA & Manipulation`, `AMR & SLAM`).
3. The **Slide-Over Technical Inspector Drawer** with full telemetry specs and copyable CLI launch commands.
4. The **`⌘K` Command Palette** for instant search.

### Step 1: Create a Markdown File
Create a new `.md` file inside `src/content/projects/`:
```bash
touch src/content/projects/my-new-robot.md
```

### Step 2: Fill in the Frontmatter
Paste the following template at the top of your new file:

```markdown
---
title: "Quadruped Locomotion on Uneven Terrain"
subtitle: "Reinforcement learning policy trained in NVIDIA Isaac Lab with zero-shot Sim-to-Real deployment."
date: "2026"
category: "Bipedal & Isaac Lab"
featured: true
order: 4
simEngine: "NVIDIA Isaac Lab / PhysX 5.4"
middleware: "ROS 2 Humble / C++20"
hardware: "Custom 12-DoF Quadruped + Jetson Orin Nano"
tags: ["Isaac Lab", "Reinforcement Learning", "Quadruped", "Sim-to-Real", "C++"]
metrics:
  - label: "Parallel Envs"
    value: "4,096 GPUs"
  - label: "Inference Loop"
    value: "500 Hz RT"
  - label: "Convergence"
    value: "99.4%"
repoUrl: "https://github.com/piyaskheyal/quadruped-isaac-lab"
quickCommand: "ros2 launch quadruped_bringup real_robot.launch.py policy:=trot_rough_terrain.pt"
architectureSteps:
  - "Rigid Body CAD & URDF Mass Inertia Identification"
  - "Massively Parallel Isaac Lab Simulation with Domain Randomization"
  - "PPO Actor-Critic Policy Training & Reward Convergence"
  - "TensorRT Engine Quantization & Edge Deployment on Jetson Orin"
---

### Engineering Overview
Provide a concise 1-2 paragraph overview of the system architecture, motivation, and physical constraints.

### Key Technical Contributions
- **Physics Calibration:** Detailed joint damping, friction, and actuator latency models matching physical dynamometers.
- **Domain Randomization:** Randomizing terrain slope, payload mass, and push perturbations during training.
- **Edge Deployment:** Running zero-allocation C++ inference loops maintaining under 2ms latency over CAN bus.
```

### Supported Categories:
The `category` field must match one of the defined enums in `src/content/config.ts`:
- `'Bipedal & Isaac Lab'`
- `'VLA & Manipulation'`
- `'AMR & SLAM'`

*(To add a new category, simply add it to the enum in `src/content/config.ts` and `CATEGORIES` in `src/components/ProjectExplorer.tsx`).*

---

## 🔧 How to Scale & Customize the Website

All non-project modular content is centralized in **[`src/config/site.ts`](file:///home/kheyal/ws_dev/piyas-portfolio/src/config/site.ts)**. You never have to search through HTML or JSX templates to change content.

### 1. Adding / Editing Core Disciplines (Services)
Edit `SITE_CONFIG.services` in `src/config/site.ts`. This dynamically powers both the 3-column list on Home (`/`) and the **Sticky Stacking Cards** on `/service`:

```typescript
{
  index: '005',
  title: 'HUMANOID WHOLE-BODY CONTROL',
  subtitle: 'Momentum-based balance, QP inverse dynamics, and footstep planning.',
  tags: ['Whole-Body Control', 'Pinocchio', 'Quadratic Programming', 'C++20'],
  description: 'Hierarchical whole-body controller managing angular momentum and ground reaction forces during complex dynamic maneuvers.',
  imageA: '/images/profile.png',
  imageB: '/images/headshot_noBG.png',
}
```

### 2. Adding / Publishing Research Articles (Blogs)
Edit `SITE_CONFIG.articles` in `src/config/site.ts`. This automatically updates the Home page preview and the 2×3 card grid on `/blog`:

```typescript
{
  slug: 'humanoid-momentum-control',
  title: 'CENTROIDAL MOMENTUM DYNAMICS IN BIPEDAL RECOVERY',
  category: 'ROBOTICS',
  date: 'NOV 2026',
  readTime: '7 MIN READ',
  author: 'Piyas Ahmed Kheyal',
  summary: 'Formulating quadratic optimization constraints for real-time recovery steps on compliant humanoid feet.',
  image: '/images/profile.png',
}
```

### 3. Updating Animated Telemetry Counters
Edit `SITE_CONFIG.metrics` in `src/config/site.ts`:

```typescript
metrics: {
  rigsCompleted: '15+',
  simHours: '750+',
  yearsExp: '8+',
  policyConvergence: '99.5%',
  parallelEnvs: '8,192+',
  globalClients: '95',
  successfulProjects: '200',
}
```
Any component using `<AnimatedCounter value={SITE_CONFIG.metrics.rigsCompleted} />` will automatically count up to the new number when scrolled into view.

### 4. Customizing Engineering Process Phases
Edit `SITE_CONFIG.process` in `src/config/site.ts` to adjust the 4 dark phase cards on the Home page:

```typescript
{
  step: '01',
  title: 'KINEMATICS & URDF',
  icon: '✦',
  desc: 'Precision CAD modeling in SolidWorks, defining mass moments of inertia...',
}
```

### 5. Managing Lab Endorsements & Testimonials
Edit `SITE_CONFIG.testimonials` in `src/config/site.ts`:

```typescript
{
  author: 'Dr. Jane Cooper',
  role: 'Director of Manipulation, Robotics AI',
  quote: 'Piyas achieved remarkable Sim-to-Real precision on our arm platform...',
  rating: 5,
  avatar: '/images/headshot_noBG.png',
}
```

### 6. Adding / Editing Engineering FAQs
Edit `SITE_CONFIG.faqs` in `src/config/site.ts`. These automatically appear in the interactive accordion on both the `/about` and `/contact` pages:

```typescript
{
  q: 'Can you customize custom end-effectors for Isaac Sim?',
  a: 'Yes, I model end-effectors in SolidWorks with accurate mass properties, collision meshes, and surface contact parameters...',
}
```

### 7. Updating Contact Info & Socials
Update the top of `src/config/site.ts`:

```typescript
name: 'Piyas Ahmed Kheyal',
brandName: 'PIYAS AHMED KHEYAL®',
titleWatermark: 'PIYAS AHMED KHEYAL',
email: 'piyaskheyal@gmail.com',
phone: '+880 1700 000000',
location: 'Rajshahi / Dhaka, Bangladesh (Global Remote)',
officeHours: '08:00 AM — 10:00 PM: Monday — Saturday',
socials: {
  github: 'https://github.com/piyaskheyal',
  linkedin: 'https://www.linkedin.com/in/piyas-ahmed-kheyal/',
  youtube: 'https://www.youtube.com/@Mechatr0onicsArchive_RUET',
}
```
All header links, the slide-out menu drawer, footer channels, and contact mailto buttons update across all 5 pages simultaneously.

---

## 🖼 Managing Images & Assets

- **Hero Transparent Portrait:** Place your transparent cutout image at `public/images/headshot_noBG.png`. It will automatically render in the middle of the Hero canvas.
- **Secondary Profile Photos:** Place standard images in `public/images/` (e.g. `public/images/profile.png`).
- **Project Images & Diagrams:** Add screenshots or GIF recordings to `public/images/` and reference them in your markdown or `site.ts` with `/images/filename.png`.

---

## 🎨 Theme Customization

The site defaults to **Precision Laboratory Light Mode** (`#F6F6F4` warm off-white canvas, `#FFFFFF` pure white cards, and `#EBEBE9` stone tiles) with **Deep Carbon Dark Mode** (`#0F0F0F`) available via the top toggle.

- **Theme Tokens:** Defined in `src/styles/global.css` under `:root` and `html.dark`.
- **Default Theme Setting:** Controlled by the inline script inside `<head>` in `src/pages/*.astro`:
  ```javascript
  const theme = localStorage.getItem('theme') || 'light';
  ```
- **Primary Vermilion Orange:** Defined as `#EB4618` in `tailwind.config.mjs` and `global.css`.

---

## 💻 Commands & Workflow

All commands run from the project root:

```bash
# 1. Install dependencies
npm install

# 2. Start local development server (with hot reload at http://localhost:4321)
npm run dev

# 3. Type check & build static production export (outputs to /dist)
npm run build

# 4. Preview the built static production site locally
npm run preview
```

---

## 🚢 Deployment Guide

Because the portfolio is pre-rendered to standard static HTML, CSS, and client JS bundles in `dist/`, it can be deployed anywhere with 0-cost hosting:

### GitHub Pages (Automated via Actions)
1. In `astro.config.mjs`, ensure `site: 'https://piyaskheyal.github.io'`.
2. Push your code to your GitHub repository `piyaskheyal.github.io` (or repository with Pages enabled).
3. Under repository **Settings** → **Pages**, set Source to **GitHub Actions** (Astro provides a standard one-click GitHub Actions workflow).

### Vercel / Netlify
1. Connect your GitHub repository to Vercel or Netlify.
2. Framework Preset: **Astro**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.

---

© 2026 **Piyas Ahmed Kheyal**. Engineered with Swiss Precision & Physical AI Rigor.
