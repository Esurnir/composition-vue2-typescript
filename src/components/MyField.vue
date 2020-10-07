<template>
  <input
    ref="monRef"
    v-model="autoFormatter"
    :class="inputStyles"
    type="text"
    @input="inputHandler"
    @blur="blurHandler"
  />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "@vue/composition-api";
import { useAutoFormatter } from "@/composable/autoFormatter";
import { useThemeSaumon } from "@/composable/themeSaumon";

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
    const {
      internalValue: autoFormatter,
      inputHandler,
      blurHandler
    } = useAutoFormatter(props, emit);

    const monRef = ref<HTMLInputElement | null>(null);

    // ne pas déconstruire props dans setup :
    // const eager = props.eager;

    watch(
      // () => eager
      () => props.eager,
      () => {
        // console.log(eager);
        console.log(props.eager);
      }
    );

    onMounted(() => {
      console.log(monRef);
      if (monRef.value) {
        console.log(monRef.value.value);
      }
    });

    function focusMonRef() {
      if (monRef.value) {
        monRef.value.focus();
      }
    }

    const { inputStyles } = useThemeSaumon();

    return {
      autoFormatter,
      inputHandler,
      blurHandler,
      inputStyles,
      monRef,
      focusMonRef
    };
  }
});
</script>
<style scoped>
.salmon {
  color: salmon;
}
</style>
