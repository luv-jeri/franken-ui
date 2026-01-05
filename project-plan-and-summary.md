# Shadcn Forge - Project Plan & Summary

> **AI-powered platform that generates Complete, Deployable Shadcn Registries with fully customized components, animations, and design systems.**

---

## 🎯 The Vision

**Problem:** Non-experts or fast-moving teams want a custom Design System based on `shadcn/ui`, but manually configuring 50+ components, themes, and registry files is tedious and technical.

**Solution:** An AI-powered "Factory" where users describe their project aesthetic (e.g., "A retro-futuristic music streaming app") and receive a **complete, unique component library** — not just themed colors, but fully customized components with animations, variants, and custom interactions.

---

## 🔑 Key Differentiators

| Feature | Basic Theming | **Shadcn Forge** |
|---------|---------------|------------------|
| Colors & Radius | ✅ | ✅ |
| Typography | ✅ | ✅ |
| Custom Animations | ❌ | ✅ Framer Motion + CSS Keyframes |
| Component Variants | ❌ | ✅ AI-generated variants |
| Code Modifications | ❌ | ✅ AST-based transformation |
| Complete Registry | ❌ | ✅ Deploy-ready project |

---

## 🏗️ Core Architecture

### High-Level Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│   1. CREATE PROJECT    2. BROWSE COMPONENTS    3. AI CUSTOMIZE    4. EXPORT │
│   ─────────────────    ──────────────────────   ──────────────    ────────── │
│   • Name project       • View base shadcn      • Describe vibe   • Download │
│   • Pull components      components            • AI transforms     ZIP      │
│   • Generate registry  • Preview in browser     each component   • Deploy   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### System Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              SHADCN FORGE                                    │
├───────────────────┬───────────────────┬───────────────────┬─────────────────┤
│   BASE LIBRARY    │   FORGE ENGINE    │   AI DIRECTOR     │   EXPORT        │
├───────────────────┼───────────────────┼───────────────────┼─────────────────┤
│ • Pre-bundled     │ • AST Parser      │ • Design System   │ • ZIP Generator │
│   shadcn          │ • Code Transformer│   Generator       │ • Registry      │
│   components      │ • Animation       │ • Component       │   Builder       │
│ • Sync script     │   Injector        │   Customizer      │ • Deploy Guide  │
│ • Version control │ • CSS Modifier    │ • Validation      │                 │
└───────────────────┴───────────────────┴───────────────────┴─────────────────┘
```

---

## 📁 Project Structure (Monorepo)

```
shadcn-forge/
├── apps/
│   └── web/                           # SaaS Platform (Next.js)
│       ├── app/
│       │   ├── (dashboard)/
│       │   │   ├── projects/          # User's forge projects
│       │   │   └── forge/[id]/
│       │   │       ├── page.tsx       # Component browser
│       │   │       ├── customize/     # AI customization
│       │   │       └── export/        # Download/deploy
│       │   └── api/
│       │       ├── projects/          # CRUD for projects
│       │       ├── generate/          # AI generation endpoint
│       │       ├── export/            # ZIP download
│       │       └── r/[...path]/       # Registry serving
│
├── packages/
│   ├── base-library/                  # Pre-bundled shadcn components
│   │   ├── registry/default/          # 50+ base components
│   │   ├── version.json               # Sync tracking
│   │   └── sync-script.ts             # Update from shadcn
│   │
│   ├── generator/                     # Component transformation
│   │   ├── transformer/
│   │   │   ├── component-transformer.ts
│   │   │   ├── animation-injector.ts
│   │   │   └── css-modifier.ts
│   │   ├── export-engine.ts
│   │   └── registry-builder.ts
│   │
│   ├── ai/                            # AI integration
│   │   ├── prompts/
│   │   │   ├── design-system.ts       # Theme generation
│   │   │   └── component-customizer.ts # Per-component AI
│   │   └── client.ts                  # OpenAI/Anthropic
│   │
│   └── core/                          # Shared types & utils
│
└── turbo.json                         # Turborepo config
```

---

## 🔧 Technical Decisions

### Component Sourcing Strategy

| Approach | Speed | Freshness | Size | **Decision** |
|----------|-------|-----------|------|--------------|
| CLI Pull (`npx shadcn add`) | Slow | Latest | Minimal | ❌ Not scalable |
| GitHub Clone | Medium | Latest | ~100MB | ⚠️ Fallback |
| **Pre-bundled Library** | **Instant** | **Synced** | **~5MB** | ✅ **Chosen** |

**Rationale:** Pre-bundle components and run a sync script periodically to update from shadcn/ui. Gives instant project creation with controlled versioning.

### Component Transformation

- **Babel/AST Parsing** — Parse component TSX, traverse nodes, inject modifications
- **Animation Injection** — Add Framer Motion wrappers or CSS animation classes
- **CSS Variables** — Generate component-specific vars in oklch format
- **Variant System** — Extend CVA variants with AI-generated options

### AI Strategy (Two-Phase)

1. **Phase 1: Design System** — Generate colors, fonts, radius, global animations
2. **Phase 2: Per-Component** — Customize each component with its own animations/variants

---

## 📦 User's Downloaded Package

When users export, they receive:

```
my-design-system/
├── package.json
├── components.json              # shadcn config
├── registry.json                # Registry manifest
├── registry/
│   └── my-style/                # Custom style
│       ├── button/
│       │   └── button.tsx       # Fully customized
│       ├── card/
│       ├── dialog/
│       └── ...
├── public/r/                    # Pre-built JSONs for CLI
├── styles/
│   ├── theme.css                # Generated theme
│   └── animations.css           # All keyframes
└── README.md                    # Deployment guide
```

### Using the Registry

```bash
# Initialize with custom style
npx shadcn init --registry https://my-ds.vercel.app/r

