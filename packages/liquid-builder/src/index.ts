import { App } from 'vue'
import LiquidBuilder from './LiquidBuilder.vue'
import './style.css'

// Export the component
export { LiquidBuilder }

// Export types
export * from './types'

// Export constants
export { LIQUID_FILTERS, LIQUID_TAGS } from './constants/liquid-definitions'

// Vue plugin for global registration
export default {
  install(app: App) {
    app.component('LiquidBuilder', LiquidBuilder)
  }
}
