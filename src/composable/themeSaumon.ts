import { computed, ref } from "@vue/composition-api";
import { useStore } from "../store";

export function useThemeSaumon() {
  const store = useStore();
  const inputStyles = computed(() => {
    if (store.state.theme === "salmon") {
      return "salmon";
    } else {
      return "";
    }
  });

  const internalValue = ref(15);
  return {
    inputStyles,
    internalValue
  };
}
