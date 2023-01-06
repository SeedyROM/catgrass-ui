<template>
  <div>
    <div class="relative bg-gray-50 pt-16 sm:pt-24 lg:pt-32">
      <div class="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
        <div>
          <h2 class="text-lg font-semibold text-cyan-600">Explore</h2>
          <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Ready to try it out?!</p>
          <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500">Here's a few of our favorite recipes, without the tuna</p>
        </div>
      </div>
    </div>

    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        <template v-if="recipeData.length > 0">
          <router-link v-for="(recipe, index) in recipeData || []" :key="index" to="/create">
            <div class="relative aspect-[9/10] w-44 flex-none sm:w-72">
              <RecipeCard :bgColor="recipe.bgColor" :data="recipe" :class="['h-full hover:rotate-0 transition-all', rotations[index]]" />
            </div>
          </router-link>
        </template>
      </div>
    </div>

    <div class="my-12 text-center">
      <router-link to="/explore" as="a" class="inline-flex text-cyan-600 hover:text-cyan-800">
        <span class="text-sm uppercase my-auto">View All Recipes</span>
        <ArrowRightIcon class="ml-4 w-4 h-6" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { appConfig } from "@/utils/constants";
import { recipes } from "@/utils/recipeHelpers";
import RecipeCard from "@/components/RecipeCard.vue";
import {
  ArrowRightIcon,
} from '@heroicons/vue/24/outline'

const rotations = ['rotate-2', '-rotate-2', 'rotate-2', 'rotate-2', '-rotate-2']

export default {
  components: {
    ArrowRightIcon,
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
