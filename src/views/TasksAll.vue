<template>
  <main>
    <PageHeader title="All Tasks" backgroundColor="#98f0ff" />

    <div class="py-8 md:mx-auto md:max-w-6xl">
      <div class="w-full px-4">
        <div>
          <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">

            <li v-for="(item, idx) in networksStats" :key="idx" class="col-span-1 flex rounded-md">
              <div 
                class="flex-shrink-0 flex items-center justify-center w-16 bg-orange-600 text-white text-sm font-medium rounded-l-md"
                :style="{ backgroundColor: item.brandColor }"
              >
                <LogoFromImage class="block" :rounded="true" size="42" :src="item.asset?.logo_URIs?.png || ''" />
              </div>
              <div
                class="flex flex-1 items-center justify-between truncate rounded-r-md border-t-2 border-r-2 border-b-2 border-gray-200 bg-white"
                :style="{ borderColor: item.brandColor }"
              >
                <div class="flex-1 truncate px-4 py-2 text-sm">
                  <h3 class="font-medium text-gray-900 hover:text-gray-600">{{ item.chain.pretty_name }}</h3>
                  <p class="text-gray-500">{{item.stats}}</p>
                </div>
              </div>
            </li>

          </ul>
        </div>

        <div class="-mx-4 mt-12 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Task Hash</th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">Remaining Execs</th>
                <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">Deposits</th>
                <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stats</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="(item, idx) in tasks" :key="idx">
                <td class="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-6">
                  {{ ellipseLongString(item.task_hash, 20) }}
                  <dl class="font-normal lg:hidden">
                    <dt class="sr-only">Task Hash</dt>
                    <dd class="mt-1 truncate text-gray-700">{{ computeRemainingExecs(item) }}</dd>
                    <dt class="sr-only sm:hidden">Deposits</dt>
                    <dd class="mt-1 truncate text-gray-500 sm:hidden">
                      <template v-for="native in item.total_deposit" :key="native">
                        <Balance :balance="native" :decimals="6" />
                      </template>
                      <template v-for="cw20 in item.total_cw20_deposit" :key="cw20">
                        <Balance :balance="cw20" :decimals="6" />
                      </template>
                    </dd>
                  </dl>
                </td>
                <td class="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">{{ computeRemainingExecs(item) }}</td>
                <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                  <template v-for="native in item.total_deposit" :key="native">
                    <Balance :balance="native" :decimals="6" />
                  </template>
                  <template v-for="cw20 in item.total_cw20_deposit" :key="cw20">
                    <Balance :balance="cw20" :decimals="6" />
                  </template>
                </td>
                <td class="px-3 py-4 text-sm text-gray-500">
                  <span class="inline-flex rounded-full px-2 text-xs font-semibold leading-5">{{ getTaskStats(item) }}</span>
                </td>
              </tr>
            </tbody>
          </table>

          <Loader v-if="loading" class="w-24 m-auto" />
        </div>

      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useMultiWallet } from "@/stores/multiWallet"
import { ellipseLongString, addCommas } from "@/utils/helpers"
import { deployedContracts } from "@/utils/constants"
import type { Task } from "@/utils/types"
import PageHeader from "@/components/PageHeader.vue";
import Loader from "@/components/Loader.vue";
import Label from "@/components/core/display/Label.vue";
import Balance from "@/components/core/display/Balance.vue";
import LogoFromImage from "@/components/core/display/LogoFromImage.vue";

export default {
  components: {
    PageHeader,
    Balance,
    Loader,
    Label,
    LogoFromImage,
  },

  data() {
    return {
      addCommas,
      ellipseLongString,
      loading: false,
      tasksMap: {},
      networkMap: {},
    };
  },

  computed: {
    ...mapState(useMultiWallet, ['networks', 'walletManager']),
    tasks() {
      let a: any = []
      Object.keys(this.tasksMap).forEach(k => {
        a = a.concat(this.tasksMap[k])
      })
      return a
    },
    networksStats() {
      if (!this.networks || this.networks.length === 0) return;
      return this.networks.filter(n => n.supported != this.disabled).map(n => {
        if (this.networkMap[n.chain.chain_name]) {
          const m = this.networkMap[n.chain.chain_name]
          n.stats = `${m || '-'} ${m == 1 ? 'Task' : 'Tasks'}`
        } else {
          n.stats = `- Tasks`
        }
        return n
      })
    },
  },

  methods: {
    ...mapActions(useMultiWallet, ['querier']),
    getTaskStats(task: Task) {
      const queries = task.queries && task.queries.length > 0 ? `${task.queries.length == 1 ? '1 query, ' : task.queries.length + ' queries, '}` : ''
      const transforms = task.transforms ? `${task.transforms.length == 1 ? ' 1 transform, ' : task.transforms.length + ' transforms, '}` : ''
      const actions = `${task.actions.length == 1 ? '1 action' : task.actions.length + ' actions'}`
      return `${queries}${transforms}${actions}`
    },
    computeRemainingExecs(task: Task) {
      // divide total deposit amount by amount for 1 task
      const totalAmt = parseInt(`${task?.total_deposit[0].amount}`)
      const singleAmt = parseInt(`${task?.amount_for_one_task_native[0].amount}`)
      console.log('totalAmt / singleAmt', totalAmt, singleAmt, totalAmt / singleAmt);
      

      return `${Math.floor(totalAmt / singleAmt)}`
    },
    async loadContext() {
      const msgGetTasks = { get_tasks: {} }

      for (const prefix in deployedContracts) {
        if (deployedContracts[prefix] && deployedContracts[prefix].manager) {
          const contractAddr = deployedContracts[prefix].manager
          const network = this.networks.find(n => n.chain.bech32_prefix === prefix)
          if (network?.chain?.chain_name) {
            const chainName = network.chain?.chain_name
            const q = await this.querier(chainName)

            // Get all the tasks for all networks
            try {
              const res = await q.wasm.queryContractSmart(contractAddr, msgGetTasks)
              console.log('res', res);
              this.networkMap[chainName] = res && res.length ? res.length : 0
              this.tasksMap[chainName] = res && res.length ? res : []
            } catch (e) {
              // 
            }
          }
        }
      }

      this.loading = false
    },
  },

  mounted() {
    this.loading = true
    this.loadContext()
  }
};
</script>
