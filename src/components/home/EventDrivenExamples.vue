<template>
  <section class="py-32">
    <div class="md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
      <main class="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div class="relative sm:text-center lg:text-left">
  
          <div class="transform scale-95 -rotate-3 translate-x-2 translate-y-15  block relative z-30 shadow-2xl bg-white dark:bg-gray-800 border-2 border-[#0C53D4] rounded-xl sm:rounded-xl p-4 space-y-6">
            <div class="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
              <div class="flex w-20 h-20 rounded-lg bg-[#0C53D4] text-white">
                <ArrowsUpDownIcon class="m-auto h-8 w-8" />
              </div>
              <div class="min-w-0 flex-auto space-y-0.5">
                <p class="text-[#0C53D4] text-xs sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
                  DCA when ATOM down 5%
                </p>
                <h2
                  class="text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold">
                  Swap <span class="text-[#0C53D4]">34 ATOM</span> for <span class="text-[#0C53D4]">19 OSMO</span>
                  on account <strong class="underline">bobross.cosmos</strong>
                </h2>
              </div>
            </div>
          </div>
  
          <div class="transform scale-90 rotate-2 block relative z-20 shadow-xl bg-white dark:bg-gray-800 border-2 border-[#A42754] rounded-xl sm:rounded-xl p-4 space-y-6">
            <div class="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
              <div class="flex w-20 h-20 rounded-lg bg-[#A42754] text-white">
                <GiftIcon class="m-auto h-8 w-8" />
              </div>
              <div class="min-w-0 flex-auto space-y-0.5">
                <p class="text-[#A42754] text-xs sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
                  Staking Rewards
                </p>
                <h2 class="text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold">
                  <strong class="underline">paint.juno</strong> has earned <span class="text-[#A42754]">2.086 JUNO</span> from auto-compounding!
                </h2>
              </div>
            </div>
          </div>
  
          <div class="transform scale-75 -rotate-2 block relative z-10 shadow-lg bg-white dark:bg-gray-800 border-2 border-[#FFB31B] rounded-xl sm:rounded-xl p-4 space-y-6">
            <div class="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
              <div class="flex w-20 h-20 rounded-lg bg-[#FFB31B] text-white">
                <BuildingLibraryIcon class="m-auto h-8 w-8" />
              </div>
              <div class="min-w-0 flex-auto space-y-0.5">
                <p class="text-[#FFB31B] text-xs sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
                  DAO Proposal
                </p>
                <h2
                  class="text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold">
                  <strong class="underline">happytrees.juno</strong> called method <span
                    class="text-[#FFB31B]">paint</span> on your<br>contract <strong
                    class="underline">art.bobross.juno</strong>
                </h2>
              </div>
            </div>
          </div>
  
          <div class="transform scale-75 rotate-6 block relative z-1 shadow-md bg-white dark:bg-gray-800 border-2 border-[#276A7B] rounded-xl sm:rounded-xl p-4 space-y-6">
            <div class="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5">
              <div class="flex w-20 h-20 rounded-lg bg-[#276A7B] text-white">
                <PhotoIcon class="m-auto h-8 w-8" />
              </div>
              <div class="min-w-0 flex-auto space-y-0.5">
                <p class="text-[#276A7B] text-xs sm:text-base lg:text-sm xl:text-base font-semibold uppercase">
                  NFT Collection Launch
                </p>
                <h2 class="text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold">
                  New art from your watched artist <strong class="underline">ninja.stars</strong>, <span class="text-[#276A7B]">mint 5</span> started.
                </h2>
              </div>
            </div>
          </div>
  
  
        </div>
      </main>
      <main class="flex mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div class="sm:text-center lg:text-left my-auto">
          <h2 class="text-lg font-semibold text-indigo-600">Event-based Automation</h2>
          <h3 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Always ready, even right meow</h3>
          <p class="mt-3 text-lg text-gray-500">CronCat handles watching the chain for exactly the right time to execute. Our agents react to the blockchain natively, so you don't have to.</p>

          <dl class="mt-10 space-y-10">
            <div v-for="item in features" :key="item.id" class="relative">
              <dt>
                <div class="absolute flex h-12 w-12 items-center justify-center rounded-xl text-white" :style="{ background: item.color }">
                  <component :is="item.icon" class="h-8 w-8" aria-hidden="true" />
                </div>
                <p class="ml-16 text-lg font-medium leading-6 text-gray-900">{{ item.name }}</p>
              </dt>
              <dd class="mt-2 ml-16 text-base text-gray-500">{{ item.description }}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  
  </section>
</template>

<script setup>
import {
  ArrowsUpDownIcon,
  BoltIcon,
  BuildingLibraryIcon,
  LightBulbIcon,
  PhotoIcon,
  GiftIcon,
} from '@heroicons/vue/24/outline'
const features = [
  {
    id: 1,
    name: 'Dynamic Logic Queries',
    description: 'Each task can have special data checks to evaluate if the task should go or not. Flexible enough to check things like price, NFT collections, DAO proposals or if cat treats available.',
    icon: LightBulbIcon,
    color: '#FFB31B',
  },
  {
    id: 2,
    name: 'Realtime Actions',
    description: `Tasks can react when market conditions change or match criteria you define to execute. Tasks are handled exactly as you intend, so you don't have to wait around to make that transaction at the right time.`,
    icon: BoltIcon,
    color: '#0C53D4',
  },
]
</script>