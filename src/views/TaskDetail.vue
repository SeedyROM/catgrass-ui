<template>
  <main>
    <template v-if="!exists && !loading">
      <PageHeader title="Task Not Found" backgroundColor="#78fbff" />
      
      <div class="py-8 md:mx-auto md:max-w-6xl">
        <div class="max-w-[400px] mx-auto px-4">
          <h3 class="text-center my-12">
            This task could not be found. Please check the task hash is right and try again.
          </h3>
      
          <router-link to="/tasks/all"
            class="mx-auto flex items-center justify-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 md:py-4 md:text-lg md:px-10">
            View All Tasks
          </router-link>
        </div>
      </div>
    </template>

    <template v-if="exists && loading">
      <PageHeader title="Finding Task..." backgroundColor="#F9226C" />
      
      <div class="py-8 md:mx-auto md:max-w-6xl">
        <div class="max-w-[400px] mx-auto px-4">
          <Loader v-if="loading" class="w-24 m-auto" />
        </div>
      </div>
    </template>

    <template v-if="exists && !loading">
      <TaskHeader :data="{ task }" />
      
      <div class="m-auto mt-4 mb-0 w-10/12 md:mt-8 md:mb-4 md:w-1/2">
        <!-- Buttons: CopyCat, Owner(Refill, Delete) -->
        <div class="flex flex-col md:flex-row md:justify-between">
          <div class="flex flex-col md:flex-row">
            <Button class="mb-4 md:mb-0 bg-green-700 hover:bg-green-800" @click="copycatTask" size="2xl" variant="primary">
              <DocumentDuplicateIcon class="w-6" />
              <span class="uppercase">CopyCat</span>
            </Button>
          </div>
          <div v-if="isOwner" class="flex flex-col md:flex-row">
            <Button class="mb-4 md:mb-0 md:mr-4" @click="refillTask" size="2xl" variant="primary">
              <ArrowUpCircleIcon class="w-6" />
              <span class="uppercase">Refill</span>
            </Button>
            <Button class="mb-4 md:mb-0" @click="deleteTask" size="2xl" variant="secondary">
              <TrashIcon class="w-6" />
              <span class="uppercase">Delete</span>
            </Button>
          </div>
        </div>

        <!-- Summary: Occurences, balance info -->

        <!-- TX History -->
        <div class="py-12 flow-root">
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
        </div>

      </div>
    </template>
  </main>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useMultiWallet } from "@/stores/multiWallet"
import { ellipseLongString, addCommas } from "@/utils/helpers"
import { decodedMessage } from "@/utils/mvpData";
import type { Task } from "@/utils/types"
import PageHeader from "@/components/PageHeader.vue";
import TaskHeader from "@/components/TaskHeader.vue";
import Loader from "@/components/Loader.vue";
import Button from "@/components/core/buttons/Button.vue";
import Label from "@/components/core/display/Label.vue";
import Balance from "@/components/core/display/Balance.vue";
import LogoFromImage from "@/components/core/display/LogoFromImage.vue";
import {
  ArrowUpCircleIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/vue/24/solid'
import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/vue/20/solid'

const demoTask = {
  "task_hash": "24946f413f61e8ef1d26ce2b267dd0915549bf2f22b3a0c70b0736493d1f6e9c",
  "owner_id": "juno1yhqft6d2msmzpugdjtawsgdlwvgq3samrm5wrw",
  "interval": {
    "Block": 1000
  },
  "boundary": {
    "Height": {
      "start": null,
      "end": null
    }
  },
  "stop_on_fail": false,
  "total_deposit": [
    {
      "denom": "ujunox",
      "amount": "18958800"
    }
  ],
  "total_cw20_deposit": [],
  "amount_for_one_task_native": [
    {
      "denom": "ujunox",
      "amount": "37800"
    }
  ],
  "amount_for_one_task_cw20": [],
  "actions": [
    {
      "msg": {
        "wasm": {
          "execute": {
            "contract_addr": "juno174ncqgapq7fudqj64ut4ue47gevlqp93guecjelnkquruvnpjdgsuk046w",
            "msg": "eyAidGljayI6IHt9IH0K",
            "funds": []
          }
        }
      },
      "gas_limit": 300000
    }
  ],
  "queries": null
}


const txHistory = [
  {
    id: 1,
    content: 'Applied to',
    target: 'Front End Developer',
    href: '#',
    date: 'Sep 20',
    datetime: '2020-09-20',
    icon: UserIcon,
    iconBackground: 'bg-gray-400',
  },
  {
    id: 2,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 22',
    datetime: '2020-09-22',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 3,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    href: '#',
    date: 'Sep 28',
    datetime: '2020-09-28',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 4,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    href: '#',
    date: 'Sep 30',
    datetime: '2020-09-30',
    icon: HandThumbUpIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    href: '#',
    date: 'Oct 4',
    datetime: '2020-10-04',
    icon: CheckIcon,
    iconBackground: 'bg-green-500',
  },
]

export default {
  components: {
    PageHeader,
    TaskHeader,
    Balance,
    Button,
    Loader,
    Label,
    LogoFromImage,
    ArrowUpCircleIcon,
    DocumentDuplicateIcon,
    TrashIcon,
  },

  data() {
    return {
      addCommas,
      ellipseLongString,
      loading: false,
      exists: true,
      task: {},
      txHistory,
    };
  },

  computed: {
    ...mapState(useMultiWallet, ['networks', 'walletManager', 'accounts']),
    isOwner() {
      // TODO: Check task.owner_id against all accounts
      return true
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
      return `${Math.floor(totalAmt / singleAmt)}`
    },
    deleteTask() {
      console.log('deleteTaskTASKKKKK', this.task);
    },
    refillTask() {
      console.log('refillTask', this.task);
    },
    copycatTask() {
      console.log('copycatTask', this.task);
    },
    async loadContext() {
      const task_hash = this.$route.params?.hash
      let task
      console.log(this.$route.params);
      
      if (!task_hash) {
        console.log('TODO: No task found, handle this')
        return;
      }

      // TODO: Bring back!
      // const msgGetTask = { get_task: { task_hash } }
      // console.log('msgGetTask', msgGetTask);

      // // Get a task from all the networks
      // for (const prefix in deployedContracts) {
      //   if (deployedContracts[prefix] && deployedContracts[prefix].manager) {
      //     const contractAddr = deployedContracts[prefix].manager
      //     const network = this.networks.find(n => n.chain.bech32_prefix === prefix)
      //     if (network?.chain?.chain_name) {
      //       const chainName = network.chain?.chain_name
      //       const q = await this.querier(chainName)

      //       try {
      //         const res = await q.wasm.queryContractSmart(contractAddr, msgGetTask)
      //         console.log('task res', res)
      //         task = res
      //       } catch (e) {
      //         // 
      //       }
      //     }
      //   }
      // }

      // TODO: Once found a task, use the known network to get tasks list for pagination

      // TODO: REMOVE!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      task = demoTask

      // if (task) this.task = task
      // else this.exists = false

      // TODO: Enable formatting
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

      console.log('task', task);
      
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
