import { reactive, computed } from "vue";
import { defineStore } from "pinia";

export enum ChannelTypes {
  Phone = "phone",
  Email = "email",
  WhatsApp = "WhatsApp",
  Random = "random",
}

export type ChannelOption = {
  title: string;
  type: ChannelTypes;
};


export type AccordionItem = {
  value: string;
  title: string;
  content: string | ChannelOption[]; 
};


const accordionItems: AccordionItem[] = [
  { value: "item-1", title: "Views", content: [] },
  {
    value: "item-2",
    title: "Inbox",
    content: [],
  },
  {
    value: "item-3",
    title: "Personal",
    content: [],
  },
  {
    value: "item-4",
    title: "Teams",
    content: [],
  },
  {
    value: "item-5",
    title: "Channels",
    content: [],
  },
  { value: "item-6", title: "Labels", content: [] },
  { value: "item-7", title: "Users", content: [] },

];

export const useChannelsStore = defineStore("channels", () => {
  const menuItems = reactive(accordionItems);
  const channelsItem = computed(() => menuItems.find((item) => item.title === "Channels"));

  const updateChannelsOptions = (updatedList: ChannelOption[]) => {
    if (channelsItem.value && Array.isArray(channelsItem.value.content)) {
      channelsItem.value.content = [...updatedList];
    } else {
      console.warn("Channels item not found or content is not an array.");
    }
  };
  return { menuItems, channelsItem, updateChannelsOptions };
});
