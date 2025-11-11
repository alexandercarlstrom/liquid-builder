<template>
  <div class="liquid-builder flex flex-col lg:flex-row gap-4 w-full">
    <!-- Sidebar with variables and operations -->
    <div class="lg:w-80 flex-shrink-0">
      <VariableSidebar
        :variables="parsedVariables"
        :filters="availableFilters"
        :tags="availableTags"
        @insert="handleInsert"
      />
    </div>

    <!-- Main editor area -->
    <div class="flex-1 flex flex-col gap-4">
      <!-- Template Editor -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <div class="border-b border-gray-200 px-4 py-3">
          <h3 class="text-lg font-semibold text-gray-900">Template Editor</h3>
        </div>
        <div class="p-4">
          <textarea
            ref="editorRef"
            v-model="localTemplate"
            class="liquid-editor w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-y"
            placeholder="Start typing your Liquid template here..."
            @input="handleTemplateChange"
          />
        </div>
      </div>

      <!-- Live Preview -->
      <div class="bg-white rounded-lg shadow border border-gray-200">
        <div class="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900">Live Preview</h3>
          <button
            @click="refreshPreview"
            class="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
        <div class="p-4">
          <div v-if="renderError" class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            <h4 class="font-semibold mb-2">Rendering Error:</h4>
            <pre class="text-sm whitespace-pre-wrap">{{ renderError }}</pre>
          </div>
          <div v-else class="min-h-32 p-4 bg-gray-50 rounded-lg">
            <div v-html="renderedOutput" class="prose max-w-none"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Liquid } from 'liquidjs'
import VariableSidebar from './components/VariableSidebar.vue'
import { LiquidVariable, LiquidFilter, LiquidTag } from './types'
import { LIQUID_FILTERS, LIQUID_TAGS } from './constants/liquid-definitions'

interface Props {
  template?: string
  variables?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  template: '',
  variables: () => ({})
})

const emit = defineEmits<{
  'update:template': [value: string]
}>()

const localTemplate = ref(props.template)
const editorRef = ref<HTMLTextAreaElement>()
const renderedOutput = ref('')
const renderError = ref('')
const liquidEngine = new Liquid()

// Parse variables into a structured format
const parsedVariables = computed<LiquidVariable[]>(() => {
  const vars: LiquidVariable[] = []

  const parseObject = (obj: any, prefix = ''): void => {
    for (const [key, value] of Object.entries(obj)) {
      const path = prefix ? `${prefix}.${key}` : key
      const type = Array.isArray(value)
        ? 'array'
        : value instanceof Date
        ? 'date'
        : typeof value

      vars.push({
        name: key,
        path,
        type: type as LiquidVariable['type']
      })

      if (type === 'object' && value !== null && !(value instanceof Date)) {
        parseObject(value, path)
      }
    }
  }

  parseObject(props.variables)
  return vars
})

const availableFilters = computed<LiquidFilter[]>(() => LIQUID_FILTERS)
const availableTags = computed<LiquidTag[]>(() => LIQUID_TAGS)

// Render the template
const renderTemplate = async () => {
  try {
    renderError.value = ''
    const output = await liquidEngine.parseAndRender(localTemplate.value, props.variables)
    renderedOutput.value = output
  } catch (error: any) {
    renderError.value = error.message || 'Unknown rendering error'
    renderedOutput.value = ''
  }
}

const handleTemplateChange = () => {
  emit('update:template', localTemplate.value)
  renderTemplate()
}

const handleInsert = (value: string) => {
  const textarea = editorRef.value
  if (!textarea) return

  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = localTemplate.value

  // Insert at cursor position
  localTemplate.value = text.substring(0, start) + value + text.substring(end)

  emit('update:template', localTemplate.value)

  // Set cursor position after inserted text
  setTimeout(() => {
    textarea.focus()
    const newPosition = start + value.length
    textarea.setSelectionRange(newPosition, newPosition)
  }, 0)

  renderTemplate()
}

const refreshPreview = () => {
  renderTemplate()
}

// Watch for external template changes
watch(() => props.template, (newVal) => {
  if (newVal !== localTemplate.value) {
    localTemplate.value = newVal
    renderTemplate()
  }
})

// Initial render
onMounted(() => {
  renderTemplate()
})
</script>
