<script setup lang="ts">
import IconComponent from "@/components/IconComponent.vue";
import { ChannelTypes } from "@/stores/channels";
import { defineProps } from "vue";

const props = defineProps({
  type: String as () => ChannelTypes,
  title: String,
});
</script>

<template>
  <IconComponent :type="props?.type" class="text-muted-foreground" />
  {{ props?.title }}
</template>
