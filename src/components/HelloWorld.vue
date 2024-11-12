<script>
import { computed } from "vue";
import { ChevronDown } from "lucide-vue-next";
import PopoverDialog from "@/components/PopoverDialog.vue";
import { useChannelsStore } from "@/stores/counter";

export default {
  components: {
    ChevronDown,
    PopoverDialog,
  },
  setup() {
    const channelsStore = useChannelsStore();

    const menuItems = computed(() => channelsStore.menuItems);

    const addItem=(newOption) => {
      channelsStore.addOptionToChannels(newOption);
      console.log("Add item function triggered with new option:", newOption);
    };

    return {
      menuItems,
      expandedIndex: null, 
      hoveredIndex: null,
      toggleDropdown(index) {
        this.expandedIndex = this.expandedIndex === index ? null : index;
      },
      addItem,
      showLabel(index) {
        this.hoveredIndex = index;
      },
      hideLabel() {
        this.hoveredIndex = null;
      },
    };
  },
};
</script>

<template>
  <Sidebar class="sidebar">
    <SidebarMenu>
      <!-- <SidebarMenuItem v-for="(item, index) in menuItems()" :key="index" @mouseleave="hideLabel"> -->
      <SidebarMenuItem v-for="(item, index) in menuItems" :key="index" @mouseleave="hideLabel">
        <SidebarMenuButton class="sidebar-button" @click="toggleDropdown(index)">
          {{ item.title }}
          <PopoverDialog v-if="item.isEditable" :options="item.options" :index="index" v-bind:handleApply="addItem" />
          <ChevronDown :class="['chevron-icon', { 'rotate-180': expandedIndex === index }]" />
        </SidebarMenuButton>

        <div
          v-show="expandedIndex === index"
          :class="['collapsible', expandedIndex === index ? 'animate-collapsible-down' : 'animate-collapsible-up']"
        >
          <div v-for="(option, optIndex) in item.options" :key="optIndex" class="dropdown-item">
            <span>{{ option }}</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  </Sidebar>
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

.sidebar-button {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  font-weight: bold;
}

.add-button:hover {
  color: #0056b3;
  background-color: #6c757d;
  border-radius: 4px;
}

.chevron-icon {
  margin-left: auto;
  color: #6c757d;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
}

.collapsible {
  overflow: hidden;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #e9ecef;
}
</style>