# Add components
npx shadcn add button card dialog
```

---

## 📅 6-Week MVP Roadmap

| Week | Focus | Deliverables |
|------|-------|--------------|
| **1** | Foundation | Monorepo setup, base-library bundling, sync script |
| **2** | Component Browser | Project CRUD, component display, basic preview |
| **3** | AI Design System | Theme generation, CSS vars, validation |
| **4** | Component Transformer | AST modification, animation injection |
| **5** | Export Engine | ZIP generation, registry.json, deploy docs |
| **6** | Polish | Testing, edge cases, documentation, soft launch |

### MVP Scope

**In Scope:**
- ✅ 20 core components (Button, Card, Input, Dialog, Select, etc.)
- ✅ Design system generation (colors, fonts, radius)
- ✅ 3-5 animation presets per aesthetic ("cyberpunk", "minimal", "playful")
- ✅ ZIP export with deployment-ready code
- ✅ Component preview/browser

**Post-MVP:**
- ❌ Custom animation builder (beyond presets)
- ❌ Hosted registry API (managed mode)
- ❌ Real-time collaboration
- ❌ Full 50+ component library
- ❌ Team workspaces

---

## 🛠️ Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Framework** | Next.js 15 (App Router) | RSC, API routes, Vercel deployment |
| **Database** | PostgreSQL + Drizzle | Type-safe, JSON columns, migrations |
| **Cache** | Upstash Redis | Serverless-native, edge caching |
| **Auth** | Clerk | Managed auth, easy integration |
| **AI** | GPT-4o / Claude 3.5 | JSON mode, structured outputs |
| **Monorepo** | Turborepo + pnpm | Fast builds, workspace linking |
| **AST Parsing** | Babel | TypeScript + JSX support |
| **Styling** | Tailwind CSS v4 | Native CSS variables |
| **Validation** | Zod | Runtime type checking |
| **Animations** | Framer Motion + CSS | Flexible animation system |

---

## 🚀 Next Steps

1. **Initialize monorepo** — Turborepo + pnpm workspace
2. **Bundle base library** — Extract components from shadcn/ui
3. **Build component browser** — Project creation + preview UI
4. **Implement AI prompts** — Design system + component customization
5. **Create transformer** — AST-based code modification
6. **Build export engine** — ZIP generation with registry

---

## 📊 Success Metrics

- **Time to first registry:** < 5 minutes from prompt
- **Export success rate:** > 99% valid registries
- **CLI compatibility:** Works with `npx shadcn add`
- **Deployment success:** One-click Vercel deploy works

---

## ⚠️ Key Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| AST transformation breaks code | High | Extensive test suite, fallback to template-based |
| AI generates invalid CSS | Medium | Zod validation, retry with feedback |
| shadcn/ui API changes | Medium | Version locking, sync script with validation |
| Animation performance | Low | GPU-accelerated properties only, prefers-reduced-motion |

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-05  
**Status:** Approved for Implementation
