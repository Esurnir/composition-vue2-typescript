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
import {
  computed,
  defineComponent,
  ref,
  watch,
  watchEffect
} from "@vue/composition-api";
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
    watchEffect(() => (internalValue.value = props.value));

    const formattedText = computed(() => {
      switch (props.formatage) {
        case "MAJUSCULE":
          return internalValue.value.toUpperCase();
        case "Premier":
          return premierFormatter(internalValue.value);
        case "minuscule":
          return internalValue.value.toLowerCase();
        default:
          return internalValue.value;
      }
    });

    watch(
      () => props.formatage,
      () => {
        internalValue.value = formattedText.value;
        emit("input", internalValue.value);
      }
    );

    function inputHandler() {
      internalValue.value = formattedText.value;
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
      formattedText,
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
