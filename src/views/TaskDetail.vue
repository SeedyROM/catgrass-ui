<template>
  <main>
    <template v-if="!exists && !loading">
      <PageHeader title="Recipe Not Found" backgroundColor="#78fbff" />
      
      <div class="py-8 md:mx-auto md:max-w-6xl">
        <div class="max-w-[400px] mx-auto px-4">
          <h3 class="text-center my-12">
            This recipe could not be found. Please check the recipe hash is right and try again.
          </h3>
      
          <router-link to="/explore"
            class="mx-auto flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
            View All Recipes
          </router-link>
        </div>
      </div>
    </template>

    <template v-if="exists && loading">
      <PageHeader title="Finding Recipe..." backgroundColor="#f9f9f9" />
      
      <div class="py-8 md:mx-auto md:max-w-6xl">
        <div class="max-w-[400px] mx-auto px-4">
          <Loader v-if="loading" class="w-24 m-auto" />
        </div>
      </div>
    </template>

    <template v-if="exists && !loading">
      <TaskHeader :data="{ task }" />
      
      <div class="m-auto mt-4 mb-0 pb-8 w-10/12 md:mt-8 md:w-1/2">
        <!-- Buttons: CopyCat, Owner(Refill, Delete) -->
        <div class="flex flex-col md:flex-row md:justify-between mb-12">
          <div class="flex flex-col md:flex-row">
            <Button :className="{'mb-4 md:mb-0 text-white bg-green-700 hover:bg-green-800': true}" @click="copycatTask" size="2xl" variant="ghost">
              <DocumentDuplicateIcon class="w-6" />
              <span class="uppercase">CopyCat</span>
            </Button>
          </div>
          <div v-if="isOwner" class="flex flex-col md:flex-row">
            <Button
              class="mb-4 md:mb-0 md:mr-4"
              :disabled="refilling == true"
              @click="refillOpen = true"
              size="2xl"
              variant="primary"
            >
              <ArrowUpCircleIcon v-if="!refilling" class="w-6" />
              <Loader v-if="refilling" class="w-6" color="white" />
              <span class="uppercase">Refill</span>
            </Button>
            <Button
              :disabled="deleting == true"
              @click="deleteTask"
              size="2xl" 
              :class="{
                'mb-4 md:mb-0': true,
                'border-2 border-gray-700 hover:bg-btn-secondary-hover active:bg-btn-secondary-pressed': !deleting,
                'border-2 border-gray-700 bg-gray-800 bg-btn-secondary-hover text-white': deleting,
              }"
            >
              <TrashIcon v-if="!deleting" class="w-6" />
              <Loader v-if="deleting" class="w-6" color="white" />
              <span class="uppercase">Delete</span>
            </Button>
          </div>
        </div>


        <Label class="mb-2" name="Schedule" />
        <KeyValueCard :data="schedule" :loading="loading" className="" />

        <br />

        <Label class="mb-2" name="Summary" />
        <KeyValueCard :data="summary" :loading="loading" className="" />

        <br />
        
        <AdvancedTaskView :task="task" className="" />

        <!-- TODO: Needs API -->
        <!-- <Label class="pt-12 mb-4" name="Transaction History" /> -->
        <!-- <div class="pb-12 flow-root">
          <ul role="list" class="-mb-8">
            <li v-for="(event, eventIdx) in txHistory" :key="event.id">
              <div class="relative pb-8">
                <span v-if="eventIdx !== txHistory.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true" />
                <div class="relative flex space-x-3">
                  <div>
                    <span
                      :class="[event.iconBackground, 'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-gray-50']">
                      <component :is="event.icon" class="h-5 w-5 text-white" aria-hidden="true" />
                    </span>
                  </div>
                  <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                    <div>
                      <p class="text-sm text-gray-500">
                        {{ event.content }} <a :href="event.href" class="font-medium text-gray-900">{{ event.target }}</a>
                      </p>
                    </div>
                    <div class="whitespace-nowrap text-right text-sm text-gray-500">
                      <time :datetime="event.datetime">{{ event.date }}</time>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div> -->

        <TransitionRoot as="template" :show="refillOpen">
          <Dialog as="div" class="relative z-10" @close="refillOpen = false">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
              leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
              <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
        
            <div class="fixed inset-0 z-10 overflow-y-auto">
              <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <TransitionChild as="template" enter="ease-out duration-300"
                  enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                  leave-from="opacity-100 translate-y-0 sm:scale-100"
                  leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                  <DialogPanel
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                    <div class="flex flex-col mb-8">
                      <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                        Refill Task Balance
                      </DialogTitle>
                      <div class="my-2">
                        <p class="text-sm text-gray-500">Set the amount you'd like to refill, this amount will be used for both paying
                          transaction fees and any forwarded balances used inside the task actions.</p>
                      </div>

                      <Label class="mt-8 mb-2" name="Token amount" />
                      <TokenInputSelector :onChange="pickTokenInput" :options="availableTokens" />
                    </div>
                    <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                      <button type="button"
                        class="inline-flex w-full uppercase justify-center rounded-md border border-transparent bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                        @click="refillTask">Refill</button>
                      <button type="button"
                        class="mt-3 inline-flex w-full uppercase justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                        @click="refillOpen = false" ref="cancelButtonRef">Cancel</button>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>

      </div>
    </template>
  </main>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import type { Asset } from "@chain-registry/types";
