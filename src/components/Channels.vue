<script>
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, CircleFadingPlus } from "lucide-vue-next";

export default {
  name: "ChannelsComponent",
  //   components: {
  //     // Sidebar,
  //     // SidebarHeader,
  //     // SidebarMenu,
  //     // SidebarMenuItem,
  //     // SidebarMenuButton,
  //     // DropdownMenu,
  //     // DropdownMenuContent,
  //     // DropdownMenuItem,
  //     // DropdownMenuTrigger,
  //     ChevronDown,
  //   },
  data() {
    return {
      isExpanded: false, // Tracks toggle state
    };
  },
  methods: {
    toggleDropdown() {
      this.isExpanded = !this.isExpanded;
    },
  },
};
</script>

<template>
  <SidebarMenuItem class="sidebar-menu-item">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton class="sidebar-button" @click="toggleDropdown">
            Channels
            <ChevronDown :class="['chevron-icon', { 'rotate-180': isExpanded }]" />
            <CircleFadingPlus :class="['chevron-icon', { 'rotate-180': isExpanded }]" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent :class="'dropdown-content w-full'">
        <DropdownMenuItem class="dropdown-item">
          <!-- <span>Acme Inc</span> -->
        </DropdownMenuItem>
        <DropdownMenuItem class="dropdown-item">
          <!-- <span>Acme Corp.</span> -->
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </SidebarMenuItem>
</template>

<style scoped>
/* Styles as previously defined */
.sidebar {
  width: 30%;
  background-color: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
}

.sidebar-header {
  font-size: 1.25rem;
  font-weight: bold;
  padding-bottom: 16px;
  /* border-bottom: 1px solid #e0e0e0; */
  margin-bottom: 16px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu-item {
  margin-bottom: 8px;
}

.sidebar-button {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 12px 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.sidebar-button:hover {
  background-color: #e9ecef;
}

.chevron-icon {
  margin-left: auto;
  color: #6c757d;
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
.chevron-icon {
  margin-left: auto;
  color: #6c757d;
  transition: transform 0.3s ease; /* Smooth rotation */
}

.rotate-180 {
  transform: rotate(180deg); /* Rotates icon by 180 degrees */
}
</style>
