<!-- ChannelIcon.vue -->
<template>
    <div class="channel-icon">
      <component :is="iconComponent" class="icon" v-if="iconComponent" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps, computed } from "vue";
  import { Phone, Mail, MessageCircle } from "lucide-vue-next";
  import { ChannelTypes } from "@/stores/counter"; // Adjust the path accordingly
  
  const props = defineProps<{ type: ChannelTypes }>();
  
  // Define a map with the ChannelTypes as keys and corresponding icon components as values
  const iconMap = {
    [ChannelTypes.Phone]: Phone,
    [ChannelTypes.Email]: Mail,
    [ChannelTypes.WhatsApp]: MessageCircle,
  };
  
  // Use computed to select the icon based on the type prop
  const iconComponent = computed(() => iconMap[props.type]);
  </script>
  
  <style scoped>
  .icon {
    width: 20px;
    height: 20px;
    color: #6c757d;
  }
  </style>
  