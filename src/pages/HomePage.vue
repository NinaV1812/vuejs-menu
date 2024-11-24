<script>
import { useChannelsStore } from "@/stores/channels";
import { ref } from "vue";

import SideBarMenu from "@/components/SideBarMenu.vue";

export default {
  components: {
    SideBarMenu,
  },
  setup() {
    const { menuItems } = useChannelsStore();
    const expandedIndex = ref(null);
    const hoveredIndex = ref(null);

    const toggleDropdown = (index) => {
      expandedIndex.value = expandedIndex.value === index ? null : index;
    };

    const showLabel = (index) => {
      hoveredIndex.value = index;
    };

    const hideLabel = () => {
      hoveredIndex.value = null;
    };

    return {
      menuItems,
      expandedIndex,
      hoveredIndex,
      toggleDropdown,
      showLabel,
      hideLabel,
    };
  },
};
</script>

<template>
  <Sidebar class="sidebar">
    <SideBarMenu />
  </Sidebar>
</template>

<style>
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
