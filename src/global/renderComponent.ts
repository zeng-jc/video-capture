import { createApp, type Component } from 'vue'
type Data = Record<string, unknown>
export default function renderComponent({
  containerEl,
  componentObj,
  props
}: {
  containerEl?: HTMLElement
  componentObj: Component
  props: Data
}): any {
  const app = createApp(componentObj, props)
  if (containerEl) app.mount(containerEl)
  return () => {
    app?.unmount()
  }
}
