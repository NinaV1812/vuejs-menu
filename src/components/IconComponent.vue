<script setup lang="ts">
import { defineProps, computed } from "vue";
import { Phone, Mail, MessageCircle } from "lucide-vue-next";
import { ChannelTypes } from "@/stores/channels"; // Adjust the path accordingly

const props = defineProps<{ type: ChannelTypes }>();

const iconMap = {
  [ChannelTypes.Phone]: Phone,
  [ChannelTypes.Email]: Mail,
  [ChannelTypes.WhatsApp]: MessageCircle,
};

const IconComponent = computed(() => iconMap[props.type]);
</script>

<template>
  <div class="channel-icon">
    <component :is="IconComponent" class="icon" v-if="IconComponent" />
  </div>
</template>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
  color: #6c757d;
}
</style>
