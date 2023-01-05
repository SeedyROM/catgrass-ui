<template>
  <div>
    <Hero />
    <EventDrivenExamples />
    <ScheduledExamples />
    <ExploreCta />
    <BuildYourOwnCta />
    <DocsDevs />
    <EmailSubscribe />
  </div>
</template>

<script lang="ts">
import Hero from "@/components/home/Hero.vue"
import EventDrivenExamples from "@/components/home/EventDrivenExamples.vue"
import ScheduledExamples from "@/components/home/ScheduledExamples.vue"
import ExploreCta from "@/components/home/ExploreCta.vue"
import BuildYourOwnCta from "@/components/home/BuildYourOwnCta.vue"
import DocsDevs from "@/components/home/DocsDevs.vue"
import EmailSubscribe from "@/components/home/EmailSubscribe.vue"

export default {
  components: {
    Hero,
    EventDrivenExamples,
    ScheduledExamples,
    ExploreCta,
    BuildYourOwnCta,
    DocsDevs,
    EmailSubscribe,
  },
}
</script>