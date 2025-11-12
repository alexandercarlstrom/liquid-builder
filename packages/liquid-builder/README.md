# Liquid Builder

A Vue 3 component library for building LiquidJS templates visually.

## Installation

```bash
npm install liquid-builder
# or
yarn add liquid-builder
```

## Usage

### Basic Example

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
  products: [
    { name: 'Product 1', price: 29.99 },
    { name: 'Product 2', price: 39.99 }
  ]
}
</script>
```

### As a Plugin

```ts
import { createApp } from 'vue'
import LiquidBuilderPlugin from 'liquid-builder'
import 'liquid-builder/style.css'
import App from './App.vue'

const app = createApp(App)
app.use(LiquidBuilderPlugin)
app.mount('#app')
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `template` | `string` | `''` | The Liquid template string (supports v-model) |
| `variables` | `Record<string, any>` | `{}` | Variables available in the template |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:template` | `string` | Emitted when template changes |

## Features

- Live template editing
- Real-time preview with error handling
- Drag & drop support for variables, filters, and tags
- Click to insert at cursor position
- 50+ built-in Liquid filters
- Comprehensive tag support (control flow, iteration, etc.)
- Search and filter capabilities
- TypeScript support
- Responsive design with Tailwind CSS

## TypeScript

The package includes full TypeScript definitions. You can import types:

```ts
import { LiquidVariable, LiquidFilter, LiquidTag } from 'liquid-builder'
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires Vue 3.3.0 or higher

## License

MIT
