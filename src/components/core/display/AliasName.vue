<template>
  <div v-if="n && ns" class="inline-flex mr-1 rounded-3xl p-[2px] border border-1 border-gray-500 leading-none">
    <img v-if="ns == 'icns'" class="w-4 h-4 my-auto rounded-full" src="/ext_logos/icns_fav.png" />
    <img v-if="ns == 'stargaze'" class="w-4 h-4 rounded-full" src="/ext_logos/stars_fav.png" />
    <span class="my-auto px-1 text-sm leading-none" v-html="n"></span>
  </div>
</template>

<script lang="ts">
// Example:
// {
//   name: 'croncat_dao',
//   provider: 'stargaze',
// }

export default {
  props: ["data", "name", "provider"],

  computed: {
    n() {
      return this.name || this.data?.name || ''
    },
    ns() {
      return this.provider || this.data?.provider || ''
    },
  },
};
</script>
