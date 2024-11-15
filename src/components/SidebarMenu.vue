<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "SidebarMenu",  // add a name here for clarity
});
</script>

<template>
  <div class="sidebar">
    <!-- Your Sidebar Menu Content Here -->
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
