<script lang="ts">
import { SidebarMenu } from "@/components/ui/sidebar";

export default {
  components: {
    SidebarMenu,
  },
};
</script>

<template>
  <div class="sidebar">
    <SidebarMenu />
  </div>
</template>

<style scoped>
.sidebar {
  width: 30%;
  background-color: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
}
</style>