import { useMultiWallet, getChainForAccount } from "@/stores/multiWallet"
import {
  ellipseLongString,
  addCommas,
  formatInterval,
  formatBoundary,
  getChainAssetList,
  getDeployedContractsByAddress,
} from "@/utils/helpers"
import { deployedContracts } from "@/utils/constants"
import { decodedMessage } from "@/utils/mvpData";
import type { Task } from "@/utils/types"
import PageHeader from "@/components/PageHeader.vue";
import TaskHeader from "@/components/TaskHeader.vue";
import Loader from "@/components/Loader.vue";
import Button from "@/components/core/buttons/Button.vue";
import Label from "@/components/core/display/Label.vue";
import Balance from "@/components/core/display/Balance.vue";
import KeyValueCard from "@/components/KeyValueCard.vue";
import AdvancedTaskView from "@/components/AdvancedTaskView.vue";
import TokenInputSelector from '@/components/core/inputs/TokenInputSelector.vue'
import LogoFromImage from "@/components/core/display/LogoFromImage.vue";
import {
  ArrowUpCircleIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid'
import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/vue/20/solid'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

// const txHistory = [
//   {
//     id: 1,
//     content: 'Applied to',
//     target: 'Front End Developer',
//     href: '#',
//     date: 'Sep 20',
//     datetime: '2020-09-20',
//     icon: UserIcon,
//     iconBackground: 'bg-gray-400',
//   },
//   {
//     id: 2,
//     content: 'Advanced to phone screening by',
//     target: 'Bethany Blake',
//     href: '#',
//     date: 'Sep 22',
//     datetime: '2020-09-22',
//     icon: HandThumbUpIcon,
//     iconBackground: 'bg-blue-500',
//   },
//   {
//     id: 3,
//     content: 'Completed phone screening with',
//     target: 'Martha Gardner',
//     href: '#',
//     date: 'Sep 28',
//     datetime: '2020-09-28',
//     icon: CheckIcon,
//     iconBackground: 'bg-green-500',
//   },
//   {
//     id: 4,
//     content: 'Advanced to interview by',
//     target: 'Bethany Blake',
//     href: '#',
//     date: 'Sep 30',
//     datetime: '2020-09-30',
//     icon: HandThumbUpIcon,
//     iconBackground: 'bg-blue-500',
//   },
//   {
//     id: 5,
//     content: 'Completed interview with',
//     target: 'Katherine Snyder',
//     href: '#',
//     date: 'Oct 4',
//     datetime: '2020-10-04',
//     icon: CheckIcon,
//     iconBackground: 'bg-green-500',
//   },
// ]

export default {
  components: {
    PageHeader,
    KeyValueCard,
    AdvancedTaskView,
    TokenInputSelector,
    TaskHeader,
    Balance,
    Button,
    Loader,
    Label,
    LogoFromImage,
    ArrowUpCircleIcon,
    DocumentDuplicateIcon,
    TrashIcon,
    ExclamationTriangleIcon,
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
  },

  data() {
    return {
      addCommas,
      ellipseLongString,
      loading: false,
      exists: true,
      refilling: false,
      deleting: false,
      refillOpen: false,
      task: {},
      refillBalance: null,
      availableTokens: [] as Asset[],
      // txHistory,
    };
  },

  computed: {
    ...mapState(useMultiWallet, ['networks', 'walletManager', 'accounts']),
    isOwner() {
      if (!this.task || !this.accounts || this.accounts.length < 1) return false

      // Check task.owner_id against all accounts
      const owner_id = this.task.owner_id
      if (!owner_id) return false
      return this.accounts.map(a => a.address).includes(owner_id)
    },
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
    schedule() {
      const schedule: any = {}

      if (this.interval) schedule.interval = this.interval
      if (this.start) schedule.start = this.start
      if (this.end) schedule.end = this.end

      return schedule
    },
    summary() {
      const summary: any = {}

      if (this.fundsTotal) summary.current_balance = this.fundsTotal
      if (this.occurrences) summary.remaining_occurrences = this.occurrences

      return summary
    },
    interval() {
      if (!this.task?.interval) return;
      return formatInterval(this.task.interval)
    },
    start() {
      return formatBoundary(this.task.boundary, 'start')
    },
    end() {
      return formatBoundary(this.task.boundary, 'end')
    },
    fundsTotal() {
      if (!this.task?.total_deposit) return { amount: '0', denom: '' }
      const attachedFunds = this.task?.total_deposit && this.task?.total_deposit.length > 0 ? this.task.total_deposit[0] : null
      const amount = attachedFunds ? parseInt(attachedFunds.amount) : 0
      const denom = attachedFunds && attachedFunds.denom ? attachedFunds.denom : ''
      return { amount, denom }
    },
    occurrences() {
      if (!this.task?.total_deposit || !this.task?.amount_for_one_task_native) return '0'
      // divide total deposit amount by amount for 1 task
      const totalAmt = parseInt(`${this.task?.total_deposit[0].amount}`)
      const singleAmt = parseInt(`${this.task?.amount_for_one_task_native[0].amount}`)
      return `${Math.floor(totalAmt / singleAmt)}`
    },
  },

  methods: {
    ...mapActions(useMultiWallet, ['querier', 'execContract']),
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
      return `${Math.floor(totalAmt / singleAmt)}`
    },
    deleteTask() {
      // check if is not owner
      if (!this.isOwner || !this.task?.task_hash) return
      const c = confirm('Are you sure you want to delete this task forever?')
      if (!c) return;

      const contract_addr = getDeployedContractsByAddress(this.task.owner_id).manager
      const msg = { remove_task: { task_hash: this.task.task_hash } }

      this.sign({ contract_addr, msg, funds: [] }, 'deleting')
    },
    pickTokenInput(coin: Coin) {
      this.refillBalance = coin
    },
    refillTask() {
      // check if is not owner
      if (!this.isOwner) return
      let funds
      const contract_addr = getDeployedContractsByAddress(this.task.owner_id).manager
      const msg = { refill_task_balance: { task_hash: this.task.task_hash } }

      if (this.refillBalance) funds = [this.refillBalance]
      if (!funds) return;

      this.refilling = true
      this.refillOpen = false
      this.sign({ contract_addr, msg, funds }, 'refilling')
    },
    async sign({ contract_addr, msg, funds }, type) {
      if (!this.task?.task_hash) return;
      // update status
      this[type] = true

      let signer
      // Get current task "owner_id" account's chain name
      if (this.task?.owner_id) {
        signer = this.accounts.find((a: Account) => a.address === this.task.owner_id)
      }
      console.log('signer', signer);

      try {
        const txData = await this.execContract(signer, contract_addr, msg, 'auto', null, funds)
        console.log('txData', txData);

        // update status
        this[type] = false
        if (type === 'deleting') this.$router.push({ path: '/tasks/all' })
        if (type === 'refilling') this.loadContext()
      } catch (e) {
        console.log('sign e', e);
        // update status
        this[type] = false
      }
    },
    copycatTask() {
      if (!this.task?.task_hash) return;
      this.$router.push({ path: `/create`, query: { copycat: this.task.task_hash } })
    },
    async loadContext() {
      const task_hash = this.$route.params?.hash
      if (!task_hash) {
        return;
      }

      const msgGetTask = { get_task: { task_hash } }
      const p = []

      // Get a task from all the networks, race them
      for (const prefix in deployedContracts) {
        if (deployedContracts[prefix] && deployedContracts[prefix].manager) {
          const contractAddr = deployedContracts[prefix].manager
          const network = this.networks.find(n => n.chain.chain_name.search(prefix) > -1)
          if (network?.chain?.chain_name) {
            const chainName = network.chain?.chain_name
            const q = await this.querier(chainName)

            p.push(new Promise(async (res, rej) => {
              try {
                const data = await q.wasm.queryContractSmart(contractAddr, msgGetTask)
                res(data)
              } catch (e) {
                // 
                res(null)
              }
            }))
          }
        }
      }

      // First network to complete wins
      const tasks = await Promise.all(p)
      const task = tasks.find(t => t != null)

      // TODO: Once found a task, use the known network to get tasks list for pagination

      if (task) this.task = task
      else {
        this.exists = false
        this.loading = false
        return
      }

      // set the task balance tokens
      const chain = getChainForAccount({ address: task.owner_id }, this.networks)
      const tokens = getChainAssetList(chain)
      const denoms = this.task.total_deposit.map(t => t.denom)
      this.availableTokens = tokens?.filter(t => denoms.includes(t.base))

      // Enable formatting
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
      
      this.task = task
      this.loading = false
    },
  },

  mounted() {
    this.loading = true
    this.exists = true
    this.loadContext()
  }
};
</script>
