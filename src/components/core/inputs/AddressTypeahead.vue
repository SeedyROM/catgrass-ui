<template>
  <Combobox as="div" v-model="selectedAddress">
    <div class="relative mt-1">
      <div class="absolute inset-y-0 left-0 top-0 bottom-0 py-[17px] pl-3 z-40 flex">
        <WalletIcon class="w-6 h-6" color="currentColor" />
      </div>

      <!-- <AliasName :data="{ name: 'croncats', provider: 'icns' }" /> -->

      <ComboboxInput
        class="w-full rounded-md border-2 border-gray-200 bg-white py-[17px] pl-10 pr-10 focus:border-gray-300 focus:outline-none focus:ring-0 focus:ring-gray-300 sm:text-sm"
        @change="query = $event.target.value" :display-value="(a) => a?.alias || a?.address" />

      <div v-if="loading" class="absolute inset-y-0 right-0 top-0 bottom-0 p-0 pl-3 z-40 flex">
        <Loader class="w-12 m-auto" />
      </div>

      <ComboboxButton v-if="!loading" class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      </ComboboxButton>

      <ComboboxOptions v-if="filteredAddresses.length > 0"
        class="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white border-2 border-gray-200 py-1 text-base shadow-lg ring-1 ring-gray-200 ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="a in filteredAddresses" :key="a.address" :value="a" as="template" v-slot="{ active, selected }">
          <li :class="['relative cursor-pointer select-none h-10 py-2 pl-3 pr-9 text-gray-900', active ? 'bg-gray-100' : '']">
            <div class="flex h-full">
              <div class="my-auto">
                <AliasName :data="a.nameservice" :name="formatRecord(a.nameservice?.name)" />
              </div>
              <span :class="['ml-2 my-auto leading-tight truncate text-gray-500', active ? 'text-gray-800' : 'text-gray-500']">
                {{ ellipseLongString(a.address, 24) }}
              </span>
            </div>

            <div class="absolute inset-y-0 top-0 bottom-0 right-0 flex items-center pr-4">
              <span v-if="a.favorite" :class="[active ? 'text-gray-800' : 'text-gray-600']">
                <HeartIcon class="h-5 w-5" aria-hidden="true" />
              </span>
              
              <span v-if="selected" :class="[active ? 'text-gray-800' : 'text-gray-600']">
                <CheckCircleIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </div>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia"
import { useMultiWallet } from "@/stores/multiWallet"
import { nameserviceContracts } from "@/utils/constants"

import { ellipseLongString } from "@/utils/helpers"
import Loader from "@/components/Loader.vue";
import AliasName from "@/components/core/display/AliasName.vue";
import {
  CheckIcon,
  CheckCircleIcon,
  ChevronUpDownIcon,
  // HeartIcon,
} from '@heroicons/vue/20/solid'
import { WalletIcon, HeartIcon } from '@heroicons/vue/24/outline'
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/vue'

const addresses = [
  {
    // contract
    address: 'juno13s3g8e4ce9k68zmasm5jrj2n40xwmmsl4agy6aj6593gn03h3eys75jzsd',
    favorite: false, // localstorage
    alias: '', // to filter out the nameservices
    nameservice: {
      name: 'croncat_dao',
      provider: 'stargaze',
    },
  },
  {
    // reg anon
    address: 'juno1gwc4vwdzt2g05t0g868grg2n45tk3ap7cw5zmj',
    favorite: true, // localstorage
    alias: '', // to filter out the nameservices
    nameservice: null,
  },
  {
    // non-anon
    address: 'juno1qlmwjkg7uu4awajw5aunctjdce9q657j0rrdpy',
    favorite: false, // localstorage
    alias: 'croncats', // to filter out the nameservices
    nameservice: {
      name: 'croncats',
      provider: 'icns',
    },
  },
  {
    // non-anon
    address: 'juno1qlmwjkg7uu4awajw5aunctjdce9q657j0rrdpy',
    favorite: true, // localstorage
    alias: 'cat', // to filter out the nameservices
    nameservice: {
      name: 'cat',
      provider: 'stargaze',
    },
  },
]

export default {
  props: ["data", "className", "onChange"],

  components: {
    AliasName,
    Loader,
    CheckIcon,
    CheckCircleIcon,
    ChevronUpDownIcon,
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
    HeartIcon,
    WalletIcon,
  },

  data() {
    return {
      ellipseLongString,
      loading: false,
      addresses,
      query: '',
      selectedAddress: null,
      default: null,
      v: null,
      timer: null,
    }
  },

  computed: {
    ...mapState(useMultiWallet, ['networks', 'favorites']),
    filteredAddresses() {
      // TODO: Sort!
      return this.query === ''
        ? addresses
        : addresses.filter((a) => {
          return a.address.toLowerCase().includes(this.query.toLowerCase())
        })
    },
  },

  methods: {
    ...mapActions(useMultiWallet, ['querier']),
    change(e) {
      if (this.onChange) this.onChange(this.v)
    },
    reset() {
      this.v = null
    },
    debounce() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => { this.search() }, 300)
    },
    formatRecord(str) {
      return `${str}`.replace(this.query, `<b>${this.query}</b>`)
    },

    async search() {
      if (!this.query || !this.query.length) return
      this.loading = true
      const query = `${this.query}`

      for (const ns in nameserviceContracts) {
        const contractAddr = nameserviceContracts[ns]
        // TODO: Get the chain prefix
        const prefix = 'stargaze'
        const network = this.networks.find(n => n.chain.chain_name.search(prefix) > -1)

        if (network?.chain?.chain_name) {
          const chainName = network.chain?.chain_name
          const q = await this.querier(chainName)
          let queryMsg = {}

          if (ns === 'stargaze') queryMsg = { associated_address: { name: query } }

          // const queryMsg = stargazeMsg = {
          //   name: { address: query },
          // }

          // const queryMsg = icnsMsg = {
          //   icns_names: { address: query },
          // }

          // First get the list of agents, compute network stats
          try {
            const res = await q.wasm.queryContractSmart(contractAddr, queryMsg)
            console.log('name res', prefix, res)
          } catch (e) {
            // 
            console.log('name res ERRRR', e)
          }
        }
      }

      this.loading = false
    },
  },

  mounted() {
    if (this.default) this.v = this.default
  },

  watch: {
    'query': ['debounce'],
  },
};
</script>