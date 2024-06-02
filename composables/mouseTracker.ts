import { ref, onMounted, onUnmounted } from "vue";

export function getMousePosition() {
  // state encapsulated and managed by the composable
  const x = ref(0);
  const y = ref(0);

  // a composable can update its managed state over time.
  function update(event: { pageX: number; pageY: number }) {
    x.value = event.pageX;
    y.value = event.pageY;
  }

  // a composable can also hook into its owner component's
  // lifecycle to setup and teardown side effects.
  onMounted(() => window.addEventListener("mousemove", update));
  onUnmounted(() => window.removeEventListener("mousemove", update));

  // expose managed state as return value
  return { x, y };
}