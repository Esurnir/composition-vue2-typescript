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
import Vue from "vue";
import { mapState } from "vuex";

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

export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ""
    },
    formatage: {
      type: String,
      default: "",
      validator: value => {
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
  data() {
    return {
      internalValue: this.value as string
    };
  },
  computed: {
    ...mapState(["theme"]),
    inputText(): string {
      switch (this.formatage) {
        case "MAJUSCULE":
          return this.internalValue.toUpperCase();
        case "Premier":
          return premierFormatter(this.internalValue);
        case "minuscule":
          return this.internalValue.toLowerCase();
        default:
          return this.internalValue;
      }
    },
    inputStyles(): string {
      if (this.theme === "salmon") {
        return "salmon";
      } else {
        return "";
      }
    }
  },
  watch: {
    formatage() {
      this.internalValue = this.inputText;
      this.$emit("input", this.internalValue);
    }
  },
  methods: {
    inputHandler() {
      this.internalValue = this.inputText;
      if (this.eager) {
        this.$emit("input", this.internalValue);
      }
    },
    blurHandler(event: Event) {
      if (!this.eager) {
        this.$emit("input", (event.target as HTMLInputElement).value);
      }
    }
  }
});
</script>
<style scoped>
.salmon {
  color: salmon;
}
</style>
