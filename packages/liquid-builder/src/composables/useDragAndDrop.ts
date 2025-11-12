import { ref } from 'vue'

export interface DragItem {
  type: 'variable' | 'filter' | 'tag'
  value: string
  label: string
}

export function useDragAndDrop() {
  const isDragging = ref(false)
  const draggedItem = ref<DragItem | null>(null)

  const startDrag = (event: DragEvent, item: DragItem) => {
    isDragging.value = true
    draggedItem.value = item

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'copy'
      event.dataTransfer.setData('text/plain', item.value)
      event.dataTransfer.setData('application/json', JSON.stringify(item))
    }
  }

  const endDrag = () => {
    isDragging.value = false
    draggedItem.value = null
  }

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy'
    }
  }

  const handleDrop = (event: DragEvent, callback: (value: string) => void) => {
    event.preventDefault()

    const jsonData = event.dataTransfer?.getData('application/json')
    const textData = event.dataTransfer?.getData('text/plain')

    if (jsonData) {
      try {
        const item: DragItem = JSON.parse(jsonData)
        callback(item.value)
      } catch (error) {
        // Fallback to plain text if JSON parsing fails
        if (textData) {
          callback(textData)
        }
      }
    } else if (textData) {
      callback(textData)
    }

    endDrag()
  }

  return {
    isDragging,
    draggedItem,
    startDrag,
    endDrag,
    handleDragOver,
    handleDrop
  }
}
