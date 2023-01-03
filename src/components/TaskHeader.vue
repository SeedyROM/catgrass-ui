<template>
  <div
    :class="['pt-8 pb-2 bg-noise', className]"
    :style="{ backgroundColor: bgColor || 'rgb(245, 245, 245)' }"
  >
    <div class="mt-12 m-0 mx-8">
      <div class="flex-none xs:hidden sm:hidden md:flex">
        <Button @click="goBack" size="md" variant="secondary">
          <ArrowSmallLeftIcon class="w-4" />
          <span>Back</span>
        </Button>
      </div>
      <div class="flex-none md:hidden">
        <div class="block py-4" @click="goBack">
          <ArrowSmallLeftIcon class="w-6" />
        </div>
      </div>
    </div>
    <div class="m-auto mt-4 mb-0 w-10/12 md:mt-4 md:mb-4 md:w-1/2">
      <div class="flex mb-4" v-if="recipeChains">
        <div v-for="(chain, index) in recipeChains" :key="index" :class="{ 'ml-[-12px]': index > 0 }">
          <LogoFromImage class="block" :rounded="true" size="48" :src="chain?.asset?.logo_URIs?.png || ''" />
        </div>
      </div>
      <h1 class="text-2xl font-bold md:text-4xl">
        {{ title }}
      </h1>
      <p class="mt-8" v-html="subtitle"></p>
    </div>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useMultiWallet } from "@/stores/multiWallet";
import { useTaskCreator } from "@/stores/taskCreator";
import type { Action, Task } from "@/utils/types";
import { getChainForAccount } from "@/stores/multiWallet";
import { decodedMessage } from "@/utils/mvpData";
import { getChainData, ellipseLongString } from "@/utils/helpers";
import { computeTitle, computeBgColor } from "@/utils/recipeHelpers";
import LogoFromImage from "@/components/core/display/LogoFromImage.vue";
import Button from '@/components/core/buttons/Button.vue'
import {
  ArrowSmallLeftIcon,
} from '@heroicons/vue/24/outline'

export default {
  props: ['data', 'className'],

  components: {
    Button,
    ArrowSmallLeftIcon,
    LogoFromImage,
  },

  data() {
    return {
      task: null as Task | null,
      ellipseLongString,
    }
  },

  computed: {
    ...mapState(useMultiWallet, ['networks']),
    bgColor() {
      if (this.data.bgColor) return this.data.bgColor
      return computeBgColor(this.task)
    },
    title() {
      if (this.task) {
        const o = this.getTaskOccurrences(this.task)
        const occurs = Math.max(1, o)
        return computeTitle(this.task, occurs)
      }
      return ''
    },
    subtitle() {
      let s = ''
      if (this.task && this.task.owner_id) {
        s = ellipseLongString(this.task.owner_id, 16)
      } else {
        const b = this.recipeChains.length > 0 ? this.recipeChains[0].asset.display : null
        s = `croncat.${b}`
      }

      return `by <strong>${s}</strong>`
    },
    stats() {
      let copycats = 0
      // TODO: Change to real stats later, for now just use local knowns
      if (this.task) copycats = (this.task.actions.length || 0) + (this.task?.queries?.length ? this.task.queries.length : 0) + (this.task?.transforms?.length ? this.task.transforms.length : 0)

      return {
        copycats,
      }
    },
    recipeChains() {
      // Loop actions to look for bech32 contracts
      const networks: any = []
      const uniqs: string[] = []

      this.task?.actions.forEach((a: Action) => {
        let address = ''
        // TODO: Support other msg types
        if ('wasm' in a.msg) address = a.msg.wasm.execute.contract_addr
        if ('bank' in a.msg) address = a.msg.bank.send.to_address
        if (address) {
          try {
            const chain = getChainForAccount({ address }, this.networks)
            if (!uniqs.includes(chain.chain_id)) {
              networks.push(getChainData(chain))
              uniqs.push(chain.chain_id)
            }
          } catch (e) {
            // do nothangs
          }
        }
      })

      return networks
    },
  },

  methods: {
    ...mapActions(useTaskCreator, ['getTaskOccurrences']),
    goBack() {
      const prev = this.$router.options.history.state.back
      console.log(this.$router, prev);

      if (!prev || `${prev}`.search('create') > -1) this.$router.push({ path: '/tasks/all' })
      else this.$router.back()
    },
    loadContext() {
      let task = this.data.task
      if (!task) return;
      const actions = task?.actions ? task.actions : []
      const queries = task?.queries ? task.queries : []

      // decode wasm execute msgs
      task.actions = [...actions].map((a, i) => {
        if ('wasm' in a.msg) a.msg.wasm.execute.msg = decodedMessage(a.msg.wasm.execute.msg)
        return a
      })

      // decode wasm query msgs
      task.queries = [...queries].map((q, i) => {
        if ('query' in q) q.query.msg = decodedMessage(q.query.msg)
        if ('generic_query' in q) q.generic_query.msg = decodedMessage(q.generic_query.msg)
        if ('smart_query' in q) q.smart_query.msg = decodedMessage(q.smart_query.msg)
        return q
      })

      // apply to local copy
      this.task = task
    },
  },

  mounted() {
    this.loadContext()
  },

  watch: {
    data: ['loadContext'],
  },
}
</script>
