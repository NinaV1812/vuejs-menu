<script lang="ts">
import { defineComponent, ref, type Ref } from "vue";
import { SidebarMenuItem } from "@/components/ui/sidebar";

export default defineComponent({
  components: {
    SidebarMenuItem,
  },
  setup() {
    const menuItems = ref([
      { title: "Inbox", options: ["Acme Inc", "Acme Corp."], isEditable: false },
      { title: "Personal", options: ["Project Alpha", "Project Beta"], isEditable: false },
      { title: "Channels", options: ["Channel 1", "Channel 2"], isEditable: true },
    ]);

    const expandedIndex: Ref<number | null> = ref(null);
    const hoveredIndex: Ref<number | null> = ref(null);

    const toggleDropdown = (index: number) => {
      expandedIndex.value = expandedIndex.value === index ? null : index;
    };

    const showLabel = (index: null) => {
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
});
</script>

<template>
  <SidebarMenu>
    <SidebarMenuItem
      v-for="(item, index) in menuItems"
      :key="index"
      :item="item"
      :index="index"
      :expanded="expandedIndex === index"
      @toggle="toggleDropdown"
      @mouseleave="hideLabel"
      @mouseover="showLabel"
    />
  </SidebarMenu>
</template>
