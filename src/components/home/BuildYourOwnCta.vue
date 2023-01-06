<template>
  <div class="overflow-hidden mt-20 py-20 sm:py-32 lg:pb-32 xl:pb-36">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
        <div class="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
          <h1 class="text-4xl font-medium tracking-tight text-gray-900">Build your automation</h1>
          <p class="mt-6 text-lg text-gray-600">Take your idea to automated in a matter of minutes by configuring your custom blockchain messages.<br>Create a novel recipe for others to copycat, and you will earn royalties!</p>
          <div class="mt-8 flex flex-wrap gap-x-6 gap-y-4">
            <router-link class="inline-flex justify-center rounded-full text-sm uppercase py-[12px] px-[24px] transition-colors text-white bg-green-700 hover:bg-green-800" to="/create">
              <span class="mr-4 my-auto">Create Your Recipe</span>
              <ArrowRightCircleIcon class="w-5 h-5" />
            </router-link>
          </div>
        </div>
        <div class="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
          <div class="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0">
            <svg viewBox="0 0 1026 1026" fill="none" aria-hidden="true"
              class="absolute inset-0 h-full w-full animate-spin-slow">
              <path d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
                stroke="#D4D4D4" stroke-opacity="0.7"></path>
              <path d="M513 1025C230.23 1025 1 795.77 1 513" stroke="url(#:r3:-gradient-1)" stroke-linecap="round">
              </path>
              <defs>
                <linearGradient id=":r3:-gradient-1" x1="1" y1="513" x2="1" y2="1025" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#06b6d4"></stop>
                  <stop offset="1" stop-color="#06b6d4" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
            <svg viewBox="0 0 1026 1026" fill="none" aria-hidden="true"
              class="absolute inset-0 h-full w-full animate-spin-reverse-slower">
              <path
                d="M913 513c0 220.914-179.086 400-400 400S113 733.914 113 513s179.086-400 400-400 400 179.086 400 400Z"
                stroke="#D4D4D4" stroke-opacity="0.7"></path>
              <path d="M913 513c0 220.914-179.086 400-400 400" stroke="url(#:r3:-gradient-2)" stroke-linecap="round">
              </path>
              <defs>
                <linearGradient id=":r3:-gradient-2" x1="913" y1="513" x2="913" y2="913" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#06b6d4"></stop>
                  <stop offset="1" stop-color="#06b6d4" stop-opacity="0"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div class="-mx-4 h-[448px] px-9 [mask-image:linear-gradient(to_bottom,white_80%,transparent)] sm:mx-0 lg:absolute lg:-inset-x-10 lg:-top-10 lg:-bottom-20 lg:h-auto lg:px-0 lg:pt-10 xl:-bottom-32">
            <div class="relative aspect-[366/729] mx-auto max-w-[366px]">
              <img alt="" src="/Recipe_Detail_multi-task.png" width="390" height="1102" decoding="async" data-nimg="2" class="pointer-events-none absolute inset-6 h-auto w-[87%]" style="color: transparent;">
              <img alt="" src="/phone-frame.svg" width="366" height="729" decoding="async" data-nimg="1" class="pointer-events-none absolute inset-0 h-full w-full" style="color: transparent;">
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowRightCircleIcon,
} from '@heroicons/vue/24/outline'
</script>