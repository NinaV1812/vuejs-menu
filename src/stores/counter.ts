import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("channels", () => {
  const count = ref(0);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});

export const useChannelsStore = defineStore("channels", () => {
  const menuItems = reactive( [
    { title: "Inbox", options: ["Acme Inc", "Acme Corp."], isEditable: false },
    { title: "Personal", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Teams", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Channels", options: ["Project Alpha", "Project Beta"], isEditable: true },
    { title: "Views", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Labels", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Users", options: ["Project Alpha", "Project Beta"], isEditable: false },
  ])
 
  function addOptionToChannels(newOption: string) {
    const channelsItem = menuItems.find((item) => item.title === "Channels");
    if (channelsItem && channelsItem.isEditable) {
      channelsItem.options.push(newOption);
    }
  }

  return { menuItems, addOptionToChannels };
});