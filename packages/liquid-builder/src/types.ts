export interface LiquidVariable {
  name: string
  path: string
  type: 'string' | 'number' | 'boolean' | 'object' | 'array' | 'date'
  description?: string
}

export interface LiquidFilter {
  name: string
  description: string
  syntax: string
  parameters?: string[]
}

export interface LiquidTag {
  name: string
  description: string
  syntax: string
  type: 'control' | 'iteration' | 'variable' | 'theme' | 'raw'
  hasEndTag: boolean
}

export interface InsertableItem {
  type: 'variable' | 'filter' | 'tag'
  label: string
  value: string
  description?: string
  category?: string
}
