<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-bold text-gray-900">Liquid Builder - Playground</h1>
        <p class="text-sm text-gray-600 mt-1">Build LiquidJS templates visually</p>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <LiquidBuilder v-model:template="template" :variables="sampleVariables" />

      <div class="mt-8 bg-white rounded-lg shadow p-6">
        <h2 class="text-lg font-semibold mb-4">Current Template</h2>
        <pre class="bg-gray-100 p-4 rounded overflow-x-auto text-sm">{{ template }}</pre>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LiquidBuilder } from 'liquid-builder'
import 'liquid-builder/style.css'

const template = ref('Hello {{ name }}!')

const sampleVariables = {
  name: 'World',
  user: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com'
  },
  products: [
    { name: 'Product 1', price: 29.99 },
    { name: 'Product 2', price: 39.99 }
  ],
  date: new Date().toISOString()
}
</script>
