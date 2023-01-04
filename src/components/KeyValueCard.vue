<template>
  <div :class="['py-2 px-4 bg-white rounded-lg', className]">
    <div v-if="loading != true">
      <div v-for="(k, i) in Object.keys(data)" :key="i" class="flex justify-between my-1 uppercase">
        <span>{{ formatTitle(k) }}</span>
        <Balance v-if="data[k] && typeof data[k].denom != 'undefined'" :balance="data[k]" :decimals="6" />
        <span v-else>{{ data[k] }}</span>
      </div>
    </div>
    <div v-else>
      <Loader class="w-24 mx-auto" />
    </div>
  </div>
</template>

<script lang="ts">
import Balance from "@/components/core/display/Balance.vue";
import Loader from '@/components/Loader.vue'

export default {
  props: ["data", "loading", "className"],

  components: {
    Balance,
    Loader,
  },

  methods: {
    formatTitle(str: string) {
      return str.replace(/_/g, ' ')
    },
  },
}
</script>
