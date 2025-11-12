# Liquid Builder

A Vue 3 component library for building LiquidJS templates visually. This tool enables users to create Liquid templates even without prior knowledge of the Liquid templating language.

## Features

- **Visual Template Editor**: Edit Liquid templates in a text editor with live syntax highlighting
- **Live Preview**: See your template rendered in real-time as you type
- **Drag & Drop**: Drag variables, filters, and tags directly into the editor
- **Click to Insert**: Alternatively, click any item to insert it at the cursor position
- **Comprehensive Filter Library**: Browse and insert 50+ built-in Liquid filters
- **Tag Support**: Access all Liquid tags including control flow, iteration, and variable tags
- **Search & Filter**: Quickly find the filters and tags you need
- **TypeScript Support**: Full type definitions included
- **Tailwind CSS**: Modern, responsive UI built with Tailwind

## Packages

This monorepo contains:

- `packages/liquid-builder`: The main component library (published to npm)
- `packages/playground`: A demo application showcasing the library

## Quick Start

### Installation

```bash
npm install liquid-builder
# or
yarn add liquid-builder
```

### Basic Usage

```vue
<template>
  <LiquidBuilder
    v-model:template="template"
    :variables="variables"
  />
</template>

<script setup>
import { ref } from 'vue'
import { LiquidBuilder } from 'liquid-builder'
import 'liquid-builder/style.css'

const template = ref('Hello {{ name }}!')
const variables = {
  name: 'World',
  user: {
    firstName: 'John',
    lastName: 'Doe'
  }
}
</script>
```

### As a Vue Plugin

```ts
import { createApp } from 'vue'
import LiquidBuilderPlugin from 'liquid-builder'
import 'liquid-builder/style.css'

const app = createApp(App)
app.use(LiquidBuilderPlugin)
```

## Development

### Prerequisites

- Node.js >= 16
- npm

### Setup

```bash
# Install dependencies
npm install

# Run the playground in development mode
npm run dev

# Build the library
npm run build

# Build all packages
npm run build:all
```

### Project Structure

```
liquid-builder/
├── packages/
│   ├── liquid-builder/     # Main component library
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── constants/
│   │   │   ├── LiquidBuilder.vue
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── package.json
│   └── playground/         # Demo application
│       ├── src/
│       └── package.json
└── package.json
```

## Component API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `template` | `string` | `''` | The Liquid template string (v-model) |
| `variables` | `Record<string, any>` | `{}` | Data available to the template |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:template` | `string` | Emitted when the template changes |

## Features Roadmap

- [x] Basic template editor with live preview
- [x] Variable insertion
- [x] Filter support
- [x] Tag support
- [x] Drag and drop operations
- [ ] Template snippets
- [ ] Custom filters/tags registration
- [ ] Syntax highlighting
- [ ] Auto-completion
- [ ] Template validation
- [ ] Export/Import templates
- [ ] Undo/Redo functionality

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
