<template>
  <div :class="['relative p-3 mt-2 mb-2 w-full text-left bg-white rounded-md cursor-default sm:text-sm', className]">
    <div class="flex justify-between" @click="toggleAdvanced">
      <Label name="Advanced" />
      <ChevronUpIcon :class="showAdvanced != true ? 'rotate-180 transform' : ''" class="h-5 w-5 text-gray-500" />
    </div>
    <div v-if="showAdvanced == true" class="pt-4">
      <div v-if="task.queries && task.queries.length > 0" class="mb-4">
        <Label class="mb-2" name="Queries" />
        <CustomMsgCollapseItem v-for="(item, idx) in task.queries" :key="idx" :item="item" :active="activeItem == item"
          :toggleCallback="toggleItem(item)" />
      </div>
  
      <div v-if="task.transforms && task.transforms.length > 0" class="mb-4">
        <Label class="mb-2" name="Transforms" />
        <CustomMsgCollapseItem v-for="(item, idx) in task.transforms" :key="idx" :item="item" :active="activeItem == item"
          :toggleCallback="toggleItem(item)" />
      </div>
  
      <div v-if="task.actions && task.actions.length > 0">
        <Label class="mb-2" name="Actions" />
        <CustomMsgCollapseItem v-for="(item, idx) in task.actions" :key="idx" :item="item" :active="activeItem == item"
          :toggleCallback="() => toggleItem(item)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Label from '@/components/core/display/Label.vue'
import CustomMsgCollapseItem from "@/components/core/display/CustomMsgCollapseItem.vue"
import {
  ChevronUpIcon,
} from '@heroicons/vue/24/outline'

export default {
  props: ["task", "className"],

  components: {
    Label,
    ChevronUpIcon,
    CustomMsgCollapseItem,
  },

  data() {
    return {
      showAdvanced: false,
      activeItem: null,
    }
  },

  methods: {
    toggleAdvanced() {
      this.showAdvanced = !this.showAdvanced
    },
    toggleItem(item: any) {
      if (this.activeItem === item) this.activeItem = null
      else this.activeItem = item
    },
  },
}
</script>
