<template>
  <main>
    <PageHeader title="My Recipes" />

    <div class="py-8 md:mx-auto md:max-w-6xl">
      <Loader v-if="loading" class="w-24 m-auto" />

      <template v-if="!recipeData.length && !loading">
        <div class="flex flex-col">
          <h3 class="text-center my-12 max-w-[600px] mx-auto">
            No recipes yet! There's a whole world of recipes ready for you to try, let's go try some!
          </h3>
        
          <div class="flex flex-row w-auto mx-auto">
            <router-link to="/create">
              <Button :className="{'mb-4 mr-4 md:mb-0 text-white bg-green-700 hover:bg-green-800': true}" size="2xl" variant="ghost">
                <span class="uppercase">Create</span>
              </Button>
            </router-link>
            <router-link to="/explore">
              <Button :className="{'mb-4 md:mb-0 text-white bg-gray-700 hover:bg-gray-800': true}" size="2xl" variant="ghost">
                <span class="uppercase">Explore</span>
              </Button>
            </router-link>
          </div>
        </div>
      </template>

      <div class="grid grid-rows-3 gap-4 w-full md:grid-cols-3">
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
import { deployedContracts } from "@/utils/constants"
import PageHeader from "../components/PageHeader.vue";
import Loader from "../components/Loader.vue";
import Button from "@/components/core/buttons/Button.vue";
import RecipeCard from "../components/RecipeCard.vue";

export default {
  components: {
    PageHeader,
    Loader,
    Button,
    RecipeCard,
  },

  data() {
    return {
      loading: true,
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
      
      for await (const account of this.accounts) {
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
              this.loading = false
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
