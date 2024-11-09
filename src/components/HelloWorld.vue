<script>
import { Sidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-vue-next";

export default {
  components: {
    ChevronDown,
    Plus,
  },
  data() {
    return {
      menuItems: [
        { title: "Inbox", options: ["Acme Inc", "Acme Corp."] },
        { title: "Personal", options: ["Project Alpha", "Project Beta"] },
        { title: "Teams", options: ["Project Alpha", "Project Beta"] },
        { title: "Channels", options: ["Project Alpha", "Project Beta"] },
        { title: "Views", options: ["Project Alpha", "Project Beta"] },
        { title: "Labels", options: ["Project Alpha", "Project Beta"] },
        { title: "Users", options: ["Project Alpha", "Project Beta"] },
      ],
      expandedItems: [],
      hoveredIndex: null,
    };
  },
  created() {
    this.expandedItems = this.menuItems.map(() => false);
  },
  methods: {
    toggleDropdown(index) {
      this.expandedItems[index] = !this.expandedItems[index];
    },
    addItem() {
      console.log("Add item function triggered");
      // Logic for adding a new item goes here
    },
    showLabel(index) {
      this.hoveredIndex = index;
    },
    hideLabel() {
      this.hoveredIndex = null;
    },
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
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton class="sidebar-button" @click="toggleDropdown(index)">
              {{ item.title }}
              <!-- <div class="icon-container" @mouseenter="showLabel(index)" @mouseleave="hideLabel"> -->
                <Plus class="add-button" />
                <!-- <HoverLabel :text="'Add new item'" :show="hoveredIndex === index" /> -->
              <!-- </div> -->
              <ChevronDown :class="['chevron-icon', { 'rotate-180': expandedItems[index] }]" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent v-if="expandedItems[index]" class="dropdown-content w-full">
            <DropdownMenuItem v-for="(option, optIndex) in item.options" :key="optIndex" class="dropdown-item">
              <span>{{ option }}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
}

.add-button {
  color: #007bff;
  cursor: pointer;
  margin-left: 8px;
  transition: color 0.3s ease;
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
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
}

.dropdown-content {
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-top: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
