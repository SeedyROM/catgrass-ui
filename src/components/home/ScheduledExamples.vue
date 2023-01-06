<template>
  <div class="relative bg-white py-24 sm:py-32 lg:py-40">
    <div class="mx-auto max-w-md px-6 text-center sm:max-w-3xl lg:max-w-7xl lg:px-8">
      <h2 class="text-lg font-semibold text-orange-600">Scheduled Automation</h2>
      <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Let our decentralized cats handle it</p>
      <p class="mx-auto mt-5 max-w-prose text-xl text-gray-500">Timing is everything, especially for your assets. No need to paws your favorite DeFi apps while you're away.</p>
      <div class="mt-20">
        <div class="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.name" class="pt-6">
            <div class="flow-root rounded-lg bg-gray-50 px-6 pb-8">
              <div class="-mt-6">
                <div>
                  <span class="inline-flex items-center justify-center rounded-xl p-3 shadow-lg" :style="{ background: feature.color }">
                    <component :is="feature.icon" class="h-8 w-8 text-white" aria-hidden="true" />
                  </span>
                </div>
                <h3 class="mt-8 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ feature.name }}</h3>
                <p class="mt-5 text-base leading-7 text-gray-600">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowPathRoundedSquareIcon,
  CubeIcon,
  CubeTransparentIcon,
  CloudArrowUpIcon,
  ClockIcon,
  LockClosedIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

const features = [
  {
    name: 'Block Interval',
    description: 'Tasks can be run at block height intervals, matching other apps natively.',
    icon: CubeIcon,
    color: '#A42754',
  },
  {
    name: 'Recurring',
    description: 'Specify once or many times a task can run. Tasks can execute as long as they have budget.',
    icon: ArrowPathRoundedSquareIcon,
    color: '#0C53D4',
  },
  {
    name: 'Sandboxed',
    description: 'Agents only know the timing of when tasks need to run, not the contents of the task.',
    icon: LockClosedIcon,
    color: '#A1A52F',
  },
  {
    name: 'Cron Spec',
    description: 'Use the standard crontab spec to annotate time intervals. Supports blockchain consensus timing.',
    icon: ShieldCheckIcon,
    color: '#276A7B',
  },
  {
    name: 'Block Boundary',
    description: 'Block ranges for starting and ending can be optionally added for your needs.',
    icon: CubeTransparentIcon,
    color: '#D23132',
  },
  {
    name: 'Time Boundary',
    description: 'Start and end tasks at the exact time you need, up to 2 years in the future.',
    icon: ClockIcon,
    color: '#FFB31B',
  },
]
</script>