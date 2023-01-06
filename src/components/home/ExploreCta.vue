<template>
  <div>
    <div class="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32">
      <div class="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <div>
          <h2 class="text-lg font-semibold text-cyan-600">Explore</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to try it out?!</p>
          <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500">Checkout these recipes you can start using now!</p>
        </div>
      </div>
    </div>

    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        <!-- <div class="relative aspect-[9/10] -rotate-2 hover:rotate-0 transition-all w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl">
          hello
        </div>
        <div class="relative aspect-[9/10] rotate-1 hover:rotate-0 transition-all w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl">
          hello
        </div>
        <div class="relative aspect-[9/10] -rotate-1 hover:rotate-0 transition-all w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl">
          hello
        </div>
        <div class="relative aspect-[9/10] rotate-2 hover:rotate-0 transition-all w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl">
          hello
        </div>
        <div class="relative aspect-[9/10] -rotate-1 hover:rotate-0 transition-all w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 sm:w-72 sm:rounded-2xl">
          hello
        </div> -->

        <template v-if="recipeData.length > 0">
          <router-link v-for="(recipe, index) in recipeData || []" :key="index" to="/create">
            <div class="relative aspect-[9/10] w-44 flex-none sm:w-72">
              <RecipeCard :bgColor="recipe.bgColor" :data="recipe" :class="['h-full hover:rotate-0 transition-all', rotations[index]]" />
            </div>
          </router-link>
        </template>
      </div>
    </div>

    <div>

    </div>
  </div>
</template>

<script lang="ts">
import { appConfig } from "@/utils/constants";
import { recipes } from "@/utils/recipeHelpers";
import RecipeCard from "@/components/RecipeCard.vue";

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

export default {
  components: {
    RecipeCard,
  },

  data() {
    return {
      rotations,
      recipeData: recipes(appConfig.networkType).slice(0,5)
    };
  },
};
</script>
