<template>
  <main>
    <PageHeader title="My Recipes" />

    <div class="py-8 md:mx-auto md:max-w-6xl">
      <div class="grid grid-rows-3 gap-4 w-full md:grid-cols-3">
        <!-- <Loader /> -->
        <template v-if="recipeData.length > 0">
          <router-link v-for="(recipe, index) in recipeData || []" :key="index" :to="`/tasks/${recipe.taskHash || recipe.task.task_hash}`">
            <RecipeCard :bgColor="recipe.bgColor" :data="recipe" class="h-full" />
          </router-link>
        </template>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { useMultiWallet } from "../stores/multiWallet";
import { appConfig, deployedContracts } from "@/utils/constants"
import { recipes } from "@/utils/recipeHelpers";
import PageHeader from "../components/PageHeader.vue";
import Loader from "../components/Loader.vue";
import RecipeCard from "../components/RecipeCard.vue";

export default {
  components: {
    PageHeader,
    Loader,
    RecipeCard,
  },

  data() {
    return {
      loading: false,
      recipeData: [],
    };
  },

  computed: {
    ...mapState(useMultiWallet, ['networks', 'accounts']),
  },

  methods: {
    ...mapActions(useMultiWallet, ['querier']),
    async loadContext() {
      const msgGetOwnerTasks = (owner_id: Addr) => ({ get_tasks_by_owner: { owner_id } })
      let allTasks = []
      
      for (const account of this.accounts) {
        const chainName = account.chain.chain_name
        const prefix = `${chainName}`.replace('testnet', '')
        
        if (deployedContracts[prefix] && deployedContracts[prefix].manager) {
          if (account.chain?.chain_name.search(prefix) > -1) {
            const chainName = account.chain?.chain_name
            const contractAddr = deployedContracts[prefix].manager
            const q = await this.querier(chainName)
            const msg = msgGetOwnerTasks(account.address)

            // Get all the tasks for all networks
            try {
              const tasks = await q.wasm.queryContractSmart(contractAddr, msg)

              // loop & format all for recipes
              tasks.forEach(task => {
                allTasks.push({
                  task,
                  taskHash: task.task_hash
                })
              })
            } catch (e) {
              // 
            }
          }
        }
      }

      if (allTasks.length > 0) this.recipeData = allTasks

      this.loading = false
    },
  },

  mounted() {
    this.loading = true
    this.loadContext()
  },
};
</script>
