import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";



export const useChannelsStore = defineStore("channels", () => {
  const menuItems = reactive([
    { title: "Inbox", options: ["Acme Inc", "Acme Corp."], isEditable: false },
    { title: "Personal", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Teams", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Channels", options: ["Project Alpha", "Project Beta"], isEditable: true },
    { title: "Views", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Labels", options: ["Project Alpha", "Project Beta"], isEditable: false },
    { title: "Users", options: ["Project Alpha", "Project Beta"], isEditable: false },
  ]);
  console.log("menuItems in useChannelsStore", menuItems);

  function addOptionToChannels(newOption: string) {
    console.log("newOption in addOptionToChannels", newOption);
    const channelsItem = menuItems.find((item) => item.title === "Channels");
    if (channelsItem && channelsItem.isEditable) {
      channelsItem.options = [...channelsItem.options, newOption]
    }
    console.log("channelsItem in addOptionToChannels", channelsItem);
  }

  function removeOptionToChannels(index: number) {
    console.log("index in removeOptionToChannels", index);
  
    // Find the "Channels" menu item
    const channelsItem = menuItems.find((item) => item.title === "Channels");
  
    if (channelsItem) {
      channelsItem.options = [...channelsItem.options.filter((_, i) => i !== index)];
    }
  
    console.log("channelsItem after removal in removeOptionToChannels", channelsItem);
  }

  return { menuItems, addOptionToChannels, removeOptionToChannels };
});
