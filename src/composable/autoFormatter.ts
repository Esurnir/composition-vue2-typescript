/**
 * Composables permettant d'utiliser l'autoformattage
 */
import { ref, watch } from "@vue/composition-api";
interface PropAutoFormatter {
  value: string;
  formatage: string;
  eager: boolean;
}

export function premierFormatter(input: string) {
  const parts = input.split(" ");
  return parts
    .map(value => {
      if (value.length) {
        return [...value[0].toUpperCase(), ...value.slice(1)].join("");
      } else {
        return "";
      }
    })
    .join(" ");
}

/**
 * Retourne un objet contenant internalValue, inputHandler et blurHandler
 * @param props les props a passer
 * @param emit la fonction emit du context setup
 */
export function useAutoFormatter(
  props: PropAutoFormatter,
  emit: (nom: string, payload: unknown) => void
) {
  const internalValue = ref(props.value);

  function formatText(value: string) {
    switch (props.formatage) {
      case "MAJUSCULE":
        return value.toUpperCase();
      case "Premier":
        return premierFormatter(value);
      case "minuscule":
        return value.toLowerCase();
      default:
        return value;
    }
  }

  watch(
    () => props.value,
    () => {
      const oldValue = internalValue.value;
      internalValue.value = formatText(props.value);
      if (oldValue != internalValue.value) {
        emit("input", internalValue.value);
      }
    }
  );

  watch(
    () => internalValue,
    () => {
      internalValue.value = formatText(internalValue.value);
    },
    { immediate: true, deep: true }
  );

  function inputHandler() {
    internalValue.value = formatText(internalValue.value);
    if (props.eager) {
      emit("input", internalValue.value);
    }
  }

  function blurHandler(event: Event) {
    if (!props.eager) {
      emit("input", (event.target as HTMLInputElement).value);
    }
  }

  watch(
    () => props.formatage,
    () => {
      internalValue.value = formatText(internalValue.value);
      emit("input", internalValue.value);
    },
    { immediate: true }
  );

  return {
    internalValue,
    inputHandler,
    blurHandler
  };
}
