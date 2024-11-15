<script>
import { ChevronDown } from "lucide-vue-next";
import PopoverDialog from "@/components/PopoverDialog.vue";
import { useChannelsStore } from "@/stores/counter";
import { ref } from "vue";
import IconComponent from "@/components/IconComponent.vue";

export default {
  components: {
    ChevronDown,
    PopoverDialog,
    IconComponent,
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
    <SidebarMenu>
      <SidebarMenuItem
        v-for="(item, index) in menuItems"
        :key="index"
        @mouseleave="hideLabel"
        @mouseout="showLabel"
      >
        <SidebarMenuButton class="sidebar-button" @click="toggleDropdown(index)">
          {{ item.title }}
          <PopoverDialog v-if="item.isEditable" :options="item.options" :index="index" />
          <ChevronDown
            :class="[
              'chevron-icon',
              {
                'rotate-180': expandedIndex === index && !!item.options.length,
                'chevron-disabled': !item.options.length,
              },
            ]"
          />
        </SidebarMenuButton>
        <div
          v-show="expandedIndex === index"
          :class="['collapsible', expandedIndex === index ? 'animate-collapsible-down' : 'animate-collapsible-up']"
        >
          <div v-for="(option, optIndex) in item.options" :key="optIndex" class="dropdown-item">
            <IconComponent :type="option.type" />
            <span>{{ option.title }}</span>
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
  cursor: pointer;
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
}

.rotate-180 {
  transform: rotate(180deg);
}
.chevron-disabled {
  color: #b0b0b0;
}

.collapsible {
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #e9ecef;
}
</style>
