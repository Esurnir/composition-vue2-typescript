<template>
  <div class="home">
    <MyField v-model="test" :eager="eager" :formatage="format" />
    <div>
      <button @click="eager = !eager">
        {{ eager ? "On Input" : "On Blur" }}
      </button>
    </div>
    <div>
      <button @click="setSalmon">Salmonify!</button>
    </div>
    <div>
      <button @click="switchFormat">{{ format || "Default" }}</button>
    </div>
    <p>{{ test }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import MyField from "@/components/MyField.vue";
import { mapActions } from "vuex";

const formats = new Map<string, string>([
  ["Premier", "MAJUSCULE"],
  ["minuscule", ""],
  ["", "Premier"],
  ["MAJUSCULE", "minuscule"]
]);

export default Vue.extend({
  name: "Home",
  components: {
    MyField
  },
  data() {
    return {
      test: "",
      eager: false,
      format: "Premier"
    };
  },
  methods: {
    ...mapActions(["setSalmon"]),
    switchFormat() {
      const newFormat = formats.get(this.format);
      if (newFormat || newFormat === "") {
        this.format = newFormat;
      }
    }
  }
});
</script>
