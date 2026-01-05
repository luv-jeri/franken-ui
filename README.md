# 🧟 Franken-UI

> *Beautiful monsters, assembled with love.*

AI-powered platform that generates **Complete, Deployable Shadcn Registries** with fully customized components, animations, and design systems.

## 🎯 What is this?

Describe your project vision → Get a complete, unique component library with:
- 🎨 Custom colors, fonts, and design tokens
- ✨ Tailored animations (Framer Motion + CSS)
- 📦 50+ shadcn/ui components, customized to your aesthetic
- 🚀 Deploy-ready registry you can use in any project

## 🏗️ Project Structure

```
franken-ui/
├── apps/
│   ├── web/          # SaaS Platform (Next.js)
│   └── docs/         # Documentation
│
├── packages/
│   ├── core/         # Shared types & utilities
│   ├── generator/    # Component transformation engine
│   ├── ai/           # AI prompts & LLM integration
│   ├── base-library/ # Pre-bundled shadcn components
│   └── ui/           # Shared UI components
```

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Start development
pnpm dev

# Build all packages
pnpm build
```

## 📦 Packages

| Package | Description |
|---------|-------------|
| `@franken-ui/core` | Zod schemas for design tokens, animations, and projects |
| `@franken-ui/generator` | CSS generator, AST transformer, export engine |
| `@franken-ui/ai` | OpenAI integration with structured prompts |
| `@franken-ui/base-library` | Pre-bundled shadcn component metadata |

## 🔧 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Monorepo:** Turborepo + pnpm
- **Styling:** Tailwind CSS v4
- **AI:** OpenAI GPT-4o
- **AST:** Babel
- **Validation:** Zod

## 📝 License

MIT
