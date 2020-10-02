<template>
  <input
    v-model="internalValue"
    :class="inputStyles"
    type="text"
    @input="inputHandler"
    @blur="blurHandler"
  />
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch } from "@vue/composition-api";
import { useStore } from "@/store";

function premierFormatter(input: string) {
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

function formatText(text: string, format: string) {
  switch (format) {
    case "MAJUSCULE":
      return text.toUpperCase();
    case "Premier":
      return premierFormatter(text);
    case "minuscule":
      return text.toLowerCase();
    default:
      return text;
  }
}

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ""
    },
    formatage: {
      type: String,
      default: "",
      validator: (value: string) => {
        if (
          value === "MAJUSCULE" ||
          value === "Premier" ||
          value === "minuscule" ||
          value === ""
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    eager: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const inputStyles = computed(() =>
      store.state.theme === "salmon" ? "salmon" : ""
    );

    const internalValue = ref("");
    watch(
      () => props.value,
      () => {
        if (formatText(props.value, props.formatage) != internalValue.value) {
          internalValue.value = formatText(props.value, props.formatage);
        }
      },
      { immediate: true }
    );

    watch(
      () => props.formatage,
      () => {
        const newValue = formatText(internalValue.value, props.formatage);
        if (newValue !== internalValue.value) {
          internalValue.value = newValue;
          emit("input", newValue);
        }
      }
    );

    function inputHandler() {
      internalValue.value = formatText(internalValue.value, props.formatage);
      if (props.eager) {
        emit("input", internalValue.value);
      }
    }

    function blurHandler(event: Event) {
      if (!props.eager) {
        emit("input", (event.target as HTMLInputElement).value);
      }
    }

    return {
      internalValue,
      inputStyles,
      inputHandler,
      blurHandler
    };
  }
});
</script>
<style scoped>
.salmon {
  color: salmon;
}
</style>
