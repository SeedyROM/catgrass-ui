<template>
  <div class="flex justify-between p-2 w-full cursor-pointer">
    <div class="flex flex-row my-auto w-full">
      <div :style="{ minWidth: '42px' }">
        <LogoFromImage class="block" :rounded="true" :size="42" :src="getAccountImage(account)" />
      </div>
      <div class="flex flex-col justify-center w-full px-2">
        <h3 class="block text-lg font-bold leading-4 mb-1 max-w-full">{{account.title}}</h3>
        <div class="w-full flex justify-between">
          <small
            class="block md:inline-block text-xs text-gray-400 lowercase text-ellipsis overflow-hidden">
            {{ellipseLongString(account.address, 25)}}
          </small>
          <small
            v-if="account.balance && hideBalance != true"
            class="block md:inline-block text-xs text-gray-400 uppercase md:mr-0 md:text-right">
            <Balance :amount="account.balance.amount" :denom="account.balance.denom" :decimals="6" />
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { Account } from '../../../utils/types';
import Balance from './Balance.vue';
import LogoFromImage from '@/components/core/display/LogoFromImage.vue';
import { ellipseLongString } from "@/utils/helpers";

export interface AccountProps {
  account: Account
  hideBalance: boolean
}

export default {
  props: ["account", "hideBalance"],

  components: {
    Balance,
    LogoFromImage,
  },

  data() {
    return {
      ellipseLongString,
    };
  },

  methods: {
    getAccountImage(account: Account): string {
      return account.asset?.logo_URIs?.png || account.chain?.asset?.logo_URIs?.png || ''
    }
  },
};
</script>