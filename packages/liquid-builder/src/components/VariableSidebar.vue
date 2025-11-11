<template>
  <div class="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
    <!-- Tabs -->
    <div class="border-b border-gray-200">
      <nav class="flex -mb-px">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors',
            activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab content -->
    <div class="h-96 overflow-y-auto">
      <!-- Variables Tab -->
      <div v-show="activeTab === 'variables'" class="p-4">
        <div v-if="variables.length === 0" class="text-sm text-gray-500 text-center py-8">
          No variables available
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="variable in variables"
            :key="variable.path"
            @click="insertVariable(variable)"
            class="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <div class="flex items-center justify-between">
              <code class="text-sm font-mono text-blue-600">{{ variable.path }}</code>
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{{ variable.type }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Filters Tab -->
      <div v-show="activeTab === 'filters'" class="p-4">
        <div class="mb-4">
          <input
            v-model="filterSearch"
            type="text"
            placeholder="Search filters..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>
        <div class="space-y-2">
          <div
            v-for="filter in filteredFilters"
            :key="filter.name"
            @click="insertFilter(filter)"
            class="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <div class="font-medium text-sm text-gray-900">{{ filter.name }}</div>
            <div class="text-xs text-gray-600 mt-1">{{ filter.description }}</div>
            <code class="text-xs text-blue-600 mt-2 block bg-blue-50 p-2 rounded">{{ filter.syntax }}</code>
          </div>
        </div>
      </div>

      <!-- Tags Tab -->
      <div v-show="activeTab === 'tags'" class="p-4">
        <div class="mb-4">
          <input
            v-model="tagSearch"
            type="text"
            placeholder="Search tags..."
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        <!-- Tag category filters -->
        <div class="mb-4 flex flex-wrap gap-2">
          <button
            @click="tagTypeFilter = null"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-colors',
              tagTypeFilter === null
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            All
          </button>
          <button
            v-for="type in tagTypes"
            :key="type"
            @click="tagTypeFilter = type"
            :class="[
              'px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize',
              tagTypeFilter === type
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            ]"
          >
            {{ type }}
          </button>
        </div>

        <div class="space-y-2">
          <div
            v-for="tag in filteredTags"
            :key="tag.name"
            @click="insertTag(tag)"
            class="p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
          >
            <div class="flex items-center justify-between">
              <div class="font-medium text-sm text-gray-900">{{ tag.name }}</div>
              <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded capitalize">{{ tag.type }}</span>
            </div>
            <div class="text-xs text-gray-600 mt-1">{{ tag.description }}</div>
            <code class="text-xs text-blue-600 mt-2 block bg-blue-50 p-2 rounded whitespace-pre">{{ tag.syntax }}</code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { LiquidVariable, LiquidFilter, LiquidTag } from '../types'

interface Props {
  variables: LiquidVariable[]
  filters: LiquidFilter[]
  tags: LiquidTag[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  insert: [value: string]
}>()

const activeTab = ref<'variables' | 'filters' | 'tags'>('variables')
const filterSearch = ref('')
const tagSearch = ref('')
const tagTypeFilter = ref<string | null>(null)

const tabs = [
  { id: 'variables' as const, label: 'Variables' },
  { id: 'filters' as const, label: 'Filters' },
  { id: 'tags' as const, label: 'Tags' }
]

const tagTypes = computed(() => {
  const types = new Set(props.tags.map(tag => tag.type))
  return Array.from(types)
})

const filteredFilters = computed(() => {
  if (!filterSearch.value) return props.filters

  const search = filterSearch.value.toLowerCase()
  return props.filters.filter(filter =>
    filter.name.toLowerCase().includes(search) ||
    filter.description.toLowerCase().includes(search)
  )
})

const filteredTags = computed(() => {
  let result = props.tags

  if (tagTypeFilter.value) {
    result = result.filter(tag => tag.type === tagTypeFilter.value)
  }

  if (tagSearch.value) {
    const search = tagSearch.value.toLowerCase()
    result = result.filter(tag =>
      tag.name.toLowerCase().includes(search) ||
      tag.description.toLowerCase().includes(search)
    )
  }

  return result
})

const insertVariable = (variable: LiquidVariable) => {
  emit('insert', `{{ ${variable.path} }}`)
}

const insertFilter = (filter: LiquidFilter) => {
  // Insert a basic usage example
  if (filter.parameters && filter.parameters.length > 0) {
    const params = filter.parameters.map(p => `"${p}"`).join(', ')
    emit('insert', `{{ variable | ${filter.name}: ${params} }}`)
  } else {
    emit('insert', `{{ variable | ${filter.name} }}`)
  }
}

const insertTag = (tag: LiquidTag) => {
  if (tag.hasEndTag) {
    // For tags with end tags, insert both opening and closing
    const lines = tag.syntax.split('\n')
    if (lines.length > 1) {
      emit('insert', tag.syntax)
    } else {
      emit('insert', `{% ${tag.name} %}\n  \n{% end${tag.name} %}`)
    }
  } else {
    // For standalone tags
    emit('insert', `{% ${tag.name} %}`)
  }
}
</script>
