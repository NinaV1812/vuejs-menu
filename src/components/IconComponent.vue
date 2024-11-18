<template>
  <div class="channel-icon">
    <!-- Dynamically render the icon component based on the 'type' prop -->
    <component :is="iconComponent" class="icon" v-if="iconComponent" />
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Phone, Mail, MessageCircle } from "lucide-vue-next";
import { ChannelTypes } from "@/stores/counter"; // Adjust the path accordingly

// Define the props to receive the channel type
const props = defineProps<{ type: ChannelTypes }>();

// Define a map that associates each ChannelType with its corresponding icon component
const iconMap = {
  [ChannelTypes.Phone]: Phone,
  [ChannelTypes.Email]: Mail,
  [ChannelTypes.WhatsApp]: MessageCircle,
};

// Compute the icon component based on the 'type' prop
const iconComponent = computed(() => iconMap[props.type]);
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
  color: #6c757d;
}
</style>
